import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchArticlesByIngredient,
  clearArticles,
  addArticleToUser,
  removeArticleFromUser,
} from '../store';
import { ArticleList } from './ArticleList';

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
      history
    } = this.props;
    return (
      <div className="all-articles-container has-text-centered">
        <div>
          <h1 className="title is-2">
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
                <button className="button is-success" type="submit">
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
            <p className="has-text-danger">
              Enter an ingredient above to find recipes!
            </p>
          )}
        </div>
        <style jsx="">{`
          * {
            font-family: 'Aclonica', sans-serif;
          }
          .all-articles-container {
            margin: 3em;
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
});

const mapDispatch = dispatch => ({
  loadArticlesByText: evt => {
    evt.preventDefault();
    const text = evt.target.ingredient.value;
    dispatch(fetchArticlesByIngredient(text));
    evt.target.ingredient.value = '';
  },
  clearLoadedArticles: () => dispatch(clearArticles()),
  bookmarkArticle: url => dispatch(addArticleToUser(url)),
  removeBookmark: article => dispatch(removeArticleFromUser(article)),
});

export default connect(
  mapState,
  mapDispatch
)(Search);
