function Footer() {
  const printDate = new Date().toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <footer className=" pb-5 border-t border-gray-200  text-[#617c89]">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row text-sm font-medium">
        {/* Left Side: Print Timestamp */}
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-base">print</span>
          <span>
            Printed on: <span className="text-base">{printDate}</span>
          </span>
        </div>

        {/* Center: Attribution */}
        <div className="flex items-center gap-1">
          <span>Powered by</span>
          <a
            href="https://mytime2cloud.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-primary hover:underline"
          >
            mytime2cloud.com
          </a>
        </div>

        {/* Right Side: Pagination */}
        <div className="flex items-center gap-2">
          <span>
            Page 1 of 1
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
