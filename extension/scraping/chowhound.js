// const url = "https://www.chowhound.com/recipes/shrimp-po-boy-sandwich-32111";

const chowhoundScraper = url => {
  return $.get(url).then(function (html) {
      let article = {
        site: "Chowhound"
      };
      article.url = url
      article.title = $(".fr_r_info h1", html).text();
      article.ingredients = $(".freyja_box ul", html)
        .text()
        .trim()
        .split(/\n+/)
        .filter(ingredient => ingredient.length)
      let info = [];
      info.push($(".frr_serves", html).text());
      info.push($(".frr_difficulty", html).text());
      let times = $(".frr_totaltime", html)
        .text()
        .split(/\n/)
        .map(data => data.trim())
        .filter(data => data.length > 0);
      if (times.length) {
        times.splice(0, 1);
        times.splice(1, 1);
        times[0] = `Total: ${times[0]}`;
        times[1] = `Active: ${times[1]}`;
        info = info.concat(times);
      }
      article.misc = info;
      let instructionsAndAuthor = $(".fr_instruction_rec .frr_wrap", html)
        .text()
        .trim()
        .split(/\s\s+/);
      article.instructions = instructionsAndAuthor
        .slice(0, instructionsAndAuthor.length - 1)
        .map(step => {
          if (parseInt(step[0]) > 0) {
            return step.slice(1);
          } else {
            return step;
          }
        })
        .filter(instruction => instruction.length)
      article.author = $(".by_line span", html).text();
      article.imageUrl = $(".fr_hdimgov img", html).attr("data-src");
      let tags = $(".freyja_fulltags", html)
        .text()
        .split(/\n\s+/);
      article.tags = tags.slice(1, tags.length - 1);
      return article;
    })
}

export default chowhoundScraper;
