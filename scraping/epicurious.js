const rp = require("request-promise");
const $ = require("cheerio");
const url =
  "https://www.epicurious.com/recipes/food/views/our-favorite-spaghetti-and-meatballs-56389489";

const epicuriousScraper = (url) => {
  return rp(url)
    .then(function (html) {
      //success!
      const article = {
        site: "epicurious"
      };
      article.url = url
      article.title = $(".title-source h1", html).text().trim();
      article.author = $(".contributor", html).text();
      article.ingredients = $('.ingredient', html).each(function () {
        $(this).append("**");
      }).text().split('**');
      article.instructions = $('.preparation-steps', html).text().trim().split(/\s\s+/);
      let times = $('.summary-data', html).each(function () {
        $(('dt'),this).append(": ");
      }).text().trim().split(/\s\s+/);
      let nutrition = $('.nutrition ul li', html).each(function () {
        $(('span'), this).append(" ");
      }).text().trim().split(/\s\s+/);
      article.misc = times.concat(nutrition)
      article.imageUrl = $("picture > source", html).attr("srcset");
      return article;
    })
    .catch(function (err) {
      console.error(err);
    });
}

  module.exports = epicuriousScraper;
