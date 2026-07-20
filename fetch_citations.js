import fs from 'fs';
import path from 'path';

// Sleep helper to avoid API rate limits
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchCitations() {
  console.log("Starting citation fetch for all blogs...");
  const queriesPath = path.join(process.cwd(), 'blog_queries.json');
  const queries = JSON.parse(fs.readFileSync(queriesPath, 'utf8'));
  const allCitations = [];

  for (const item of queries) {
    console.log(`Processing: ${item.file}`);
    const searchTerm = encodeURIComponent(item.query);
    
    try {
      // 1. Search for PMIDs
      const searchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${searchTerm}&retmode=json&retmax=5`;
      const searchRes = await fetch(searchUrl);
      const searchData = await searchRes.json();
      const ids = searchData.esearchresult.idlist;
      
      if (!ids || ids.length === 0) {
        console.warn(`No results found for query: ${item.query}`);
        continue;
      }
      
      await sleep(500); // Respect rate limit
      
      // 2. Fetch Summaries
      const summaryUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${ids.join(',')}&retmode=json`;
      const summaryRes = await fetch(summaryUrl);
      const summaryData = await summaryRes.json();
      const results = summaryData.result;
      
      let markdownSection = `\n\n### Sources & References\n`;
      let fileCitations = { file: item.file, citations: [] };
      
      let count = 1;
      for (const id of ids) {
        if (!results[id]) continue;
        const title = results[id].title;
        const url = `https://pubmed.ncbi.nlm.nih.gov/${id}/`;
        
        // Clean up title (remove trailing dot if exists)
        const cleanTitle = title.endsWith('.') ? title.slice(0, -1) : title;
        markdownSection += `${count}. [${cleanTitle} — PubMed](${url})\n`;
        
        fileCitations.citations.push({
          title: cleanTitle,
          url: url
        });
        count++;
      }
      
      // 3. Append to .mdx file
      const filePath = path.join(process.cwd(), 'src/content/blog/en', item.file);
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Prevent duplicate appends if script is run multiple times
      if (!content.includes('### Sources & References')) {
        // If content ends with closing div or similar, we should insert it inside the prose div.
        // Wait, looking at the first file, it ends with: "protect your long-term health.</p></div>"
        // Let's just inject it before the last </div> if it exists, or append if it doesn't.
        if (content.trim().endsWith('</div>')) {
            const index = content.lastIndexOf('</div>');
            content = content.slice(0, index) + markdownSection + '</div>\n';
        } else {
            content += markdownSection;
        }
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${item.file}`);
      } else {
        console.log(`Skipped ${item.file} (already has citations)`);
      }
      
      allCitations.push(fileCitations);
      await sleep(500); // Respect rate limit
      
    } catch (error) {
      console.error(`Error processing ${item.file}:`, error.message);
    }
  }
  
  // Save master citations file
  const citationsFile = path.join(process.cwd(), 'all_blog_citations.json');
  fs.writeFileSync(citationsFile, JSON.stringify(allCitations, null, 2));
  console.log(`Saved master citations list to ${citationsFile}`);
  console.log("Done!");
}

fetchCitations();
