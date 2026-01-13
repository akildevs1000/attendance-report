
function Table({ data = [], pageIndex = 0 }) {
  return (
    <div className={`flex flex-col gap-10 h-[${pageIndex == 0 ? "1080px" : "1280px"}]`}>
      <div
        className="border border-slate-200 rounded-xl bg-white"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500 tracking-wider">
              <tr>
                <th className="px-4 py-3 border-b w-28">Date</th>
                <th className="px-4 py-3 border-b">Shift Details</th>
                <th className="px-4 py-3 border-b">In Time</th>
                <th className="px-4 py-3 border-b">Out Time</th>
                <th className="px-4 py-3 border-b text-center">Late hours</th>
                <th className="px-4 py-3 border-b text-center text-amber-600">
                  Early Go
                </th>
                <th className="px-4 py-3 border-b text-center">Overtime</th>
                <th className="px-4 py-3 border-b text-center">Work Hrs</th>
                <th className="px-4 py-3 border-b text-center">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {data.map((row, rowIndex) => (
                <tr
                  key={`${rowIndex}`}
                  className={`hover:bg-slate-50 transition-colors ${row.status === "A"
                    ? "bg-rose-100/50"
                    : row.day === "Sunday"
                      ? "bg-amber-100/50"
                      : ""
                    }`}
                >
                  <td className="px-4 py-3">
                    <div className="font-bold">{row.date}</div>
                    <div
                      className={`text-xs ${row.status === "H"
                        ? "text-amber-600 font-semibold"
                        : "text-slate-500"
                        }`}
                    >
                      {row.day}
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <div className="text-xs font-medium">
                      {row?.shift?.name || "---"}
                    </div>
                    <div className="text-[10px] text-slate-400 uppercase">
                      {row?.shift_type?.name || "---"}
                    </div>
                  </td>

                  <td className="px-4 py-3 font-medium text-slate-600">
                    {row.in}
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-600">
                    {row.out}
                  </td>
                  <td className="px-4 py-3 text-center font-mono">
                    {row.late_coming}
                  </td>
                  <td className="px-4 py-3 text-center font-mono">
                    {row.early_going}
                  </td>
                  <td className="px-4 py-3 text-center font-mono">
                    {row.ot}
                  </td>
                  <td className="px-4 py-3 text-center font-mono">
                    {row.total_hrs}
                  </td>
                  <td className="px-4 py-3 text-center font-semibold">
                    {row.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Page footer (important for PDF) */}
        <div className="p-2 text-right text-xs text-gray-400">
          {/* Page {pageIndex + 1} of {pages.length} */}
        </div>
      </div>
    </div>
  );
}

export default Table;
