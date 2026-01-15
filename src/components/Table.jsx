import React from "react";

const formatMinutesToHHMM = (totalMinutes) => {
  if (!totalMinutes && totalMinutes !== 0) return "--:--";

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}`;
};

function Table({ isGeneral, data = [], pageIndex = 0 }) {
  return (
    <div
      className={`flex flex-col gap-10 
        h-[${pageIndex == 0 ? "350px" : "500px"}]
        `}
    >
      <div className="border border-slate-200 rounded-xl bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500 tracking-wider">
              <tr>
                <th className="px-4 py-3 border-b w-28">Date</th>
                <th className="px-4 py-3 border-b">Shift Details</th>
                {isGeneral ? (
                  <>
                    <th className="px-4 py-3 border-b">In Time</th>
                    <th className="px-4 py-3 border-b">Out Time</th>
                    <th className="px-4 py-3 border-b text-center">
                      Late hours
                    </th>
                    <th className="px-4 py-3 border-b text-center text-amber-600">
                      Early Go
                    </th>
                  </>
                ) : (
                  <>
                    <th className="px-4 py-3 border-b">Punch Records</th>
                  </>
                )}

                <th className="px-4 py-3 border-b text-center">Overtime</th>
                <th className="px-4 py-3 border-b text-center">Work Hrs</th>
                <th className="px-4 py-3 border-b text-center">Status</th>
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

                  {isGeneral ? (
                    <>
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
                    </>
                  ) : (
                    <td className="px-4 py-3 align-top">
                      <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-1 max-w-[500px]">
                        {row.logs &&
                          row.logs.map((log, index) => {
                            console.log("log:", log, "Index:", index);

                            return (
                              <React.Fragment key={index}>
                                <div className="flex flex-col bg-white border border-slate-200 rounded-md overflow-hidden shadow-sm min-w-[110px]">
                                  <div className="px-2 py-1 text-xs font-mono text-slate-700 border-b border-slate-100 flex justify-center items-center">
                                    {/* Left Section: IN */}
                                    <span className="text-center leading-tight">
                                      {log.in} <br />
                                      <small className="block text-slate-400">
                                        {log.device_in}
                                      </small>
                                    </span>

                                    {/* Arrow */}
                                    <span className="text-slate-300 mx-2">
                                      →
                                    </span>

                                    {/* Right Section: OUT */}
                                    <span className="text-center leading-tight">
                                      {log.out} <br />
                                      <small className="block text-slate-400">
                                        {log.device_out}
                                      </small>
                                    </span>
                                  </div>
                                  <div className="px-2 py-1 text-[10px] font-bold font-mono text-slate-500 bg-slate-50 text-center">
                                    {formatMinutesToHHMM(
                                      log.total_minutes || 0
                                    )}
                                  </div>
                                </div>
                              </React.Fragment>
                            );
                          })}
                      </div>
                    </td>
                  )}

                  <td className="px-4 py-3 text-center font-mono">{row.ot}</td>
                  <td className="px-4 py-3 text-center font-mono">
                    {row.total_hrs}
                  </td>

                  <td className="px-4 py-3 text-center font-mono">
                    {row.status === "P" && (
                      <span
                        className="relative h-[30px] w-[60px] inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold
        bg-emerald-50 text-emerald-700 border border-emerald-200"
                      >
                        <span style={{ position: "absolute", top: "-2px" }}>
                          Present
                        </span>
                      </span>
                    )}

                    {row.status === "A" && (
                      <span
                        className="relative h-[30px] w-[60px] inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold
        bg-rose-50 text-rose-700 border border-rose-200"
                      >
                        <span
                          style={{
                            position: "absolute",
                            top: "-2px",
                            left: "11px",
                          }}
                        >
                          Absent
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

export default Table;
