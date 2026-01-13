import { Routes, Route, Navigate, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import ProfileAndHighlights from "./components/ProfileAndHighlights";
import Stats from "./components/Stats";
import Table from "./components/Table";
import Footer from "./components/Footer";

import attendanceData from "./utils/tableData";
import stats from "./utils/stats";
import ExportButton from "./components/ExportButton";

const DashboardContent = () => {
  const [searchParams] = useSearchParams();

  // 2. Extract values (e.g., ?employeeId=7&company_id=2)
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
        const formattedFrom = startDate.toISOString().split("T")[0];
        const formattedTo = endDate.toISOString().split("T")[0];

        const response = await fetch(
          "https://mytime2cloud-backend.test/api/attendance-report-new",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              company_id: company_id,
              from_date: formattedFrom,
              to_date: formattedTo,

              report_type: "Monthly",
              shift_type_id: 0,
              report_template: "Template1",
              overtime: 0,
              employee_id: [employee_id],
              department_ids: [],
              statuses: [],
              branch_id: null,
              showTabs: '{"single":true,"double":false,"multi":false}',
              tabselected: {
                isTrusted: true,
              },
              filterType: "Monthly",
            }),
          }
        );

        const data = await response.json();

        if (data) {
          console.log(data.data);
          setData(data.data);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [employee_id, company_id, startDate, endDate]);

  if (loading) return <div className="p-20 text-center">Loading...</div>;
  if (!data)
    return (
      <div className="p-20 text-center">
        No data found for ID: {employee_id}
      </div>
    );

  return (
    // 2. Attach the ref to the container you want to export as PDF
    <>
      <div className="bg-slate-100 text-slate-800 font-sans antialiased min-h-screen p-4 md:p-8 print:p-0 print:bg-white flex justify-center">
        <div
          ref={dashboardRef}
          className="bg-surface-paper shadow-2xl print:shadow-none max-w-[1122px] w-full p-8 md:p-10 flex flex-col gap-6 relative overflow-hidden h-auto md:min-h-[793px] border-t-8 border-accent"
        >
          <ExportButton
            dashboardRef={dashboardRef}
            onExportChange={handleExportStatus}
          />
          <Header />
          <ProfileAndHighlights employee={data[0]?.employee} />
          <Stats stats={stats} />
          <Table attendanceData={data} />
          <Footer />
        </div>
      </div>
    </>
  );
};

function App() {
  return (
    <Routes>
      {/* Default to ID 7 or whatever your default is */}
      {/* <Route path="/" element={<Navigate to="/7" replace />} /> */}
      <Route path="/" element={<DashboardContent />} />
    </Routes>
  );
}

export default App;
