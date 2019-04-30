const rp = require("request-promise");
const $ = require("cheerio");
const url =
  "https://www.foodnetwork.com/recipes/food-network-kitchen/pasta-primavera-with-peas-asparagus-and-kale-3363538";

const article = {
  site: "Food Network"
};

rp(url)
  .then(function(html) {
    //success!
    article.title = $(".o-AssetTitle__a-HeadlineText", html).text();
    article.author = $(".o-Attribution__a-Name > a", html).text();
    article.ingredients = $(".o-Ingredients__m-Body", html)
      .text()
      .trim()
      .split(/\s\s+/);
    article.times = $(".o-RecipeInfo", html)
      .text()
      .split(/\s\n+/)
      .map(data => data.trim())
      .filter(data => data.length > 0)
      .map(data => data.replace(/\n\s+/, " "));
    article.instructions = $(".o-Method__m-Step", html)
      .text()
      .trim()
      .split(/\s\s+/);
    // let nutr = $(".nutrition-summary-facts", html)
    //   .text()
    //   .trim()
    //   .replace(/\s\s/g, " ")
    //   .split(/;\s+|.?\s\s+/);
    // article.nutrition = nutr.slice(1, nutr.length - 1);
    article.imageUrl = $(".m-MediaBlock__m-MediaWrap > img", html).attr("src");
    console.log("article: ", article);
  })
  .catch(function(err) {
    //handle error
  });
