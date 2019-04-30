const rp = require("request-promise");
const $ = require("cheerio");
const url =
  "https://www.foodnetwork.com/recipes/food-network-kitchen/pasta-primavera-recipe-1973397";

const article = {
  site: "Food Network"
};

rp(url)
  .then(function(html) {
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
    article.imageUrl = $(".m-MediaBlock__m-MediaWrap > img", html).attr("src");
    console.log("article: ", article);
  })
  .catch(function(err) {
    console.log(err)
    //handle error
  });
