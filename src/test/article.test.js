const Article = require("../../server/db/models/article");
const { foodnetwork } = require("../../server/scraping");
const db = require("../../server/db");

beforeEach(() => db.sync({ force: true }));

describe("Article Model", () => {
  let articleTest;
  beforeAll(async () => {
    const scrapeInfo = await foodnetwork(
      "https://www.foodnetwork.com/recipes/ree-drummond/shrimp-stir-fry-2171534"
    );
    articleTest = await Article.create(scrapeInfo);
  });
  test("Should create article with valid title", () => {
    expect(articleTest.title).toEqual("Shrimp Stir-Fry");
  });
  test("Should create article with valid site", () => {
    expect(articleTest.site).toEqual("Food Network");
  });
  test("Should create article with valid ingredients", () => {
    expect(articleTest.ingredients[0]).toEqual("1 tablespoon butter");
  });
  test("Should create article with valid instructions", () => {
    expect(articleTest.instructions[0]).toEqual(
      "Melt the butter with the olive oil in a large skillet over a medium-high heat. Add the shrimp and garlic, then saute until the shrimp are opaque, about 3 minutes. Remove the shrimp to a plate."
    );
  });
  test("Should create article with valid author", () => {
    expect(articleTest.author).toEqual("Recipe courtesy of Ree Drummond");
  });
  test("Should create article with valid url", () => {
    expect(articleTest.url).toEqual(
      "https://www.foodnetwork.com/recipes/ree-drummond/shrimp-stir-fry-2171534"
    );
  });
});
