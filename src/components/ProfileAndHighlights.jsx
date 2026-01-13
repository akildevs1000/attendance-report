function ProfileAndHighlights({ employee }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      <div className="lg:col-span-4 bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-row items-center gap-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-accent/5 to-transparent rounded-bl-full"></div>
        <div className="w-16 h-16 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-300 shrink-0 shadow-sm z-10">
          <span className="material-symbols-outlined text-4xl">person</span>
        </div>
        <div className="flex-1 min-w-0 z-10">
          <h3 className="text-lg font-bold text-slate-900 truncate">
            {employee?.first_name}
          </h3>
          <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-1">
            ID: {employee?.employee_id}
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="truncate">Dept: {employee?.department?.name}</span>
          </div>
        </div>
      </div>

      <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Score", val: "92%" },
          { label: "Worked", val: "168", unit: "h" },
          {
            label: "Late In",
            val: "02:49",
            color: "text-rose-600",
            bg: "bg-rose-50",
            labelColor: "text-rose-500",
          },
          {
            label: "Overtime",
            val: "00:00",
            color: "text-indigo-600",
            bg: "bg-indigo-50",
            labelColor: "text-indigo-500",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className={`${
              stat.bg || "bg-white"
            } border border-slate-200 rounded-xl p-4 flex flex-col justify-center items-center shadow-sm relative overflow-hidden group`}
          >
            {!stat.bg && (
              <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            )}
            <span
              className={`text-xs font-bold ${
                stat.labelColor || "text-slate-400"
              } uppercase tracking-wider`}
            >
              {stat.label}
            </span>
            <span
              className={`text-2xl md:text-3xl font-display font-bold ${
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
