const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// 📁 Output directory
const DOWNLOAD_DIR = path.join(__dirname, 'reports');

// ✅ Ensure directory exists
if (!fs.existsSync(DOWNLOAD_DIR)) {
  fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });
  console.log("📁 Created reports folder");
}

// 🔧 Dynamic config (EDIT HERE ONLY)
const CONFIG = {
  company_id: "60",
  company_name: "Hilal cleaning company",
  from_date: "2026-03-01",
  to_date: "2026-03-31",
  shift_type_id: "0",
  employeeIds: ["10000007", "100001", "100002"]
};

// 🧹 Clear old files
function clearDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    fs.unlinkSync(path.join(dir, file));
  }
}

// ⏳ Wait for download completion
function waitForDownload(dir) {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      const files = fs.readdirSync(dir);
      const downloading = files.some(f => f.endsWith('.crdownload'));

      if (!downloading && files.length > 0) {
        clearInterval(interval);
        resolve();
      }
    }, 1000);
  });
}

// 📂 Get latest file
function getLatestFile(dir) {
  const files = fs.readdirSync(dir)
    .map(file => ({
      name: file,
      time: fs.statSync(path.join(dir, file)).mtime.getTime()
    }))
    .sort((a, b) => b.time - a.time);

  return files[0]?.name;
}

// 🔗 Build URL dynamically
function buildUrl(empId) {
  const params = new URLSearchParams({
    employee_ids: empId,
    company_id: CONFIG.company_id,
    from_date: CONFIG.from_date,
    to_date: CONFIG.to_date,
    shift_type_id: CONFIG.shift_type_id,
    company_name: CONFIG.company_name
  });

  return `http://localhost:5717/attendance-report/?${params.toString()}`;
}

async function run() {
  console.log("🚀 Starting dynamic PDF generation...");

  clearDirectory(DOWNLOAD_DIR);

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: [
      '--start-maximized',
      '--no-sandbox',
      '--disable-dev-shm-usage'
    ]
  });

  const page = await browser.newPage();

  // await page.setViewport({ width: 1920, height: 1080 });

  // ✅ Enable downloads
  const client = await page.target().createCDPSession();
  await client.send('Page.setDownloadBehavior', {
    behavior: 'allow',
    downloadPath: DOWNLOAD_DIR
  });

  for (const empId of CONFIG.employeeIds) {
    try {
      console.log(`\n👤 Employee: ${empId}`);

      const url = buildUrl(empId);

      console.log("🔗 Opening:", url);

      await page.goto(url, {
        waitUntil: 'networkidle2',
        timeout: 0
      });

      console.log("⏳ Waiting for PDF generation...");

      await page.waitForFunction(() => {
        const el = document.querySelector('#statusText');
        return el && el.innerText.includes('Ready!');
      }, { timeout: 600000 });

      console.log("📥 Waiting for download...");

      await waitForDownload(DOWNLOAD_DIR);

      const latestFile = getLatestFile(DOWNLOAD_DIR);

      if (!latestFile) {
        throw new Error("No downloaded file found");
      }

      // ✅ New filename format (company_id added)
      const newFileName = `Attendance_Report_${CONFIG.company_id}_Template4_${CONFIG.from_date}_${CONFIG.to_date}_${empId}.pdf`;

      fs.renameSync(
        path.join(DOWNLOAD_DIR, latestFile),
        path.join(DOWNLOAD_DIR, newFileName)
      );

      console.log(`✅ Saved: ${newFileName}`);

      await new Promise(res => setTimeout(res, 2000));

    } catch (err) {
      console.error(`❌ Error for ${empId}:`, err.message);
    }
  }

  await browser.close();

  console.log("\n🎉 All PDFs generated successfully!");
}

run();