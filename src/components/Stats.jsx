function Stats({ stats, isExporting }) {
  return (
    <div className="flex flex-wrap border border-slate-200 rounded-xl divide-x divide-slate-200 bg-white overflow-hidden shadow-sm">
      {stats.map((s, i) => (
        <div
          key={i}
          className="flex-1 min-w-[80px] p-3 text-center hover:bg-slate-50 transition-colors group"
        >
          <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">
            {s.label}
          </div>
          <div className={`text-xl font-bold text-slate-900 ${s.textHover}`}>
            {s.value}
          </div>
          <div className={`h-1 w-6 mx-auto ${s.color} rounded-full mt-2`}></div>
        </div>
      ))}
    </div>
  );
}

export default Stats;
