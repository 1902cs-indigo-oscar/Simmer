// const url = "https://www.allrecipes.com/recipe/213656/amazing-crusted-chicken/?clickId=right%20rail0&internalSource=rr_feed_recipe_sb&referringId=272457%20referringContentType%3Drecipe";

const allrecipesScraper = url => {
  return $.get(url).then(function (html) {
    const article = {site: "All Recipes"}
    article.url = url
      article.title = $(".recipe-summary__h1", html).text();
      article.author = $(".submitter__name", html).text();
      article.ingredients = $(".checkList__line", html)
        .text()
        .trim()
        .split(/\s\s+/)
        .filter(ingred => ingred !== "Add all ingredients to list");
      let times = $(".prepTime__item", html)
        .text()
        .trim()
        .split(/\n\s\s+/);
      let nutr = $(".nutrition-summary-facts", html)
        .text()
        .trim()
        .replace(/\s\s/g, " ")
        .split(/;\s+|.?\s\s+/);
      let nutrition = nutr.slice(1, nutr.length - 1);
      article.misc = times.concat(nutrition);
      article.instructions = $(".recipe-directions__list > li", html)
        .text()
        .trim()
        .split(/\s\s+/);
      article.imageUrl = $(".rec-photo", html).attr("src");
      article.tags = $(".breadcrumbs", html)
        .text()
        .trim()
        .split(/\n\s+/)
        .filter(tag => tag !== "Home" && tag !== "Recipes");
      return article;
  })
}

export default allrecipesScraper;
