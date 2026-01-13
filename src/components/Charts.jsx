import React from "react";

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const Charts = ({ data }) => {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Chart 1: Attendance Trends (Area Chart) */}
      <div className="flex flex-col gap-4 rounded-xl border border-[#dbe2e6] bg-white p-6 shadow-sm">
        <div>
          <h3 className="text-lg font-bold text-[#111618]">
            Attendance Trends
          </h3>
          <p className="text-sm text-[#617c89]">
            Monthly average for selected period
          </p>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 30, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id="colorAttendance"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#13a4ec" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#13a4ec" stopOpacity={0} />
                </linearGradient>
              </defs>

              {/* MODIFIED: Removed vertical={false} to show both horizontal and vertical grid lines */}
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e5e7eb"
                vertical={true}
              />

              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#617c89", fontSize: 12 }}
                dy={10}
                padding={{ left: 10, right: 10 }}
                interval={0}
              />

              {/* Note: Grid lines will still appear based on these domain values even if the axis is hidden */}
              <YAxis hide domain={[0, 100]} />

              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
              <Area
                type="monotone"
                dataKey="attendance"
                stroke="#13a4ec"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorAttendance)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 2: Efficiency Breakdown (Stacked Bar Chart) */}
      <div className="flex flex-col gap-4 rounded-xl border border-[#dbe2e6] bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-[#111618]">
              Efficiency Breakdown
            </h3>
            <p className="text-sm text-[#617c89]">Overtime vs. Lost Hours</p>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              /* 'categoryGap' controls space between monthly groups. 
       Adjust this percentage to make bars wider/thinner */
              categoryGap="30%"
            >
              <CartesianGrid
                strokeDasharray="3 3"
                /* Use a darker grey for better visibility */
                stroke="#e5e7eb"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#617c89", fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#617c89", fontSize: 12 }}
              />
              <Tooltip cursor={{ fill: "#f9fafb" }} />

              {/* BOTTOM SEGMENT: Overtime (No radius) */}
              <Bar
                dataKey="overtime"
                name="Overtime"
                stackId="a"
                fill="#f97316"
                barSize={32}
              />

              {/* TOP SEGMENT: Lost Hours (Rounded top only) */}
              <Bar
                dataKey="lost"
                name="Lost Hours"
                stackId="a"
                fill="#f87171"
                /* [TopLeft, TopRight, BottomRight, BottomLeft] */
                radius={[4, 4, 0, 0]}
                barSize={32}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Charts;
