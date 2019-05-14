import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  clearArticles,
  addArticleToUser,
  removeArticleFromUser,
  getRecommendations,
  loadingArticle,
  changeOpacity
} from '../store';
import { ArticleList } from './ArticleList';

class Recommendations extends Component {
  componentDidMount() {
    this.props.loadingArticleMessage();
    this.props.loadAllArticles();
  }

  componentWillUnmount() {
    this.props.clearLoadedArticles();
  }

  render() {
    const { articles, bookmarkArticle, removeBookmark, history, messageText, opacity } = this.props;
    return (
      <div className="all-articles-container has-text-centered">
        <div id="error-message" className="columns is-centered">
          <div className="column is-two-fifths">
            <div className="box is-small has-text-centered has-background-info">
              <p>{messageText}</p>
            </div>
          </div>
        </div>
        <div>
          <h1 className="title is-size-2-desktop">
            We think you might like the following recipes:
          </h1>
          {articles && articles.length ? (
            <ArticleList
              articles={articles}
              history={history}
              bookmarkArticle={bookmarkArticle}
              removeBookmark={removeBookmark}
            />
          ) : (
            <p className="has-text-danger is-size-4-desktop">
              Sorry, we're having some trouble finding you recommendations.
              <br />
              Bookmark some recipes so we can help find you more!
            </p>
          )}
          <br />
        </div>
        <style jsx="">{`
          .all-articles-container {
            margin: 3em;
          }
          img {
            object-fit: cover;
          }
          .box {
            opacity: ${opacity};
            transition: 0.5s all;
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
  opacity: state.message.opacity,
});

const mapDispatch = dispatch => ({
  loadAllArticles: () => {
    dispatch(getRecommendations());
  },
  loadingArticleMessage: () => {
    dispatch(loadingArticle());
    setTimeout(() => {
      dispatch(changeOpacity());
    }, 1000);
  },
  clearLoadedArticles: () => dispatch(clearArticles()),
  bookmarkArticle: url => dispatch(addArticleToUser(url)),
  removeBookmark: article => dispatch(removeArticleFromUser(article)),
});

export default connect(
  mapState,
  mapDispatch
)(Recommendations);
