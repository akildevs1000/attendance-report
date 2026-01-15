function ProfileAndHighlights({ employee }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      <div className="lg:col-span-4 bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-row items-center gap-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-accent/5 to-transparent rounded-bl-full"></div>
        <div className="w-16 h-16 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-300 shrink-0 shadow-sm z-10">
          <span className="material-symbols-outlined text-4xl">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="40px"
              viewBox="0 -960 960 960"
              width="40px"
              fill="currentColor"
            >
              <path d="M480-480q-60 0-102-42t-42-102q0-60 42-102t102-42q60 0 102 42t42 102q0 60-42 102t-102 42ZM192-192v-96q0-23 12.5-43.5T239-366q55-32 116.29-49 61.29-17 124.5-17t124.71 17Q666-398 721-366q22 13 34.5 34t12.5 44v96H192Zm72-72h432v-24q0-5.18-3.03-9.41-3.02-4.24-7.97-6.59-46-28-98-42t-107-14q-55 0-107 14t-98 42q-5 4-8 7.72-3 3.73-3 8.28v24Zm216.21-288Q510-552 531-573.21t21-51Q552-654 530.79-675t-51-21Q450-696 429-674.79t-21 51Q408-594 429.21-573t51 21Zm-.21-72Zm0 360Z" />
            </svg>
          </span>
        </div>
        <div className="flex-1 min-w-0 z-10">
          <h3 className="text-lg font-bold text-slate-900 truncate">
            {employee?.first_name}
          </h3>
          <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-1">
            ID: {employee?.employee_id}
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            {/* <span className="truncate">Dept: {employee?.department?.name}</span> */}
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
            } border border-slate-200 rounded-xl p-2 flex flex-col justify-center items-center shadow-sm relative overflow-hidden group`}
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
              className={`text-2xl font-display font-bold ${
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
