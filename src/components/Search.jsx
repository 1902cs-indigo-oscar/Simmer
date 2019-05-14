import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchArticlesByIngredient,
  clearArticles,
  addArticleToUser,
  removeArticleFromUser,
  changeOpacity,
  addBookmark,
  removeBookmark
} from "../store";
import { ArticleList } from "./ArticleList";

class Search extends Component {
  componentWillUnmount() {
    this.props.clearLoadedArticles();
  }

  render() {
    const {
      articles,
      loadArticlesByText,
      bookmarkArticle,
      removeBookmark,
      history,
      messageText,
      opacity
    } = this.props;
    return (
      <div className="all-articles-container has-text-centered">
        <div id="error-message" className="columns is-centered is-mobile">
          <div className="column box is-small has-text-centered has-background-info">
            <p>{messageText}</p>
          </div>
        </div>
        <div>
          <h1 className="title is-size-2-desktop">
            Have an ingredient?
            <br />
            Enter it to find recipes!
          </h1>
          <form
            action="submit"
            name="ingredient"
            onSubmit={evt => loadArticlesByText(evt)}
          >
            <div className="columns is-centered">
              <div className="column is-two-thirds">
                <div className="field">
                  <div className="control has-icons-left">
                    <input
                      className="input"
                      type="text"
                      name="ingredient"
                      placeholder="Enter an ingredient here"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-cheese" />
                    </span>
                  </div>
                </div>
                <button className="button is-success is-medium" type="submit">
                  Find Recipes
                </button>
              </div>
            </div>
          </form>
          <br />
          {articles.length ? (
            <ArticleList
              articles={articles}
              history={history}
              bookmarkArticle={bookmarkArticle}
              removeBookmark={removeBookmark}
            />
          ) : (
            <p className="has-text-danger is-size-4-desktop">
              Enter an ingredient above to find recipes!
            </p>
          )}
        </div>
        <style jsx="">{`
          * {
            font-family: "Aclonica", sans-serif;
          }
          .all-articles-container {
            margin: 3em;
          }
          .box {
            opacity: ${opacity};
            transition: 0.5s all;
            z-index: 2;
            position: fixed;
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
  user: state.user,
  messageText: state.message.text,
  opacity: state.message.opacity
});

const mapDispatch = dispatch => ({
  loadArticlesByText: evt => {
    evt.preventDefault();
    const text = evt.target.ingredient.value;
    dispatch(fetchArticlesByIngredient(text));
    evt.target.ingredient.value = "";
    setTimeout(() => {
      dispatch(changeOpacity());
    }, 1000);
  },
  clearLoadedArticles: () => dispatch(clearArticles()),
  bookmarkArticle: url => {
    dispatch(addArticleToUser(url));
    dispatch(addBookmark());
    setTimeout(() => {
      dispatch(changeOpacity());
    }, 1000);
  },
  removeBookmark: article => {
    dispatch(removeArticleFromUser(article));
    dispatch(removeBookmark());
    setTimeout(() => {
      dispatch(changeOpacity());
    }, 1000);
  }
});

export default connect(
  mapState,
  mapDispatch
)(Search);
