function Header({
  isExporting,
  company_name = "Organization",
  from_date,
  to_date,
}) {
  const getDate = (dateStr) => {
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(dateStr));
  };

  return (
    <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-200 pb-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-display font-bold text-slate-900 tracking-tight uppercase">
          Monthly Attendance Report
        </h1>
        <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
          <span className="material-symbols-outlined text-accent text-lg">
            calendar_month
          </span>
          <span>
            {getDate(from_date)} - {getDate(to_date)}
          </span>
          <span className="w-1 h-1 bg-slate-300 rounded-full mx-1"></span>
          <span className="text-slate-400">Monthly Exact</span>
        </div>
      </div>
      <div className="flex items-center gap-4 mt-4 md:mt-0 bg-slate-50 px-4 py-2 rounded-lg border border-slate-200">
        <div className="w-10 h-10 bg-accent rounded flex items-center justify-center text-white shadow-sm shadow-indigo-200">
          <span className="material-symbols-outlined">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="30px"
              viewBox="0 -960 960 960"
              width="30px"
              fill="currentColor"
            >
              <path d="M144-144v-528h144v-144h360v288h168v384H528v-144h-96v144H144Zm72-72h72v-72h-72v72Zm0-156h72v-72h-72v72Zm0-156h72v-72h-72v72Zm144 156h72v-72h-72v72Zm0-156h72v-72h-72v72Zm0-144h72v-72h-72v72Zm144 300h72v-72h-72v72Zm0-156h72v-72h-72v72Zm0-144h72v-72h-72v72Zm168 456h72v-72h-72v72Zm0-156h72v-72h-72v72Z" />
            </svg>
          </span>
        </div>
        <div>
          <h2
            className={`${
              isExporting ? "-mt-4" : ""
            } text-sm font-bold text-slate-900 uppercase tracking-wide`}
          >
            {company_name}
          </h2>
          <div className="text-xs text-slate-500 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">
              location_on
            </span>
            Head Office
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
