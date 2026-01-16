import { useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import ProfileAndHighlights from "./components/ProfileAndHighlights";
import Stats from "./components/Stats";
import GeneralTable from "./components/GeneralTable";
import Table from "./components/Table";
import Footer from "./components/Footer";

import handleDownloadPdf from "./utils/download";
import getData from "./utils/api";
import paginateTableData from "./utils/paginate";

import { calculateTotalHours } from "./utils/time";

const App = () => {
  const [employeesData, setEmployeesData] = useState([]);

  const hasExported = useRef(false);

  const [searchParams] = useSearchParams();

  // 12-01&to_date=2025-12-31
  const employee_ids =
    searchParams.get("employee_ids")?.split(",").filter(Boolean) || [];
  const company_id = searchParams.get("company_id") || "2"; // Default to 2 if missing
  const company_name = searchParams.get("company_name") || "Organization"; // Default to 2 if missing
  const shift_type_id = searchParams.get("shift_type_id") || "2"; // Default to 2 if missing

  const from_date = searchParams.get("from_date"); // Default to 2 if missing
  const to_date = searchParams.get("to_date"); // Default to 2 if missing

  // 1. Create the ref INSIDE the component that renders the content

  const [exportProgress, setExportProgress] = useState(0);
  const [startDate, setStartDate] = useState(new Date(from_date));
  const [endDate, setEndDate] = useState(new Date(to_date));

  const [isExporting, setIsExporting] = useState(false);

  const dashboardRef = useRef(null);

  useEffect(() => {
    const fetchAllEmployees = async () => {
      if (!startDate || !endDate) return;

      setIsExporting(true);
      try {
        const results = [];

        for (const empId of employee_ids) {
          const empData = await getData(startDate, endDate, company_id, empId);
          if (empData && empData.length) {
            results.push({
              employee_id: empId,
              records: empData,
            });
          }
        }

        setEmployeesData(results);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        // setLoading(false);
      }
    };

    fetchAllEmployees();
  }, [company_id, startDate, endDate]);

  useEffect(() => {
    // Only trigger export if data is loaded and we haven't exported yet
    if (employeesData.length > 0 && !hasExported.current) {
      hasExported.current = true;
      setIsExporting(true);

      handleDownloadPdf(setIsExporting, setExportProgress, startDate, endDate); // null for all employees
    }
  }, [employeesData]);

  let isGeneral = shift_type_id != 2 && shift_type_id != 5;
  let pairLength = shift_type_id == 2 ? 5 : 2; // 5 pairs for multi and 2 pairs for split

  return (
    <>
      {isExporting && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm print:hidden">
          <div class="spinner-wrapper">
            <div class="spinner-container">
              <div class="outer-spin-bars">
                <div class="bar bar-1"></div>
                <div class="bar bar-2"></div>
                <div class="bar bar-3"></div>
              </div>

              <div class="spinner-progress" id="progressRing"></div>

              <div class="spinner-circle"></div>

              <div class="spinner-inner-circle" id="percentText">
                {exportProgress}%
              </div>

              <div class="progress-loader" id="statusText">
                {exportProgress < 100 ? "Preparing……" : "Ready!"}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-slate-100 p-4 md:p-8 print:p-0 flex justify-center">
        <div className="w-full max-w-[1122px] printable">
          {employeesData.map((employeeBlock, empIndex) => {
            const pages = paginateTableData(
              employeeBlock.records,
              isGeneral ? 5 : 5,
              isGeneral ? 8 : 8
            );

            return pages.map((pageData, pageIndex) => {
              const isLastPage = pageIndex === pages.length - 1;

              return (
                <div
                  key={`${employeeBlock.employee_id}-${pageIndex}`}
                  className="pdf-page-section relative bg-white shadow-2xl print:shadow-none
                 p-3 flex flex-col gap-6
                 border-t-8 border-accent
                 print:mb-0 page-break-after"
                  data-employee={employeeBlock.employee_id}
                >
                  <Header
                    isExporting={isExporting}
                    from_date={from_date}
                    to_date={to_date}
                    company_name={company_name}
                  />

                  {pageIndex == 0 ? (
                    <>
                      <ProfileAndHighlights
                        isExporting={isExporting}
                        employee={employeeBlock.records[0]?.employee}
                        totalHours={calculateTotalHours(
                          employeeBlock.records
                            .filter((e) => e.total_hrs !== "---")
                            .map((r) => r.total_hrs)
                        )}
                        lateIn={calculateTotalHours(
                          employeeBlock.records
                            .filter((e) => e.late_coming !== "---")
                            .map((r) => r.late_coming)
                        )}
                        OT={calculateTotalHours(
                          employeeBlock.records
                            .filter((e) => e.ot !== "---")
                            .map((r) => r.ot)
                        )}
                      />
                      <Stats
                        isExporting={isExporting}
                        stats={employeeBlock.records}
                      />
                    </>
                  ) : null}

                  {isGeneral ? (
                    <GeneralTable
                      isGeneral={isGeneral}
                      pageIndex={pageIndex}
                      data={pageData}
                    />
                  ) : (
                    <Table
                      pairLength={pairLength}
                      pageIndex={pageIndex}
                      data={pageData}
                    />
                  )}

                  {isLastPage ? <div className="min-h-[380px]"></div> : null}

                  <Footer page={pageIndex + 1} totalPages={pages.length} />
                </div>
              );
            });
          })}
        </div>
      </div>
    </>
  );
};

export default App;
