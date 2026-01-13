function Footer() {
  const printDate = new Date().toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <footer className="flex justify-between items-center text-[10px] text-slate-400 border-t border-slate-100 pt-4 uppercase tracking-wider">
      <div>
        Generated on:{" "}
        <span className="font-semibold text-slate-600">{printDate}</span>
      </div>
      <div>Confidential Report • mytime2cloud.com</div>
      <div>Page 1 of 3</div>
    </footer>
  );
}

export default Footer;
