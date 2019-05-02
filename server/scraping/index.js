const allrecipesScraper = require("./all-recipes");
const chowhoundScraper = require("./chowhound");
const epicuriousScraper = require("./epicurious");
const foodnetworkScraper = require("./food-network");
const simplyrecipesScraper = require("./simply-recipes");

const scraperObj = {
  allrecipes: allrecipesScraper,
  chowhound: chowhoundScraper,
  epicurious: epicuriousScraper,
  foodnetwork: foodnetworkScraper,
  simplyrecipes: simplyrecipesScraper
};

module.exports = scraperObj
