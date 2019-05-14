// const url = "https://www.foodnetwork.com/recipes/spring-frittata-recipe-2104680";

const foodnetworkScraper = url => {
  return $.get(url).then(function (html) {
      let article = {
        site: "Food Network"
      };
      article.url = url
      article.title = $(".o-AssetTitle__a-HeadlineText", html).text();
      article.author = $(".o-Attribution__m-Author a", html).text();
      article.ingredients = $(".o-Ingredients__m-Body", html)
        .text()
        .trim()
        .split(/\s\s+/)
        .filter(ingredient => ingredient.length)
      article.misc = $(".o-RecipeInfo", html)
        .text()
        .split(/\s\n+/)
        .map(data => data.trim())
        .filter(data => data.length > 0)
        .map(data => data.replace(/\n\s+/, " "));
      article.instructions = $(".o-Method__m-Step", html)
        .text()
        .trim()
        .split(/\s\s+/)
        .filter(instruction => instruction.length)
      article.imageUrl = $(".m-MediaBlock__m-MediaWrap > img", html).attr(
        "src"
      );
      article.tags = $(".o-Capsule__m-TagList", html)
        .text()
        .trim()
        .split(/\n\s+/);
      return article;
    })
};

export default foodnetworkScraper;
