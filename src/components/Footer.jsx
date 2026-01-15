import { printedDate } from "../utils/date";


function Footer({ page, totalPages }) {
  return (
    <footer
      className="
        flex justify-between items-center
        text-[10px] text-slate-400
        border-t border-slate-100 pt-[10px]
        uppercase tracking-wider
      "
    >
      <div>
        Generated on:{" "}
        <span className="font-semibold text-slate-600">
          {printedDate()}
        </span>
      </div>

      <div>Confidential Report • mytime2cloud.com</div>

      <div>
        Page {page} of {totalPages}
      </div>
    </footer>
  );
}

export default Footer;

