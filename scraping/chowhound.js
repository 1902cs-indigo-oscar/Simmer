const rp = require("request-promise");
const $ = require("cheerio");
const url =
  "https://www.chowhound.com/recipes/creamy-beet-linguine-walnuts-feta-32095";

const article = {
  site: "Chowhound"
};

rp(url)
  .then(function(html) {
    article.title = $(".fr_r_info h1", html).text();
    // article.author = $(".Post__author", html).text();
    article.ingredients = $(".freyja_box ul", html)
      .text()
      .trim()
      .split(/\n+/);
    let info = [];
    info.push($(".frr_serves", html).text());
    info.push($(".frr_difficulty", html).text());
    let times = $(".frr_totaltime", html)
      .text()
      .split(/\n/)
      .map(data => data.trim())
      .filter(data => data.length > 0);
    times.splice(0, 1);
    times.splice(1, 1);
    times[0] = `Total: ${times[0]}`;
    times[1] = `Active: ${times[1]}`;
    info = info.concat(times);
    article.info = info;
    article.instructions = $(".fr_instruction_rec .frr_wrap", html)
      .text()
      .trim()
      .split(/\s\s+/)
    article.imageUrl = $(".fr_hdimgov img", html).attr("data-src");
    console.log("article: ", article);
  })
  .catch(function(err) {
    console.log(err);
  });
