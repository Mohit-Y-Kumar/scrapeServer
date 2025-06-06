const scrapeEvents = require("./scrapeEvents");

(async () => {
  try {
    const events = await scrapeEvents();
    console.log(events);
  } catch (error) {
    console.error("Error while scraping events:", error);
  }
})();
