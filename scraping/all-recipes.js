const rp = require("request-promise");
const $ = require("cheerio");
const url =
  "https://www.allrecipes.com/recipe/213656/amazing-crusted-chicken/?clickId=right%20rail0&internalSource=rr_feed_recipe_sb&referringId=272457%20referringContentType%3Drecipe";

const article = {
  site: "Allrecipes.com"
};

rp(url)
  .then(function(html) {
    article.title = $(".recipe-summary__h1", html).text();
    article.author = $(".submitter__name", html).text();
    article.ingredients = $(".checkList__line", html)
      .text()
      .trim()
      .split(/\s\s+/);
    article.times = $('.prepTime__item', html).text().trim().split(/\n\s\s+/)
    article.instructions = $(".recipe-directions__list > li", html)
      .text()
      .trim()
      .split(/\s\s+/);
    let nutr = $(".nutrition-summary-facts", html)
      .text()
      .trim()
      .replace(/\s\s/g, " ")
      .split(/;\s+|.?\s\s+/);
    article.nutrition = nutr.slice(1, nutr.length - 1);
    article.imageUrl = $(".rec-photo", html).attr("src");
    console.log("article: ", article);
  })
  .catch(function(err) {
    console.log(err)
  });
