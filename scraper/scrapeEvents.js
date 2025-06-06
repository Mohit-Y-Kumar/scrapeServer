const puppeteer = require("puppeteer");
console.log("📁 scrapeEvents.js module loaded"); 

const scrapeEvents = async () => {
   console.log("🚀 scrapeEvents() function CALLED");
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  console.log("🧭 Puppeteer browser launched");

  const page = await browser.newPage();
  await page.goto("https://www.eventbrite.com.au/d/australia--sydney/events/", {
    waitUntil: "networkidle2",
  });

  await page.waitForSelector("a.event-card-link", { timeout: 10000 });

  // Scrape all data and filter properly
  const rawEvents = await page.$$eval("a.event-card-link", (links) =>
    links.map((link) => {

      const title = link.querySelector("h3")?.innerText?.trim();
      const dateTime = link.querySelector(".date-info__full-datetime")?.innerText?.trim() || "";

      const description = link.querySelector(".eds-event-card-content__sub")?.innerText?.trim() || "";
        const imageUrl =
      link.querySelector("picture img")?.src ||
      link.querySelector("img")?.src ||
      "";
      return {
        title: title || "", // fallback empty string
        url: link.href,
        location: link.getAttribute("data-event-location") || "",
        category: link.getAttribute("data-event-category") || "",
        paidStatus: link.getAttribute("data-event-paid-status") || "",
        dateTime,
        description,
        imageUrl,
        
      };
    })
  );

  // Filter out items without title
  const eventsWithTitle = rawEvents.filter((event) => event.title);

  // Remove duplicates based on URL
  const uniqueEvents = eventsWithTitle.filter(
    (event, index, self) =>
      index === self.findIndex((e) => e.url === event.url)
  );

  await browser.close();
  return uniqueEvents;
};

module.exports = scrapeEvents;
