const cron = require('node-cron');
const scrapeEvents = require('./scrapeEvents'); // relative path to your scraper function

cron.schedule('*/1 * * * *', async () => {  // runs every 10 minutes
  try {
    const events = await scrapeEvents();
    console.log(`Scraped ${events.length} events at`, new Date());
    // No DB operations here
  } catch (error) {
    console.error('Error during scheduled scraping:', error);
  }
});
