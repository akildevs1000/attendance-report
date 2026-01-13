import { Routes, Route, Navigate, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Charts from "./components/Charts";
import MonthlyBreakdownTable from "./components/MonthBreakDownTable";
import PageHeader from "./components/PageHeader";
import ProfileCard from "./components/ProfileCard";
import Stats from "./components/Stats";
import Footer from "./components/Footer";

const DashboardContent = () => {
  const [searchParams] = useSearchParams();

  // 2. Extract values (e.g., ?employeeId=7&company_id=2)
  const employee_id = searchParams.get("employee_id");
  const company_id = searchParams.get("company_id") || "2"; // Default to 2 if missing

  const from_date = searchParams.get("from_date"); // Default to 2 if missing
  const to_date = searchParams.get("to_date"); // Default to 2 if missing

  // 1. Create the ref INSIDE the component that renders the content
  const dashboardRef = useRef(null);

  const [isExporting, setIsExporting] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(new Date(from_date));
  const [endDate, setEndDate] = useState(new Date(to_date));

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
          `https://mytime2cloud-backend.test/api/performance-report-single?employee_id=${employee_id}&company_id=${company_id}&from_date=${formattedFrom}&to_date=${formattedTo}`,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await response.json();

        if (data) {
          setData(data);
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
    <div
      ref={dashboardRef}
      className="mx-auto flex max-w-[1200px] flex-col gap-8"
    >
      <PageHeader
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        dashboardRef={dashboardRef}
        onExportChange={handleExportStatus}
      />
      <ProfileCard isExporting={isExporting} employee={data} />
      <Stats isExporting={isExporting} data={data.summary} />
      <Charts data={data.chart_data} />
      <MonthlyBreakdownTable data={data.monthly_breakdown} />
      <Footer data={data} />
    </div>
  );
};

function App() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light">
      <main className="flex-1 px-4 py-8 lg:px-40">
        <Routes>
          {/* Default to ID 7 or whatever your default is */}
          {/* <Route path="/" element={<Navigate to="/7" replace />} /> */}
          <Route path="/" element={<DashboardContent />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
