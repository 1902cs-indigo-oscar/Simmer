# Simmer

Simmer is a PWA that allows users to bookmark recipes they find on different cooking sites. A Chrome extension is used to access various cooking sites and, upon saving a page, it is reflected in the user's Simmer list of recipes. Users can also search recipes through Simmer that have been bookmarked by others, as well as get recommendations based off of other users with similar tastes. Being a PWA, Simmer users are able to read their articles even when offline.

# Installation

First, fork the repo on Github here: https://github.com/1902cs-indigo-oscar/Simmer

Then clone the repo to your computer:

```bash
git clone https://github.com/1902cs-indigo-oscar/Simmer
```

Simmer is set up to use a Postgres database on the backend. Make sure you have postgres installed, and then run the following commands to create the database (and a test database should you want to make tests):

```bash
createdb simmer

createdb simmer-test
```

Install all of the dependencies:

```bash
npm install
```

Run in development mode (The frontend is set up on localhost:3000, while the server will run on localhost:3001):

```bash
npm run start-dev
```

# Usage

### Login

First, a user will need to either login or signup upon loading the site. This is to preserve their bookmarks in the database.

## Bookmarking

In order to get the most out of Simmer, users will want to bookmark recipes. Simmer currently supports recipes from the following five sites: [All Recipes](https://www.allrecipes.com/), [Chowhound](https://www.chowhound.com/), [Epicurious](https://www.epicurious.com/), [Food Network](https://www.foodnetwork.com/), and [Simply Recipes](https://www.simplyrecipes.com/).

There are two ways users can bookmark recipes they find:

The first method is to enter the URL into the input field on the Homepage.

The second method is to use the Simmer [Chrome extension](https://chrome.google.com/webstore/detail/simmer/gkmhaemjffpnaecgoknkkoofcboagojl?hl=en). Once the extension has been downloaded, they can login and the extension should sync up with their account. When on a supported site, the user can click the "Save" button in the extension.

Once a recipe has been bookmarked, users can see all their recipes on the homepage.

## Search

Users can also find recipes that have already been bookmarked by other users. For the search option, users can type in a word and Simmer will return all the recipes it can find that match the query. The program checks recipe titles, ingredients, and any tags present from the original site.

## Recommendations

Another way users can find more articles is through the recommendations option. This will provide all articles Simmer believes the user might also like, based on their current bookmarks (a more detailed description of how it does this is in the Features section).

# Features

## Web Scraping

Simmer uses web scraping in order to pull the desired information from the bookmarked site and save that information to the database. The two tools utilized for this are Request-Promise and Cheerio. Request-Promise is used to retrieve the HTML data from the input URL, which is then passed in as the argument for a function that uses Cheerio. Cheerio implements jQuery in order to select DOM elements from the input HTML. Obviously each website is going to have a different layout for their recipe page... hence why at the moment there are only five supported cooking sites.

## Finding/Creating Recipes in the Database

There are three models being used in the backend: User, Article, and Ingredients. There is a Many-To-Many relationship between Users and Articles, and One-To-Many between one Article and Ingredients. The reason ingredients is its own table, rather than a Sequelize Array for Article, is to handle the search function, described later.

In the backend, the route for adding a recipe (POST to /api/article) first checks if this article already exists in the database. If so, it will simply make an association between the recipe and user. Otherwise, it will create both a new article and ingredients based on the scraped data.

## Search

The search function is performed through an API route utilizing two separate Sequelize queries. The first checks all ingredients in the database and returns all that include a substring of the input text (using the "Op.iLike" operator to find case insensitive), in addition to the associated article. The second check looks through all articles and returns those that include the substring in either the title or tags array. The first list is mapped over to just include the article, and then the second list is concatenated with the first for a complete list of matching articles. Finally, a hash table and map is used to filter out any duplicate entries.

## Recommendations

The recommendations API route is set up with three steps for querying:

1. Find all of the current user's articles. The IDs for these are then stored in an array.
2. Find all users who are "linked" to the current user: they must have at least one bookmarked article in common. These user ID's are again stored in another array for the next step.
3. Find all articles where at least one of the "linked" users is associated.

After the third query, a final output array is made by filtering out any articles that were present in the first array of articles - we don't want to include the recipes already bookmarked by the current user.

