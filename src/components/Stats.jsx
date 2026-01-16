function Stats({ stats, isExporting }) {

  console.log(stats.filter(e => e.total_hrs != "---").map(e => e.total_hrs));
  
  // Count occurrences of each status
  const statusCounts = stats.reduce((acc, s) => {
    acc[s.status] = (acc[s.status] || 0) + 1;
    return acc;
  }, {});

  // Map statuses to labels, colors, and hover colors
  const computedStats = [
    { status: "P", label: "Present", color: "bg-emerald-500", hover: "group-hover:text-emerald-600" },
    { status: "A", label: "Absent", color: "bg-rose-500", hover: "group-hover:text-rose-600" },
    { status: "O", label: "Week Off", color: "bg-slate-400", hover: "group-hover:text-slate-600" },
    { status: "L", label: "Leaves", color: "bg-amber-400", hover: "group-hover:text-amber-500" },
    { status: "H", label: "Holidays", color: "bg-violet-500", hover: "group-hover:text-violet-500" },
    { status: "M", label: "Missing", color: "bg-orange-400", hover: "group-hover:text-orange-500" },
    { status: "ME", label: "Manual", color: "bg-cyan-500", hover: "group-hover:text-cyan-500" },
  ].map(s => ({
    ...s,
    value: statusCounts[s.status] || 0
  }));

  return (
    <div className="flex flex-wrap border border-slate-200 rounded-xl divide-x divide-slate-200 bg-white overflow-hidden shadow-sm">
      {computedStats.map((s, i) => (
        <div
          key={i}
          className="flex-1 min-w-[80px] p-3 text-center hover:bg-slate-50 transition-colors group"
        >
          <div className={`text-[10px] font-bold text-slate-400 uppercase mb-1 ${
                isExporting ? "-mt-3" : ""
              } `}>
            {s.label}
          </div>
          <div className={`text-xl font-bold text-slate-900 ${s.hover}`}>
            {s.value}
          </div>
          <div className={`h-1 w-6 mx-auto ${s.color} rounded-full mt-2`}></div>
        </div>
      ))}
    </div>
  );
}

export default Stats;
