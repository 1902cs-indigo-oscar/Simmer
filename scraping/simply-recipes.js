const rp = require("request-promise");
const $ = require("cheerio");
const url = "https://www.simplyrecipes.com/recipes/chicken_piccata_pasta/";

const article = {
  site: "Simply Recipes"
};

rp(url)
  .then(function(html) {
    article.title = $(".entry-title", html).text();
    article.author = $(".author", html)
      .text()
      .trim();
    article.ingredients = $(".recipe-ingredients ul", html)
      .text()
      .trim()
      .split(/\n/)
      .filter(ingred => ingred.length > 0);
    let times = $(".recipe-meta ul", html)
      .each(function() {
        $("li", this).append("**");
      })
      .text()
      .trim()
      .split("**");
    article.times = times.slice(0, times.length - 1);
    article.instructions = $("#sr-recipe-method > div", html)
      .text()
      .trim()
      .split(/\n+/)
      .map(step => {
        if (parseInt(step[0]) > 0) {
          return step.slice(2);
        } else {
          return step;
        }
      });
    article.imageUrl = $(".featured-image > img", html).attr("src");
    console.log("article: ", article);
  })
  .catch(function(err) {
    console.log(err);
  });
