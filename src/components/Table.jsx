import React from "react";

const chunkArrayForPdf = (arr = []) => {
  const chunks = [];

  if (arr.length === 0) return chunks;

  // 1. Get the first 7 records for Page 1
  chunks.push(arr.slice(0, 7));

  // 2. Get the rest of the records starting from index 7
  const remainingData = arr.slice(7);
  const size = 10;

  for (let i = 0; i < remainingData.length; i += size) {
    chunks.push(remainingData.slice(i, i + size));
  }

  return chunks;
};

function Table({ attendanceData = [], rowsPerPage = 7 }) {
  const pages = chunkArrayForPdf(attendanceData);

  return (
    <div className="flex flex-col gap-10">
      {pages.map((page, pageIndex) => (
        <div
          key={pageIndex}
          className="pdf-page-section border border-slate-200 rounded-xl overflow-hidden bg-white"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500 tracking-wider">
                <tr>
                  <th className="px-4 py-3 border-b w-28">Date {pageIndex}</th>
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
                {page.map((row, rowIndex) => (
                  <tr
                    key={`${pageIndex}-${rowIndex}`}
                    className={`hover:bg-slate-50 transition-colors ${
                      row.status === "A"
                        ? "bg-rose-100/50"
                        : row.day === "Sunday"
                        ? "bg-amber-100/50"
                        : ""
                    }`}
                  >
                    <td className="px-4 py-3">
                      <div className="font-bold">{row.date}</div>
                      <div
                        className={`text-xs ${
                          row.status === "H"
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
            Page {pageIndex + 1} of {pages.length}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Table;
