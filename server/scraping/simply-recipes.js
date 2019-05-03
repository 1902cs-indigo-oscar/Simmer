const rp = require("request-promise");
const $ = require("cheerio");
// const url = "https://www.simplyrecipes.com/recipes/chicken_piccata_pasta/";

const simplyrecipesScraper = url => {
  return rp(url)
    .then(function(html) {
      const article = {
        site: "Simply Recipes"
      };
      article.url = url
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
      article.misc = times.slice(0, times.length - 1);
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
      let tags = $(".primary-terms-container", html)
        .each(function() {
          $("a", this).append("**");
        })
        .text()
        .trim()
        .split("**");
      article.tags = tags.slice(0, tags.length - 1);
      return article;
    })
    .catch(function(err) {
      console.log(err);
    });
};

module.exports = simplyrecipesScraper
