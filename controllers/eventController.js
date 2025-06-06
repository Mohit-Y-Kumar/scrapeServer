const scrapeEvents = require("../scraper/scrapeEvents");

// Get events by scraping and send as response
const getEvents = async (req, res) => {
  try {
    const events = await scrapeEvents();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
};

// Scrape events and send success message (no DB store)
const fetchAndStoreEvents = async (req, res) => {
  try {
    const scraped = await scrapeEvents();
    res.json({ message: "Events fetched", count: scraped.length });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
};

module.exports = { getEvents, fetchAndStoreEvents };
