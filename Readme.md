# Event Scraper Project

This project scrapes event data from Eventbrite for Sydney, Australia, and exposes the data via a REST API built with Express.js.

## Features

- Automated web scraping using Puppeteer
- Scheduled scraping with a cron job running every 30 minutes
- Express.js API to serve scraped events
- MongoDB integration removed (can be added if needed)

## Prerequisites

- Node.js (v14 or higher recommended)
- npm (comes with Node.js)
- Internet connection (for scraping Eventbrite)

## Installation

1. Clone the repository or download the source code:

   ```bash
   git clone https://github.com/yourusername/event-scraper.git
   cd event-scraper
## Install dependencies:
     npm install

## Create a .env file in the project root to specify your server port 


## To start the server and run the scraper cron job:
 node server.js

GET http://localhost:4000/api/events

## project structure 
.
├── scrapper/
│   ├── scrapeEvents.js       # Puppeteer scraper function
│   ├── scrapeCron.js         # Cron job to run scraper periodically
├── routes/
│   └── eventRoutes.js        # API route definitions
├── server.js                 # Express server setup and start
├── package.json              # Node project dependencies
└── README.md                 # Project documentation
