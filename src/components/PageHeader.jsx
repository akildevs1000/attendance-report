import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { forwardRef } from "react";
import ExportButton from "./ExportButton";

// 1. Move CustomDateButton OUTSIDE the PageHeader component
// to prevent re-renders and potential null issues
const CustomDateButton = forwardRef(({ value, onClick }, ref) => (
  <button
    className="flex items-center gap-2 rounded-lg border border-[#dbe2e6] bg-white px-4 py-2.5 text-sm font-bold text-[#111618] hover:bg-[#f0f3f4] transition-all"
    onClick={onClick}
    ref={ref}
  >
    <span className="material-symbols-outlined text-lg text-primary">
      calendar_today
    </span>
    {/* Safety check: if value is null, show a placeholder */}
    <span>{value ? value : "Select Range"}</span>
  </button>
));

function PageHeader({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  dashboardRef,
  onExportChange
}) {
  // Helper to format dates safely
  const formatDisplayDate = (date) => {
    if (!date || !(date instanceof Date)) return "...";
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div className="flex flex-col gap-2">
        {/* Breadcrumbs */}
        {/* <div className="flex items-center gap-2 text-sm text-[#617c89]">
          <span>Employees</span>
          <span className="material-symbols-outlined text-xs">
            chevron_right
          </span>
          <span>Reports</span>
        </div> */}

        {/* Title */}
        <h1 className="text-3xl font-black tracking-tight text-[#111618] lg:text-4xl">
          12-Month Performance Report
        </h1>

        {/* Dynamic Period Display */}
        <p className="text-base font-medium text-[#617c89]">
          Period:{" "}
          <span className="text-[#111618]">
            {formatDisplayDate(startDate)} - {formatDisplayDate(endDate)}
          </span>
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3" data-html2canvas-ignore>
        {/* Modern DatePicker */}
        <DatePicker
          selected={startDate}
          onChange={(dates) => {
            const [start, end] = dates;
            setStartDate(start);
            setEndDate(end);
          }}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          // --- New Props for Month Selection ---
          showMonthYearPicker // Changes view from days to months
          dateFormat="MM/yyyy" // Formats the value shown on the button
          // -------------------------------------

          customInput={<CustomDateButton />}
          monthsShown={2}
          popperPlacement="bottom-end"
          shouldCloseOnSelect={false}
        />

        {/* Export Button (Added back!) */}
        <ExportButton dashboardRef={dashboardRef} onExportChange={onExportChange} />
      </div>
    </div>
  );
}

export default PageHeader;
