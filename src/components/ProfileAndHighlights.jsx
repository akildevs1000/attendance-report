import { calculateAttendanceScore } from "../utils/time";

function ProfileAndHighlights({
  isExporting,
  employee,
  totalHours,
  lateIn,
  OT,
}) {
  let shift = employee?.schedule?.shift;

  // 👇 Use totalHours.hours as performed hours
  const result = calculateAttendanceScore(
    shift,
    31,
    Number(totalHours?.hours || 0)
  );

  console.log(result);

  let highlights = [
    { label: "Score", val: result?.score_percentage + "%" },
    { label: "Worked", val: totalHours?.hours, unit: "h" },
    {
      label: "Late In",
      val: lateIn.hours || "00:00",
      color: "text-rose-600",
      bg: "bg-rose-50",
      labelColor: "text-rose-500",
    },
    {
      label: "Overtime",
      val: OT.hours || "00:00",
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      labelColor: "text-indigo-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      <div className="lg:col-span-4 bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-row items-center gap-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-accent/5 to-transparent rounded-bl-full"></div>
        <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-full border-4 border-white shadow-sm ">
          <div
            className="bg-center bg-no-repeat h-full w-full bg-cover"
            data-alt="Portrait of Sarah Jenkins, senior employee"
            style={{
              backgroundImage: `url(${employee.profile_picture})`,
            }}
          ></div>
        </div>

        <div className="flex-1 min-w-0 z-10">
          <h3
            className={`text-lg font-bold text-slate-900 truncate ${
              isExporting ? "-mt-4 pb-[1px]" : ""
            }`}
          >
            {employee?.first_name} {employee?.last_name}
          </h3>
          <p className="text-xs font-semibold  uppercase tracking-wider mb-1">
            ID: {employee?.employee_id}
          </p>
          <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-1">
            Dept: {employee?.department?.name}
          </p>
        </div>
      </div>

      <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-3">
        {highlights.map((stat, i) => (
          <div
            key={i}
            className={`${
              stat.bg || "bg-white"
            } border border-slate-200 rounded-xl p-2 flex flex-col justify-center items-center shadow-sm relative overflow-hidden group`}
          >
            {!stat.bg && (
              <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            )}
            <span
              className={`text-xs font-bold ${
                stat.labelColor || "text-slate-400"
              } ${isExporting ? "-mt-3" : ""}  uppercase tracking-wider`}
            >
              {stat.label}
            </span>
            <span
              className={`font-display font-bold ${
                stat.color || "text-slate-900"
              }`}
            >
              {stat.val}
              {stat.unit && (
                <span className="text-sm text-slate-400 font-medium ml-1">
                  {stat.unit}
                </span>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfileAndHighlights;
