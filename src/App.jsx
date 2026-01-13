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

  const hasExported = useRef(false);

  const [searchParams] = useSearchParams();

  // http://localhost:5717/attendance-report/?employee_id=3102&company_id=13&from_date=2025-12-01&to_date=2025-12-31  
  const employee_id = searchParams.get("employee_id");
  const company_id = searchParams.get("company_id") || "2"; // Default to 2 if missing

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
    const fetchData = async () => {
      if (!startDate || !endDate) return;
      setLoading(true);
      try {
        const data = await getData(startDate, endDate, company_id, employee_id);
        setData(data);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [employee_id, company_id, startDate, endDate]);



  useEffect(() => {
    if (hasExported.current) return;
    hasExported.current = true;

    setTimeout(() => {
      handleDownloadPdf();
    }, 5000);
  }, []);

  const pages = paginateTableData(data, 15, 16);


  if (loading) return <div className="p-20 text-center">Loading...</div>;
  if (!data)
    return (
      <div className="p-20 text-center">
        No data found for ID: {employee_id}
      </div>
    );

  return (
    <>
      <div className="bg-slate-100 min-h-screen p-4 md:p-8 print:p-0 flex justify-center">
        <div className="w-full max-w-[1122px]">

          {pages.map((pageData, pageIndex) => (
            <div
              key={pageIndex}
              className="pdf-page-section bg-white shadow-2xl print:shadow-none
                   p-8 md:p-10 flex flex-col gap-6
                    border-t-8 border-accent
                   mb-8 print:mb-0 page-break-after"
            >
              {/* HEADER (every page) */}
              <Header />

              {/* ONLY on first page */}
              {pageIndex === 0 && (
                <>
                  <ProfileAndHighlights employee={data[0]?.employee} />
                  <Stats stats={stats} />
                </>
              )}

              {/* TABLE */}
              <Table pageIndex={pageIndex} data={pageData} />

              <div className="flex-grow" />

              {/* FOOTER (every page) */}
              <Footer
                page={pageIndex + 1}
                totalPages={pages.length}
              />
            </div>
          ))}

        </div>
      </div>
    </>
  );
};

export default App;
