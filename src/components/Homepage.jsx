import React, { Component } from "react";
import { connect } from "react-redux";
import { createNewArticle, fetchAllArticles, clearArticles, removeArticleFromUser } from "../store";
import {ArticleList} from './ArticleList'

class Homepage extends Component {
  componentDidMount() {
    this.props.loadAllArticles();
  }

  componentWillUnmount() {
    this.props.clearLoadedArticles();
  }

  render() {
    const { articles, createNewArticle, removeBookmark, user, history } = this.props;
    return (
      <div className="all-articles-container has-text-centered">
        <div>
          <h1 className="title is-2">{user.firstName}'s Articles</h1>
          {articles.length ? (
            <ArticleList articles={articles} history={history} removeBookmark={removeBookmark}/>
          ) : (
            <p className="has-text-danger">
              It looks like you don't have any recipes saved.
              <br />
              Start bookmarking some pages!
            </p>
          )}
          <br />
          <form action="submit" name="article" onSubmit={createNewArticle}>
            <input type="text" name="article" />
            <button type="submit">Add Article</button>
          </form>
        </div>
        <style jsx="">{`
          * {
            font-family: "Aclonica", sans-serif;
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
  user: state.user
});

const mapDispatch = dispatch => ({
  createNewArticle: evt => {
    evt.preventDefault();
    const url = evt.target.article.value;
    dispatch(createNewArticle(url));
    evt.target.article.value = "";
  },
  loadAllArticles: () => {
    dispatch(fetchAllArticles());
  },
  clearLoadedArticles: () => dispatch(clearArticles()),
  removeBookmark: article => dispatch(removeArticleFromUser(article))
});

export default connect(
  mapState,
  mapDispatch
)(Homepage);
