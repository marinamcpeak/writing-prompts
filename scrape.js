const fs = require('fs');
const RedditScraper = require("reddit-scraper");
const bannedTerms = ['[AP]', '[EU]', 'r/WritingPrompts', 'r/writingprompts'];
 
(async () => {
  const redditScraperOptions = {
      AppId: "25wepfBRpohU-A",
      AppSecret: "_zOW7_ev7vVg5wf1Qk66LDgAr5qcXA",
  };
  const requestOptions = {
      Pages: 5,
      Records: 25,
      SubReddit: "WritingPrompts",
      SortType: "top",
  };

  try {
    const redditScraper = new RedditScraper.RedditScraper(redditScraperOptions);
    const scrapedData = await redditScraper.scrapeData(requestOptions);
    let data = scrapedData.map(d => ({
      title: d.data.title,
      created: d.data.created,
      id: d.data.name
    }));
    
    data = data.filter(d => d.title.startsWith('[WP]'))
    
    bannedTerms.forEach(term => {
      data = data.filter(d => !d.title.includes(term));
    });
    
    data.forEach(d => {
      d.title = d.title.replace('[WP]:', '');
      d.title = d.title.replace('[WP]', '');
      d.title = d.title.trim();
    });

    fs.writeFileSync('./prompts.json', JSON.stringify(data));
    console.log(`Saved ${data.length} records`);
} catch (error) {
    console.error(error);
}
})();