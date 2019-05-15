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



## Finding/Creating Recipes in the Database

There are three models being used in the backend: User, Article, and Ingredients. There is a Many-To-Many relationship between Users and Articles, and One-To-Many between one Article and Ingredients. The reason ingredients is its own table, rather than a Sequelize Array for Article, is to handle the search function, described later.

In the backend, the route for adding a recipe (POST to /api/article) first checks if this article already exists in the database. If so, it will simply make an association between the recipe and user. Otherwise, it will create both a new article and ingredients based on the scraped data.

## Search

## Recommendations



