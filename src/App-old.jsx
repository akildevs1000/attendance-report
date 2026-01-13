import { Routes, Route, Navigate, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Charts from "./components/Charts";
import MonthlyBreakdownTable from "./components/MonthBreakDownTable";
import PageHeader from "./components/PageHeader";
import ProfileCard from "./components/ProfileCard";
import Stats from "./components/Stats";
import Footer from "./components/Footer";

const attendanceData = [
  {
    date: "01 Dec",
    day: "Monday",
    shift: "08:30 - 18:30",
    in: "08:36",
    out: "18:33",
    late: "00:06",
    early: "00:00",
    ot: "00:03",
    work: "09:57",
    status: "PRESENT",
  },
  {
    date: "02 Dec",
    day: "Tuesday",
    shift: "08:30 - 18:30",
    in: "-- : --",
    out: "-- : --",
    late: "-",
    early: "-",
    ot: "-",
    work: "--:--",
    status: "ABSENT",
  },
  {
    date: "03 Dec",
    day: "Wednesday",
    shift: "08:30 - 18:30",
    in: "08:34",
    out: "12:30",
    late: "00:04",
    early: "00:00",
    ot: "00:05",
    work: "09:16",
    status: "PRESENT",
  },
  {
    date: "04 Dec",
    day: "Thursday",
    shift: "08:30 - 18:30",
    in: "08:35",
    out: "18:31",
    late: "00:05",
    early: "00:00",
    ot: "00:01",
    work: "09:56",
    status: "PRESENT",
  },
  {
    date: "05 Dec",
    day: "Friday",
    shift: "08:30 - 18:30",
    in: "08:34",
    out: "18:26",
    late: "00:04",
    early: "00:04",
    ot: "00:00",
    work: "09:52",
    status: "PRESENT",
  },
  {
    date: "06 Dec",
    day: "Saturday",
    shift: "08:30 - 18:30",
    in: "08:35",
    out: "19:04",
    late: "00:05",
    early: "00:00",
    ot: "00:34",
    work: "10:29",
    status: "PRESENT",
  },
  {
    date: "07 Dec",
    day: "Sunday",
    shift: "08:30 - 18:30",
    in: "-- : --",
    out: "-- : --",
    late: "-",
    early: "-",
    ot: "-",
    work: "--:--",
    status: "HOLIDAY",
  },
  {
    date: "07 Dec",
    day: "Sunday",
    shift: "08:30 - 18:30",
    in: "-- : --",
    out: "-- : --",
    late: "-",
    early: "-",
    ot: "-",
    work: "--:--",
    status: "HOLIDAY",
  },
  {
    date: "07 Dec",
    day: "Sunday",
    shift: "08:30 - 18:30",
    in: "-- : --",
    out: "-- : --",
    late: "-",
    early: "-",
    ot: "-",
    work: "--:--",
    status: "HOLIDAY",
  },
   {
    date: "01 Dec",
    day: "Monday",
    shift: "08:30 - 18:30",
    in: "08:36",
    out: "18:33",
    late: "00:06",
    early: "00:00",
    ot: "00:03",
    work: "09:57",
    status: "PRESENT",
  },
  {
    date: "02 Dec",
    day: "Tuesday",
    shift: "08:30 - 18:30",
    in: "-- : --",
    out: "-- : --",
    late: "-",
    early: "-",
    ot: "-",
    work: "--:--",
    status: "ABSENT",
  },
  {
    date: "03 Dec",
    day: "Wednesday",
    shift: "08:30 - 18:30",
    in: "08:34",
    out: "12:30",
    late: "00:04",
    early: "00:00",
    ot: "00:05",
    work: "09:16",
    status: "PRESENT",
  },
  {
    date: "04 Dec",
    day: "Thursday",
    shift: "08:30 - 18:30",
    in: "08:35",
    out: "18:31",
    late: "00:05",
    early: "00:00",
    ot: "00:01",
    work: "09:56",
    status: "PRESENT",
  },
  {
    date: "05 Dec",
    day: "Friday",
    shift: "08:30 - 18:30",
    in: "08:34",
    out: "18:26",
    late: "00:04",
    early: "00:04",
    ot: "00:00",
    work: "09:52",
    status: "PRESENT",
  },
  {
    date: "06 Dec",
    day: "Saturday",
    shift: "08:30 - 18:30",
    in: "08:35",
    out: "19:04",
    late: "00:05",
    early: "00:00",
    ot: "00:34",
    work: "10:29",
    status: "PRESENT",
  },
  {
    date: "07 Dec",
    day: "Sunday",
    shift: "08:30 - 18:30",
    in: "-- : --",
    out: "-- : --",
    late: "-",
    early: "-",
    ot: "-",
    work: "--:--",
    status: "HOLIDAY",
  },
  {
    date: "07 Dec",
    day: "Sunday",
    shift: "08:30 - 18:30",
    in: "-- : --",
    out: "-- : --",
    late: "-",
    early: "-",
    ot: "-",
    work: "--:--",
    status: "HOLIDAY",
  },
  {
    date: "07 Dec",
    day: "Sunday",
    shift: "08:30 - 18:30",
    in: "-- : --",
    out: "-- : --",
    late: "-",
    early: "-",
    ot: "-",
    work: "--:--",
    status: "HOLIDAY",
  },
   {
    date: "01 Dec",
    day: "Monday",
    shift: "08:30 - 18:30",
    in: "08:36",
    out: "18:33",
    late: "00:06",
    early: "00:00",
    ot: "00:03",
    work: "09:57",
    status: "PRESENT",
  },
  {
    date: "02 Dec",
    day: "Tuesday",
    shift: "08:30 - 18:30",
    in: "-- : --",
    out: "-- : --",
    late: "-",
    early: "-",
    ot: "-",
    work: "--:--",
    status: "ABSENT",
  },
  {
    date: "03 Dec",
    day: "Wednesday",
    shift: "08:30 - 18:30",
    in: "08:34",
    out: "12:30",
    late: "00:04",
    early: "00:00",
    ot: "00:05",
    work: "09:16",
    status: "PRESENT",
  },
  {
    date: "04 Dec",
    day: "Thursday",
    shift: "08:30 - 18:30",
    in: "08:35",
    out: "18:31",
    late: "00:05",
    early: "00:00",
    ot: "00:01",
    work: "09:56",
    status: "PRESENT",
  },
  {
    date: "05 Dec",
    day: "Friday",
    shift: "08:30 - 18:30",
    in: "08:34",
    out: "18:26",
    late: "00:04",
    early: "00:04",
    ot: "00:00",
    work: "09:52",
    status: "PRESENT",
  },
  {
    date: "06 Dec",
    day: "Saturday",
    shift: "08:30 - 18:30",
    in: "08:35",
    out: "19:04",
    late: "00:05",
    early: "00:00",
    ot: "00:34",
    work: "10:29",
    status: "PRESENT",
  },
  {
    date: "07 Dec",
    day: "Sunday",
    shift: "08:30 - 18:30",
    in: "-- : --",
    out: "-- : --",
    late: "-",
    early: "-",
    ot: "-",
    work: "--:--",
    status: "HOLIDAY",
  },
  {
    date: "07 Dec",
    day: "Sunday",
    shift: "08:30 - 18:30",
    in: "-- : --",
    out: "-- : --",
    late: "-",
    early: "-",
    ot: "-",
    work: "--:--",
    status: "HOLIDAY",
  },
  {
    date: "07 Dec",
    day: "Sunday",
    shift: "08:30 - 18:30",
    in: "-- : --",
    out: "-- : --",
    late: "-",
    early: "-",
    ot: "-",
    work: "--:--",
    status: "HOLIDAY",
  },
   {
    date: "01 Dec",
    day: "Monday",
    shift: "08:30 - 18:30",
    in: "08:36",
    out: "18:33",
    late: "00:06",
    early: "00:00",
    ot: "00:03",
    work: "09:57",
    status: "PRESENT",
  },
  {
    date: "02 Dec",
    day: "Tuesday",
    shift: "08:30 - 18:30",
    in: "-- : --",
    out: "-- : --",
    late: "-",
    early: "-",
    ot: "-",
    work: "--:--",
    status: "ABSENT",
  },
  {
    date: "03 Dec",
    day: "Wednesday",
    shift: "08:30 - 18:30",
    in: "08:34",
    out: "12:30",
    late: "00:04",
    early: "00:00",
    ot: "00:05",
    work: "09:16",
    status: "PRESENT",
  },
  {
    date: "04 Dec",
    day: "Thursday",
    shift: "08:30 - 18:30",
    in: "08:35",
    out: "18:31",
    late: "00:05",
    early: "00:00",
    ot: "00:01",
    work: "09:56",
    status: "PRESENT",
  },
  {
    date: "05 Dec",
    day: "Friday",
    shift: "08:30 - 18:30",
    in: "08:34",
    out: "18:26",
    late: "00:04",
    early: "00:04",
    ot: "00:00",
    work: "09:52",
    status: "PRESENT",
  },
  {
    date: "06 Dec",
    day: "Saturday",
    shift: "08:30 - 18:30",
    in: "08:35",
    out: "19:04",
    late: "00:05",
    early: "00:00",
    ot: "00:34",
    work: "10:29",
    status: "PRESENT",
  },
  {
    date: "07 Dec",
    day: "Sunday",
    shift: "08:30 - 18:30",
    in: "-- : --",
    out: "-- : --",
    late: "-",
    early: "-",
    ot: "-",
    work: "--:--",
    status: "HOLIDAY",
  },
  {
    date: "07 Dec",
    day: "Sunday",
    shift: "08:30 - 18:30",
    in: "-- : --",
    out: "-- : --",
    late: "-",
    early: "-",
    ot: "-",
    work: "--:--",
    status: "HOLIDAY",
  },
  {
    date: "07 Dec",
    day: "Sunday",
    shift: "08:30 - 18:30",
    in: "-- : --",
    out: "-- : --",
    late: "-",
    early: "-",
    ot: "-",
    work: "--:--",
    status: "HOLIDAY",
  }
];

const stats = [
  {
    label: "Present",
    value: 19,
    color: "bg-emerald-500",
    textHover: "group-hover:text-emerald-600",
  },
  {
    label: "Absent",
    value: 5,
    color: "bg-rose-500",
    textHover: "group-hover:text-rose-600",
  },
  {
    label: "Week Off",
    value: 0,
    color: "bg-slate-400",
    textHover: "group-hover:text-slate-600",
  },
  {
    label: "Leaves",
    value: 0,
    color: "bg-amber-400",
    textHover: "group-hover:text-amber-500",
  },
  {
    label: "Holidays",
    value: 0,
    color: "bg-violet-500",
    textHover: "group-hover:text-violet-500",
  },
  {
    label: "Missing",
    value: 1,
    color: "bg-orange-400",
    textHover: "group-hover:text-orange-500",
  },
  {
    label: "Manual",
    value: 0,
    color: "bg-cyan-500",
    textHover: "group-hover:text-cyan-500",
  },
];

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
    <div ref={dashboardRef}>
      <Header />
      <ProfileAndHighlights />
      <Stats stats={stats} />
      <Table attendanceData={attendanceData} />
      <Footer />
    </div>
  );
};

function App() {
  return (
    <div className="bg-slate-100 text-slate-800 font-sans antialiased min-h-screen p-4 md:p-8 print:p-0 print:bg-white flex justify-center">
      <div className="bg-surface-paper shadow-2xl print:shadow-none max-w-[1122px] w-full p-8 md:p-10 flex flex-col gap-6 relative overflow-hidden h-auto md:min-h-[793px] border-t-8 border-accent">
        <Routes>
          {/* Default to ID 7 or whatever your default is */}
          {/* <Route path="/" element={<Navigate to="/7" replace />} /> */}
          <Route path="/" element={<DashboardContent />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
