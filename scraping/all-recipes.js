const rp = require("request-promise");
const $ = require("cheerio");
const url =
  "https://www.allrecipes.com/recipe/272457/bacon-ranch-chicken-enchiladas/?internalSource=rotd&referringContentType=Homepage&clickId=cardslot%201";

const article = {
  site: "Allrecipes.com"
};

rp(url)
  .then(function(html) {
    //success!
    article.title = $(".recipe-summary__h1", html).text();
    article.author = $(".submitter__name", html).text();
    article.ingredients = $(".checkList__line", html)
      .text()
      .trim()
      .split(/\s\s+/);
    let prepNums = $(".prepTime__item > time", html)
      .text()
      .trim()
      .split(/\sm/);
    article.prepTime = prepNums[0];
    article.cookTime = prepNums[1];
    article.ReadyIn = prepNums[2];
    article.instructions = $(".recipe-directions__list > li", html)
      .text()
      .trim()
      .split(/\s\s+/);
    let nutr = $(".nutrition-summary-facts", html)
      .text()
      .trim()
      .replace(/\s\s/g, " ")
      .split(/;\s+|\s\s\s+/);
    article.nutrition = nutr.slice(1, nutr.length - 1);
    article.imageUrl = $(".rec-photo", html).attr("src");
    console.log("article: ", article);
  })
  .catch(function(err) {
    //handle error
  });
