import React, { Component } from "react";
import { connect } from "react-redux";
import {
  createNewArticle,
  fetchAllArticles,
  clearArticles,
  addArticleToUser,
  removeArticleFromUser,
  changeOpacity
} from "../store";
import { ArticleList } from "./ArticleList";

class Homepage extends Component {
  componentDidMount() {
    this.props.loadAllArticles();
  }

  componentWillUnmount() {
    this.props.clearLoadedArticles();
  }

  render() {
    const {
      articles,
      createNewArticle,
      bookmarkArticle,
      removeBookmark,
      user,
      history
    } = this.props;
    return (
      <div className="all-articles-container has-text-centered">
        <div className="has-text-centered bookmark-container">
          <p>
            <a href="https://chrome.google.com/webstore/detail/simmer/gkmhaemjffpnaecgoknkkoofcboagojl?hl=en">
              Download the Chrome Extension
            </a>{' '}
            or enter the URL for a recipe here:
          </p>
          <br />
          <form action="submit" name="article" onSubmit={createNewArticle}>
            <div className="columns is-centered">
              <div className="column is-two-thirds">
                <div className="field">
                  <div className="control has-icons-left">
                    <input
                      className="input"
                      type="text"
                      name="article"
                      placeholder="Enter your link here"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-link" />
                    </span>
                  </div>
                </div>
                <button className="button is-success" type="submit">Add Recipe</button>
              </div>
            </div>
          </form>
          <br />
          <p>
            We currently accept recipes from the following sites:
            <br />
            <a href="https://www.allrecipes.com/">All Recipes</a> |{' '}
            <a href="https://www.foodnetwork.com/">Food Network</a> |{' '}
            <a href="https://www.chowhound.com/">ChowHound</a> |{' '}
            <a href="https://www.epicurious.com/">Epicurious</a> |{' '}
            <a href="https://www.simplyrecipes.com/">Simply Recipes</a>
          </p>
        </div>
        <hr />
        <div>
          <h1 className="title is-2">{user.firstName}'s Recipes</h1>
          {articles.length ? (
            <ArticleList
              articles={articles}
              history={history}
              bookmarkArticle={bookmarkArticle}
              removeBookmark={removeBookmark}
            />
          ) : (
            <p className="has-text-danger">
              It looks like you don't have any recipes saved.
              <br />
              Start bookmarking some pages!
            </p>
          )}
          <br />
        </div>
        <style jsx="">{`
          .all-articles-container {
            margin: 1em 3em;
          }
          img {
            object-fit: cover;
          }
        `}</style>
      </div>
    );
  }
}

const mapState = state => ({
  articles: state.article.all,
  user: state.user
});

const mapDispatch = dispatch => ({
  createNewArticle: evt => {
    evt.preventDefault();
    const url = evt.target.article.value;
    dispatch(createNewArticle(url));
    evt.target.article.value = "";
    setTimeout(() => {
      dispatch(changeOpacity());
    }, 2000);
  },
  loadAllArticles: () => {
    dispatch(fetchAllArticles());
  },
  clearLoadedArticles: () => dispatch(clearArticles()),
  bookmarkArticle: url => dispatch(addArticleToUser(url)),
  removeBookmark: article => dispatch(removeArticleFromUser(article))
});

export default connect(
  mapState,
  mapDispatch
)(Homepage);
