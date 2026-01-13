function MonthlyBreakdownTable({ data, isExporting }) {
  return (
    <div className="rounded-xl border border-[#dbe2e6] bg-white min-h-[780px]">
      <div className="flex flex-wrap items-center justify-between gap-4 p-3 border-b border-[#f0f3f4] ">
        <p className="font-bold text-[#111618] ">Monthly Breakdown</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#f8f9fa] text-[#617c89]">
            <tr>
              <th className="px-6 py-4 font-semibold">Month</th>
              <th className="px-6 py-4 font-semibold">Present</th>
              <th className="px-6 py-4 font-semibold">Absent</th>
              <th className="px-6 py-4 font-semibold">Leave</th>
              <th className="px-6 py-4 font-semibold">Total Hours</th>
              <th className="px-6 py-4 font-semibold">Overtime</th>
              <th className="px-6 py-4 font-semibold">Lost Hours</th>
              <th className="px-6 py-4 font-semibold">Punctuality</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f0f3f4]">
            {data.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                {/* Month Name */}
                <td className="px-6 py-4 font-bold text-[#111618]">
                  {item.month}
                </td>

                {/* Present (Green) */}
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <span className="inline-flex items-center rounded px-2 py-0.5 text-xs font-medium text-green-700">
                      {item.present}
                    </span>
                  </div>
                </td>

                {/* Absent (Red) */}
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <span className="inline-flex items-center rounded px-2 py-0.5 text-xs font-medium text-red-700">
                      {item.absent}
                    </span>
                  </div>
                </td>

                {/* Leave (Gray) */}
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <span className="inline-flex items-center rounded  px-2 py-0.5 text-xs font-medium text-gray-700">
                      {item.leave}
                    </span>
                  </div>
                </td>

                {/* Total Hours */}
                <td className="px-6 py-4 text-[#111618]">{item.total_hrs}</td>

                {/* OT Hours (Orange) */}
                <td className="px-6 py-4 text-orange-600 font-medium">
                  {item.ot_hrs}
                </td>

                {/* Lost Hours */}
                <td className="px-6 py-4 text-[#617c89]">
                  {item.lost_hrs === "00:00" ? "-" : item.lost_hrs}
                </td>

                {/* Punctuality Progress Bar */}
                <td className="px-6 py-4">
                  <span
                    className={`text-xs font-medium text-[#111618] ${
                      isExporting ? "mt-0" : "mt-0"
                    }`}
                  >
                    {item.punctuality}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MonthlyBreakdownTable;
