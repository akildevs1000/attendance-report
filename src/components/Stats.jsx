function Stats({ data, isExporting }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* <!-- Stat Card 1 --> */}
      <div className="flex flex-col gap-3 rounded-xl border border-[#dbe2e6] bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)]  ">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center rounded-lg bg-blue-50 p-2 text-blue-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              className="h-5 w-5"
              fill="currentColor"
            >
              <path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z" />
            </svg>{" "}
          </div>

          <span className="flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-bold text-green-700  ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="currentColor"
            >
              <path d="m147-209-51-51 281-281 152 152 212-211H624v-72h240v240h-72v-117L529-287 377-439 147-209Z" />
            </svg>
            <span className={`${isExporting ? "mt-[-15px]" : "mt-0"} block`}>+5.2%</span>
          </span>
        </div>
        <div>
          <p className="text-sm font-medium text-[#617c89] ">
            Total Working Hours
          </p>
          <p className="mt-1 text-3xl font-bold tracking-tight text-[#111618] ">
            {data.total_hrs}
          </p>
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-[#f0f3f4] ">
          <div className="h-full w-[85%] rounded-full bg-blue-500"></div>
        </div>
      </div>
      {/* <!-- Stat Card 2 --> */}
      <div className="flex flex-col gap-3 rounded-xl border border-[#dbe2e6] bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)]  ">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center rounded-lg bg-purple-50 p-2 text-purple-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="currentColor"
            >
              <path d="M360-816v-72h240v72H360Zm84 432h72v-240h-72v240Zm36 288q-70 0-130.92-26.51-60.92-26.5-106.49-72.08-45.58-45.57-72.08-106.49Q144-362 144-432q0-70 26.51-130.92 26.5-60.92 72.08-106.49 45.57-45.58 106.49-72.08Q410-768 479.56-768q58.28 0 111.86 19.5T691-694l52-51 50 50-51 52q35 45 54.5 98.81T816-431.86q0 69.86-26.51 130.78-26.5 60.92-72.08 106.49-45.57 45.58-106.49 72.08Q550-96 480-96Zm0-72q110 0 187-77t77-187q0-110-77-187t-187-77q-110 0-187 77t-77 187q0 110 77 187t187 77Zm0-264Z" />
            </svg>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-bold text-green-700  ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="currentColor"
            >
              <path d="m147-209-51-51 281-281 152 152 212-211H624v-72h240v240h-72v-117L529-287 377-439 147-209Z" />
            </svg>
            <span className={`${isExporting ? "mt-[-15px]" : "mt-0"} block`}>+2.1%</span>
          </span>
        </div>
        <div>
          <p className="text-sm font-medium text-[#617c89] ">
            Avg. Punctuality
          </p>
          <p className="mt-1 text-3xl font-bold tracking-tight text-[#111618] ">
            {data.total_punctuality}
          </p>
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-[#f0f3f4] ">
          <div className="h-full w-[96%] rounded-full bg-purple-500"></div>
        </div>
      </div>
      {/* <!-- Stat Card 3 --> */}
      <div className="flex flex-col gap-3 rounded-xl border border-[#dbe2e6] bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)]  ">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center rounded-lg bg-orange-50 p-2 text-orange-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="currentColor"
            >
              <path d="M614-310 444-480v-240h72v210l149 149-51 51Zm-483-10q-14-29-22.5-60.5T97-444h73q2 23 8 44.5t15 42.5l-62 37ZM98-516q3-32 11-63.5t22-60.5l63 36q-9 21-15.5 43t-8.5 45H98Zm160 349q-26-19-49-41.5T167-257l63-37q13 19 29 34.5t35 29.5l-36 63Zm-28-499-63-36q19-27 41.5-49.5T258-793l36 63q-18 14-34 29.5T230-666ZM444-97q-32-3-63.5-11.5T320-131l36-62q21 9 43 15t45 8v73Zm-87-669-37-63q29-14 60.5-22.5T444-863v73q-23 2-44.5 8.5T357-766ZM516-97v-73q23-2 45-8t43-15l36 62q-29 14-60.5 22.5T516-97Zm88-670q-21-9-43-15t-45-8v-73q32 3 63.5 11.5T640-829l-36 62Zm98 600-36-62q19-14 34.5-30.5T730-294l63 37q-19 26-42 48.5T702-167Zm28-499q-14-18-30-34t-34-30l36-63q26 19 49 41.5t42 48.5l-63 37Zm60 150q-2-23-8-44.5T767-603l62-37q14 29 22.5 60.5T863-516h-73Zm39 196-62-36q9-21 15-43t8-45h73q-3 32-11.5 63.5T829-320Z" />
            </svg>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-bold text-red-600 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="currentColor"
            >
              <path d="M624-209v-72h117L529-492 377-340 96-621l51-51 230 230 152-152 263 262v-117h72v240H624Z" />
            </svg>
            <span className={`${isExporting ? "mt-[-15px]" : "mt-0"} block`}>-10%</span>
          </span>
        </div>
        <div>
          <p className="text-sm font-medium text-[#617c89] ">Total Overtime</p>
          <p className="mt-1 text-3xl font-bold tracking-tight text-[#111618] ">
            {data.total_ot_hrs}
          </p>
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-[#f0f3f4] ">
          <div className="h-full w-[35%] rounded-full bg-orange-500"></div>
        </div>
      </div>
      {/* <!-- Stat Card 4 --> */}
      <div className="flex flex-col gap-3 rounded-xl border border-[#dbe2e6] bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)]  ">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center rounded-lg bg-emerald-50 p-2 text-emerald-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="currentColor"
            >
              <path d="M438-208 302-344l51-51 85 85 169-170 51 51-220 221ZM216-96q-29.7 0-50.85-21.5Q144-139 144-168v-528q0-29 21.15-50.5T216-768h72v-96h72v96h240v-96h72v96h72q29.7 0 50.85 21.5Q816-725 816-696v528q0 29-21.15 50.5T744-96H216Zm0-72h528v-360H216v360Zm0-432h528v-96H216v96Zm0 0v-96 96Z" />
            </svg>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-bold text-green-700  ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="currentColor"
            >
              <path d="m147-209-51-51 281-281 152 152 212-211H624v-72h240v240h-72v-117L529-287 377-439 147-209Z" />
            </svg>
            <span className={`${isExporting ? "mt-[-15px]" : "mt-0"} block`}>+0.5%</span>
          </span>
        </div>
        <div>
          <p className="text-sm font-medium text-[#617c89] ">Attendance Rate</p>
          <p className="mt-1 text-3xl font-bold tracking-tight text-[#111618] ">
            {data.total_attendance_rate}
          </p>
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-[#f0f3f4] ">
          <div className="h-full w-[98.5%] rounded-full bg-emerald-500"></div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
