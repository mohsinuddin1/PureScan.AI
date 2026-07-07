import fs from 'fs';
import path from 'path';

const INDEXNOW_API_URL = "https://api.indexnow.org/IndexNow";
const HOST = "purescan.droploop.in";
const KEY = "4000f00744d640bc801e0e6bbe49af9e";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const DIST_DIR = "./dist";

async function submitToIndexNow() {
  console.log("\n--- [IndexNow] Automated URL Submission Started ---");

  try {
    if (!fs.existsSync(DIST_DIR)) {
      console.warn(`[IndexNow] Warning: dist directory (${DIST_DIR}) not found. Skipping IndexNow submission.`);
      return;
    }

    const files = fs.readdirSync(DIST_DIR);
    const sitemapFiles = files.filter(f => f.startsWith('sitemap-') && f.endsWith('.xml'));

    if (sitemapFiles.length === 0) {
      console.warn("[IndexNow] Warning: No sitemap-*.xml files found in dist/. Skipping IndexNow submission.");
      return;
    }

    const urlSet = new Set();
    const locRegex = /<loc>(.*?)<\/loc>/g;

    for (const file of sitemapFiles) {
      const filePath = path.join(DIST_DIR, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      let match;
      while ((match = locRegex.exec(content)) !== null) {
        const url = match[1].trim();
        if (url.startsWith(`https://${HOST}`)) {
          urlSet.add(url);
        }
      }
    }

    const urlList = Array.from(urlSet);
    console.log(`[IndexNow] Discovered ${urlList.length} unique URLs from generated sitemap(s).`);

    if (urlList.length === 0) {
      console.log("[IndexNow] No URLs to submit.");
      return;
    }

    // IndexNow allows submitting up to 10,000 URLs per request.
    const BATCH_SIZE = 10000;
    for (let i = 0; i < urlList.length; i += BATCH_SIZE) {
      const batch = urlList.slice(i, i + BATCH_SIZE);
      const payload = {
        host: HOST,
        key: KEY,
        keyLocation: KEY_LOCATION,
        urlList: batch
      };

      console.log(`[IndexNow] Submitting batch ${Math.floor(i / BATCH_SIZE) + 1} (${batch.length} URLs) to ${INDEXNOW_API_URL}...`);

      const response = await fetch(INDEXNOW_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(payload)
      });

      if (response.ok || response.status === 200 || response.status === 202) {
        console.log(`[IndexNow] ✔ Successfully submitted ${batch.length} URLs! (Status: ${response.status})`);
      } else {
        const responseText = await response.text().catch(() => "");
        console.warn(`[IndexNow] ⚠ IndexNow API responded with status ${response.status}: ${response.statusText}`, responseText);
      }
    }

    console.log("--- [IndexNow] Automated URL Submission Completed ---\n");
  } catch (error) {
    // We catch and log errors without throwing so Vercel builds never fail due to SEO network issues
    console.warn("[IndexNow] ⚠ Notice: Non-fatal error occurred during IndexNow submission:", error.message);
  }
}

submitToIndexNow();
