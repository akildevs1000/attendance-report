import React from "react";
import { formatMinutesToHHMM } from "../utils/date";

function GeneralTable({ isGeneral, data = [], pageIndex = 0 }) {
  return (
    <div
      className={`flex flex-col gap-10 
        h-[${pageIndex == 0 ? "350px" : "800px"}]
        `}
    >
      <div className="border border-slate-200 rounded-xl bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500 tracking-wider">
              <tr className="">
                <th className="p-1 border-b relative h-8 w-28">
                  <div className="absolute top-[0px] left-[30px]">Date</div>
                </th>
                <th className="p-1 border-b relative">
                  <div className="absolute top-[0px] left-[30px]">Shift</div>
                </th>
                <th className="p-1 border-b relative">
                  <div className="absolute top-[0px]">In Time</div>
                </th>

                <th className="p-1 border-b relative">
                  <div className="absolute top-[0px]">Out Time</div>
                </th>

                <th className="p-1 border-b relative">
                  <div className="absolute top-[0px]">Late hours</div>
                </th>

                <th className="p-1 border-b relative">
                  <div className="absolute top-[0px]">Early Go</div>
                </th>

                <th className="p-1 border-b relative text-center">
                  <div className="absolute top-[0px]">Overtime</div>
                </th>
                <th className="p-1 border-b relative text-center">
                  <div className="absolute top-[0px]">Total Hours</div>
                </th>
                <th className="p-1 border-b relative text-center">
                  <div className="absolute top-[0px] left-[50px]">Status</div>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {data.map((row, rowIndex) => (
                <tr
                  key={`${rowIndex}`}
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

                  <td className="px-4 py-3 text-center font-mono">{row.ot}</td>
                  <td className="px-4 py-3 text-center font-mono">
                    {row.total_hrs}
                  </td>

                  <td className="px-4 py-3 text-center font-mono">
                    {["P", "EG", "LC"].includes(row.status) && (
                      <span
                        className="relative h-[30px] w-[60px] mt-2 inline-flex items-center justify-center rounded text-[11px] font-bold
               bg-emerald-50 text-emerald-700 border border-emerald-200"
                      >
                        <span style={{ position: "absolute", top: "-2px" }}>
                          Present
                        </span>
                      </span>
                    )}

                    {["A", "L", "H", "ME"].includes(row.status) && (
                      <span
                        className="relative h-[30px] w-[60px] mt-2 inline-flex items-center  rounded text-[11px] font-bold
        bg-rose-50 text-rose-700 border border-rose-200"
                      >
                        <span
                          style={{
                            position: "absolute",
                            top: "-3px",
                            left: "11px",
                          }}
                        >
                          Absent
                        </span>
                      </span>
                    )}

                    {row.status === "M" && (
                      <span
                        className="relative h-[30px] w-[60px] mt-2 inline-flex items-center justify-center rounded text-[11px] font-bold
                 bg-gray-100 text-gray-700 border border-gray-300"
                      >
                        <span style={{ position: "absolute", top: "-2px" }}>
                          Incomplete
                        </span>
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default GeneralTable;
