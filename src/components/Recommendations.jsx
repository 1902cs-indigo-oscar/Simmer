import React, { Component } from "react";
import { connect } from "react-redux";
import {
  createNewArticle,
  fetchAllArticles,
  clearArticles,
  addArticleToUser,
  removeArticleFromUser,
  getRecommendations
} from "../store";
import { ArticleList } from "./ArticleList";

class Recommendations extends Component {
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
        <div>
          <h1 className="title is-2">We think you might like the following recipes:</h1>
          {articles && articles.length ? (
            <ArticleList
              articles={articles}
              history={history}
              bookmarkArticle={bookmarkArticle}
              removeBookmark={removeBookmark}
            />
          ) : (
            <p className="has-text-danger">
              Sorry, we're having some trouble finding you recommendations.
              <br />
              Bookmark some recipes so we can help find you more!
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
  loadAllArticles: () => {
    dispatch(getRecommendations());
  },
  clearLoadedArticles: () => dispatch(clearArticles()),
  bookmarkArticle: url => dispatch(addArticleToUser(url)),
  removeBookmark: article => dispatch(removeArticleFromUser(article))
});

export default connect(
  mapState,
  mapDispatch
)(Recommendations);
