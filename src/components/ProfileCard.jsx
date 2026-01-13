function ProfileCard({ employee, isExporting }) {
  if (!employee) return null;

  employee.profile_picture = `https://backend.mytime2cloud.com/media/employee/profile_picture/1765458674.jpg`;

  return (
    <div className="rounded-xl border border-[#dbe2e6] bg-white p-6  ">
      <div className="flex flex-col gap-6 md:flex-row md:items-center">
        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-full border-4 border-white shadow-sm ">
          <div
            className="bg-center bg-no-repeat h-full w-full bg-cover"
            data-alt="Portrait of Sarah Jenkins, senior employee"
            style={{
              backgroundImage: `url(${employee.profile_picture})`,
            }}
          ></div>
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <div className="flex items-center gap-3">
            <h3 className="text-2xl font-bold text-[#111618] ">
              {employee.full_name}
            </h3>
            {employee.status == 1 ? (
              <span className="inline-flex h-[25px] items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-bold leading-none text-green-700">
                <span
                  className={`${isExporting ? "mt-[-15px]" : ""} block`}
                >
                  Active
                </span>
              </span>
            ) : (
              <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-bold text-red-700">
                Not Active
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#617c89] ">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-lg">badge</span>
              ID: {employee.employee_id}
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-lg">work</span>
              {employee.designation?.name}
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-lg">
                apartment
              </span>
              {employee.department?.name}
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-lg">mail</span>
              {employee.local_email || "- -"}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-8 border-t border-[#f0f3f4] pt-4 md:border-l md:border-t-0 md:pl-8 md:pt-0 ">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-[#617c89] ">
              Manager
            </p>
            <p className="font-bold text-[#111618] ">
              {employee?.branch?.reporting_manager || "--"}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-[#617c89] ">
              Join Date
            </p>
            <p className="font-bold text-[#111618] ">
              {employee.joining_date ? employee.show_joining_date : "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
