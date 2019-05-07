const Sequelize = require("sequelize");
const db = require("../db");

const Article = db.define("articles", {
  url: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isUrl: true,
      notEmpty: true
    }
  },
  site: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  author: {
    type: Sequelize.STRING
  },
  ingredients: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false,
  },
  instructions: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: "https://mamadips.com/wp-content/uploads/2016/11/defimage.gif"
  },
  tags: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  misc: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  }
},{
  indexes: [ { unique: true, fields: [ "url" ] } ]
});

module.exports = Article
//Markup to be added at a later date.
