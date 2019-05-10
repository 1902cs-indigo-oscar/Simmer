import allrecipesScraper from './all-recipes.js';
import chowhoundScraper from './chowhound.js';
import epicuriousScraper from './epicurious.js';
import foodnetworkScraper from './food-network.js';
import simplyrecipesScraper from './simply-recipes.js';

 const scraper = {
  allrecipes: allrecipesScraper,
  chowhound: chowhoundScraper,
  epicurious: epicuriousScraper,
  foodnetwork: foodnetworkScraper,
  simplyrecipes: simplyrecipesScraper
}
export default scraper;


