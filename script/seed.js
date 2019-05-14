const db = require("../server/db");
const { User, Article, Ingredient } = require("../server/db/models");
const scraperObj = require("../server/scraping");
const Promise = require("bluebird");

const recipesList = [
  "https://www.simplyrecipes.com/recipes/dairy_free_vegan_biscuits/",
  "https://www.simplyrecipes.com/recipes/shrimp_pasta_salad/",
  "https://www.simplyrecipes.com/recipes/easy_mango_lime_sorbet/",
  "https://www.simplyrecipes.com/recipes/homemade_vanilla_cake/",
  "https://www.simplyrecipes.com/recipes/easy_vanilla_buttercream_frosting/",
  "https://www.simplyrecipes.com/recipes/how_to_cook_asparagus_sous_vide/",
  "https://www.simplyrecipes.com/recipes/soft_and_chewy_lemon_cookies/",
  "https://www.simplyrecipes.com/recipes/slow_cooker_french_toast_casserole/",
  "https://www.simplyrecipes.com/recipes/spicy_garlic_shrimp_with_coconut_rice/",
  "https://www.simplyrecipes.com/recipes/steak_diane/",
  "https://www.simplyrecipes.com/recipes/beef_and_broccoli_ramen_stir_fry/",
  "https://www.simplyrecipes.com/recipes/creamy_chai_spiced_vegan_rice_pudding/",
  "https://www.simplyrecipes.com/recipes/yeasted_belgian_waffles/",
  "https://www.simplyrecipes.com/recipes/swiss_steak/",
  "https://www.simplyrecipes.com/recipes/creamy_blue_cheese_dressing/",
  "https://www.simplyrecipes.com/recipes/pimento_cheese/",
  "https://www.simplyrecipes.com/recipes/chicken_piccata_pasta/",
  "https://www.simplyrecipes.com/recipes/nachos/",
  "https://www.simplyrecipes.com/recipes/bacon_and_blue_cheese_guacamole/",
  "https://www.simplyrecipes.com/recipes/cheesy_tortellini_casserole/",
  "https://www.allrecipes.com/recipe/229369/baked-eggplant-parmesan/",
  "https://www.allrecipes.com/recipe/106030/kofta-kebabs/",
  "https://www.allrecipes.com/recipe/69751/shuk-shuka/",
  "https://www.allrecipes.com/recipe/64519/kafta-bbq/",
  "https://www.allrecipes.com/recipe/150251/shish-tawook-grilled-chicken/",
  "https://www.allrecipes.com/recipe/153790/algerian-kefta-meatballs/",
  "https://www.allrecipes.com/recipe/241705/chef-johns-falafel/",
  "https://www.allrecipes.com/recipe/272547/creamy-garlic-and-mushroom-chicken-thighs/",
  "https://www.allrecipes.com/recipe/259983/pakistani-chapli-kebab/",
  "https://www.allrecipes.com/recipe/150812/butter-lamb-gravy/",
  "https://www.allrecipes.com/recipe/70424/moroccan-tagine/",
  "https://www.allrecipes.com/recipe/14504/california-grilled-veggie-sandwich/",
  "https://www.allrecipes.com/recipe/14859/baba-ghanoush/",
  "https://www.allrecipes.com/recipe/16036/sweet-potato-latkes/",
  "https://www.allrecipes.com/recipe/16040/sambousa/",
  "https://www.allrecipes.com/recipe/16084/pakistani-spicy-chickpeas/",
  "https://www.allrecipes.com/recipe/16731/cottage-cheese-chicken-enchiladas/",
  "https://www.allrecipes.com/recipe/17596/fava-bean-breakfast-spread/",
  "https://www.allrecipes.com/recipe/238662/slow-cooker-jambalaya-vegan/",
  "https://www.foodnetwork.com/recipes/giada-de-laurentiis/baked-penne-with-roasted-vegetables-recipe-1916906",
  "https://www.foodnetwork.com/recipes/valerie-bertinelli/spicy-arrabiata-penne-3106836",
  "https://www.foodnetwork.com/recipes/giada-de-laurentiis/penne-with-sun-dried-tomato-pesto-recipe-1942250",
  "https://www.foodnetwork.com/recipes/food-network-kitchen/grilled-steak-with-greek-corn-salad-3562019",
  "https://www.foodnetwork.com/recipes/ree-drummond/rib-eye-steaks-with-cowboy-butter-2312425",
  "https://www.foodnetwork.com/recipes/aida-mollenkamp/fish-tacos-recipe-1944281",
  "https://www.foodnetwork.com/recipes/food-network-kitchen/tortellini-in-brodo-3622606",
  "https://www.foodnetwork.com/recipes/food-network-kitchen/30-minute-cod-with-lemony-braised-fennel-3362795",
  "https://www.foodnetwork.com/recipes/rachael-ray/pork-chops-pizzaiola-recipe-1948457",
  "https://www.foodnetwork.com/recipes/giada-de-laurentiis/escarole-and-bean-soup-recipe-1914906",
  "https://www.foodnetwork.com/recipes/food-network-kitchen/shrimp-and-kale-pitas-3362488",
  "https://www.foodnetwork.com/recipes/food-network-kitchen/5-ingredient-instant-pot-mac-and-cheese-3649854",
  "https://www.foodnetwork.com/recipes/rachael-ray/barbecued-chinese-chicken-lettuce-wraps-recipe-1915308",
  "https://www.foodnetwork.com/recipes/food-network-kitchen/chicken-summer-rolls-recipe-2117644",
  "https://www.foodnetwork.com/recipes/tyler-florence/chicken-stir-fry-recipe-1906578",
  "https://www.foodnetwork.com/recipes/patrick-and-gina-neely/ginas-shrimp-scampi-with-angel-hair-pasta-recipe-1919860",
  "https://www.foodnetwork.com/recipes/food-network-kitchen/chicken-watermelon-tacos-3364575",
  "https://www.foodnetwork.com/recipes/rachael-ray/roasted-meatballs-with-garlic-bread-5639470",
  "https://www.foodnetwork.com/recipes/ina-garten/roasted-italian-meatballs-3500767",
  "https://www.foodnetwork.com/recipes/ree-drummond/meat-pies-3591684",
  "https://www.foodnetwork.com/recipes/ina-garten/meat-loaf-recipe-1921718",
  "https://www.chowhound.com/recipes/pesto-and-pea-lasagna-30278",
  "https://www.chowhound.com/recipes/creamy-beet-linguine-walnuts-feta-32095",
  "https://www.chowhound.com/recipes/scones-raspberry-preserves-clotted-cream-32056",
  "https://www.chowhound.com/recipes/shrimp-and-pickle-relish-deviled-eggs-32054",
  "https://www.chowhound.com/recipes/basic-popcorn-balls-27804",
  "https://www.chowhound.com/recipes/black-lentils-red-kidney-beans-32119",
  "https://www.chowhound.com/recipes/toasted-coconut-sweet-potato-pie-32103",
  "https://www.chowhound.com/recipes/spicy-chocolate-chip-hazelnut-cookies-32112",
  "https://www.chowhound.com/recipes/butterscotch-potato-chip-cookies-32113",
  "https://www.chowhound.com/recipes/cornflake-macaroons-chocolate-drizzle-32114",
  "https://www.chowhound.com/recipes/shrimp-po-boy-sandwich-32111",
  "https://www.chowhound.com/recipes/mushroom-puff-pastry-green-bean-casserole-32108",
  "https://www.chowhound.com/recipes/chai-spiced-pumpkin-slab-pie-32107",
  "https://www.chowhound.com/recipes/chili-garlic-green-bean-casserole-32110",
  "https://www.chowhound.com/recipes/old-bay-green-bean-casserole-with-crab-32109",
  "https://www.chowhound.com/recipes/sage-pumpkin-poppers-chorizo-goat-cheese-32097",
  "https://www.chowhound.com/recipes/cod-brandade-fritters-tomato-confit-fried-sage-32100",
  "https://www.chowhound.com/recipes/seeded-apple-bread-honey-thyme-32096",
  "https://www.chowhound.com/recipes/freekeh-pilaf-spiced-roasted-butternut-squash-shallots-32099",
  "https://www.chowhound.com/recipes/lambic-marshmallows-chocolate-stout-fondue-32117",
  "https://www.epicurious.com/recipes/food/views/deconstructed-falafel-salad",
  "https://www.epicurious.com/recipes/food/views/strawberry-smoothie",
  "https://www.epicurious.com/recipes/food/views/chocolatey-chocolate-cake",
  "https://www.epicurious.com/recipes/food/views/spiced-quinoa-and-chickpea-bites",
  "https://www.epicurious.com/recipes/food/views/herb-infused-lemon-strawberry-loaf",
  "https://www.epicurious.com/recipes/food/views/east-62nd-street-lemon-cake",
  "https://www.epicurious.com/recipes/food/views/buttermilk-waffles",
  "https://www.epicurious.com/recipes/food/views/spiced-lamb-wraps-with-ramp-raita",
  "https://www.epicurious.com/recipes/food/views/carrot-curry",
  "https://www.epicurious.com/recipes/food/views/crunchy-gluten-free-chicken-tenders",
  "https://www.epicurious.com/recipes/food/views/crawfish-salad",
  "https://www.epicurious.com/recipes/food/views/potatoes-roasted-poblano-chiles-mexican-sour-cream-papas-con-rajas-y-crema-acida",
  "https://www.epicurious.com/recipes/food/views/big-batch-pancake-and-waffle-mix",
  "https://www.epicurious.com/recipes/food/views/spinach-and-artichoke-melts",
  "https://www.epicurious.com/recipes/food/views/za-atar-chicken-with-garlicky-yogurt",
  "https://www.epicurious.com/recipes/food/views/roast-chicken-thighs-with-peas-and-mint",
  "https://www.epicurious.com/recipes/food/views/cold-soba-noodles-with-jammy-eggs-and-peas",
  "https://www.epicurious.com/recipes/food/views/crispy-fried-shallots",
  "https://www.epicurious.com/recipes/food/views/chile-and-citrus-rubbed-chicken-with-potatoes",
  "https://www.epicurious.com/recipes/food/views/chicken-saltimbocca-with-crunchy-pea-salad"
];

async function seed() {
  try {
    await db.sync({ force: true });
    const users = await User.bulkCreate(
      [
        {
          firstName: "Bob",
          lastName: "Builder",
          email: "bb@builder.com",
          password: "123"
        },
        {
          firstName: "Joe",
          lastName: "Shmoe",
          email: "js@gmail.com",
          password: "123"
        },
        {
          firstName: "Cody",
          lastName: "Ruff",
          email: "cody@gmail.com",
          password: "123"
        },
        {
          firstName: "Jane",
          lastName: "Doe",
          email: "jane@gmail.com",
          password: "123"
        },
        {
          firstName: "John",
          lastName: "Doe",
          email: "john@gmail.com",
          password: "123"
        }
      ],
      { returning: true }
    );

    await Promise.map(recipesList, recipe => {
      try {
        let urlTail = recipe.split("www.")[1];
        const urlBase = urlTail.split(".com")[0];
        return scraperObj[urlBase](recipe);
      } catch (err) {
        console.log("error with scraping sites: ", err);
      }
    })
      .then(recipeArr => {
        return Promise.map(recipeArr, async recipe => {
          let createdArticle = await Article.create(recipe);
          await recipe.ingredients.map(async ingredient => {
            const newIngred = await Ingredient.create({ text: ingredient });
            await createdArticle.addIngredient(newIngred);
          });
          await createdArticle.addUser(users[recipeArr.indexOf(recipe) % 5]);
          return createdArticle;
        });
      })
      .then(() => console.log("db synced!"))
      .catch(err => console.log("error with seeding recipes to db: ", err));
  } catch (err) {
    console.log(err);
  }
}

async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

if (module === require.main) {
  runSeed();
}
