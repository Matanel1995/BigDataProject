const cors = require('cors');
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
app.use(cors());
const port = 10000;

async function scrapeSunInfo() {
  try {
    const url = 'https://theskylive.com/sun-info';
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const sunData = [];
    const dataRows = $('.objectdata tbody tr');

    dataRows.each((index, element) => {
      const columns = $(element).find('td');
      const date = $(columns[0]).text().trim();
      const ra = $(columns[1]).text().trim();
      const dec = $(columns[2]).text().trim();
      const mag = $(columns[3]).text().trim();
      const diameter = $(columns[4]).text().trim();

      if (date && ra && dec && mag && diameter) {
        sunData.push({
          date: date,
          ra: ra,
          dec: dec,
          mag: mag,
          diameter: diameter,
        });
      }
    });

    return sunData;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

app.get('/getSunData', async (req, res) => {
  try {
    const sunData = await scrapeSunInfo();

    res.send({sunData});
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error fetching Sun data' });
  }
});

async function scrapeClosestApproach() {
  try {
    const url = 'https://theskylive.com/sun-info';
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const closestApproachData = {};

    // Extract the description
    const descriptionElement = $('h1:contains("Closest Approach of The Sun to Earth")').next('p');
    const description = descriptionElement.text().trim();

    // closestApproachData['Title'] = 'Closest Approach of The Sun to Earth';
    closestApproachData['Description'] = description;

    $('.keyinfobox').each((index, element) => {
      const label = $(element).find('label').text().trim();
      const value = $(element).find('ar').text().trim();

      if (label === 'Date' || label === 'Distance Kilometers' || label === 'Distance AU') {
        closestApproachData[label] = value;
      }
    });

    return closestApproachData;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}


app.get('/getClosestApproach', async (req, res) => {
  try {
      const closestApproachData = await scrapeClosestApproach();

      res.send({ closestApproachData });
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Error fetching Sun data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});