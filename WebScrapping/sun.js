const axios = require('axios');
const cheerio = require('cheerio');

class SunScraper {
  constructor() {
    this.sunData = [];
  }

  async scrapeSunInfo() {
    try {
      const url = 'https://theskylive.com/sun-info';
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);

      const dataRows = $('.objectdata tbody tr');

      dataRows.each((index, element) => {
        const columns = $(element).find('td');
        const date = $(columns[0]).text().trim();
        const ra = $(columns[1]).text().trim();
        const dec = $(columns[2]).text().trim();
        const mag = $(columns[3]).text().trim();
        const diameter = $(columns[4]).text().trim();

        if (date && ra && dec && mag && diameter) {
          this.sunData.push({
            date: date,
            ra: ra,
            dec: dec,
            mag: mag,
            diameter: diameter,
          });
        }
      });
    } catch (error) {
      console.error('Error:', error);
    }
  }
}

(async () => {
  const sunScraper = new SunScraper();
  await sunScraper.scrapeSunInfo();

  console.log(sunScraper.sunData);

// an example how to take only dates
const dates = sunScraper.sunData.map(data => data.date);
console.log(dates);
})();
