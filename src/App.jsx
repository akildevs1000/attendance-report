import { useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import ProfileAndHighlights from "./components/ProfileAndHighlights";
import Stats from "./components/Stats";
import Table from "./components/Table";
import Footer from "./components/Footer";

import stats from "./utils/stats";
import handleDownloadPdf from "./utils/download";
import getData from "./utils/api";
import paginateTableData from "./utils/paginate";

const App = () => {
  const [employeesData, setEmployeesData] = useState([]);

  const hasExported = useRef(false);

  const [searchParams] = useSearchParams();

  // http://localhost:5717/attendance-report/?employee_ids=50,48&company_id=13&from_date=2025-12-01&to_date=2025-12-31
  const employee_ids =
    searchParams.get("employee_ids")?.split(",").filter(Boolean) || [];
  const company_id = searchParams.get("company_id") || "2"; // Default to 2 if missing
  const shift_type_id = searchParams.get("shift_type_id") || "2"; // Default to 2 if missing

  const from_date = searchParams.get("from_date"); // Default to 2 if missing
  const to_date = searchParams.get("to_date"); // Default to 2 if missing

  // 1. Create the ref INSIDE the component that renders the content

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(new Date(from_date));
  const [endDate, setEndDate] = useState(new Date(to_date));

  const [isExporting, setIsExporting] = useState(false);

  const dashboardRef = useRef(null);

  const handleExportStatus = (status) => {
    setIsExporting(status);
    console.log("Export status changed in App.js:", status);
    // You can trigger a global toast or loading overlay here
  };

  useEffect(() => {
    const fetchAllEmployees = async () => {
      if (!startDate || !endDate) return;

      setLoading(true);
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
        setLoading(false);
      }
    };

    fetchAllEmployees();
  }, [company_id, startDate, endDate]);

  useEffect(() => {
    if (hasExported.current) return;
    hasExported.current = true;

    setTimeout(() => {
      // handleDownloadPdf();
    }, 2000);
  }, []);

  // const pages = paginateTableData(data, 15, 16);

  if (loading)
    return (
      <>
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/70 backdrop-blur-sm print:hidden">
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-accent border-t-transparent" />
            <span className="text-gray-600 text-sm">Generating report…</span>
          </div>
        </div>
      </>
    );

  return (
    <>
      <div className="bg-slate-100 min-h-screen p-4 md:p-8 print:p-0 flex justify-center">
        <div className="w-full max-w-[1122px]">
          {employeesData.map((employeeBlock, empIndex) => {
            const pages = paginateTableData(employeeBlock.records, 15, 16);

            return pages.map((pageData, pageIndex) => (
              <div
                key={`${employeeBlock.employee_id}-${pageIndex}`}
                className="pdf-page-section bg-white shadow-2xl print:shadow-none
                 p-8 md:p-10 flex flex-col gap-6
                 border-t-8 border-accent
                 mb-8 print:mb-0 page-break-after"
              >
                {/* HEADER */}
                <Header />

                {/* First page of EACH employee */}
                {pageIndex === 0 && (
                  <>
                    <ProfileAndHighlights
                      employee={employeeBlock.records[0]?.employee}
                    />
                    <Stats stats={stats} />
                  </>
                )}

                {/* TABLE */}
                <Table
                  shift_type_id={shift_type_id}
                  pageIndex={pageIndex}
                  data={pageData}
                />

                <div className="flex-grow" />

                {/* FOOTER */}
                <Footer page={pageIndex + 1} totalPages={pages.length} />
              </div>
            ));
          })}
        </div>
      </div>
    </>
  );
};

export default App;
