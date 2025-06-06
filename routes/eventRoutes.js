const express = require("express");
const router = express.Router();
const scrapeEvents = require("../scraper/scrapeEvents");
const Subscription = require("../models/subscription");


// Route to get scraped events
router.get("/events", async (req, res) => {
  try {
    console.log("Scrape start");
    const events = await scrapeEvents();

    if (!events || events.length === 0) {
      console.log("No events fetched");
    } else {
      console.log("Fetched events count: ", events.length);
      console.log("Sample event: ", events[0]);
    }

    res.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Failed to fetch events" });
  }
});


router.post("/subscribe", async (req, res) => {
  const { email, eventLink } = req.body;
  console.log("POST /api/subscribe called with:", req.body);

  try {
    const newSubscription = new Subscription({ email, eventLink });
    await newSubscription.save();

    res.json({ message: "Subscribed successfully" });
  } catch (error) {
    console.error("Failed to save subscription:", error);
    res.status(500).json({ message: "Failed to subscribe" });
  }
});


module.exports = router;
