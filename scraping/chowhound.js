const rp = require("request-promise");
const $ = require("cheerio");
const url = "https://www.chowhound.com/recipes/creamy-beet-linguine-walnuts-feta-32095";

const article = {
  site: "Chowhound"
};

rp(url)
  .then(function(html) {
    article.title = $(".fr_r_info h1", html).text();
    // article.author = $(".Post__author", html).text();
    article.ingredients = $(".freyja_box freyja_box81 > li", html)
      .text()
      .trim()
      .split(/\s\s+/);
    let info = [];
    article.info = $(".no_sep  frr_serves fr_sep", html).text();
    article.instructions = $(".Recipe__instructions > li", html)
      .text()
      .trim()
      .split(/\s\s+/);
    let nutr = $(".nutrition-summary-facts", html)
      .text()
      .trim()
      .replace(/\s\s/g, " ")
      .split(/;\s+|.?\s\s+/);
    article.nutrition = nutr.slice(1, nutr.length - 1);
    article.imageUrl = $(".Figure__image img", html).attr("src");
    console.log("article: ", article);
  })
  .catch(function(err) {
    console.log(err);
  });
