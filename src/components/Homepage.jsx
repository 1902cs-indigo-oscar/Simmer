import React, { Component } from "react";
import { connect } from "react-redux";
import { createNewArticle, fetchAllArticles } from "../store";

class Homepage extends Component {
  componentDidMount(){
    this.props.loadAllArticles()
  }

  render() {
    const { articles, createNewArticle } = this.props;
    return (
      <div>
        {articles.map(article => (
          <p key={article.id}>{article.title}</p>
        ))}
        <form
          action="submit"
          name="article"
          onSubmit={createNewArticle}
        >
          <input type="text" name="article" />
          <button type="submit">Add Article</button>
        </form>
      </div>
    );
  }
}

const mapState = state => ({
  articles: state.article.all
});

const mapDispatch = dispatch => ({
  createNewArticle: evt => {
    const url = evt.target.article.value;
    dispatch(createNewArticle(url));
  },
  loadAllArticles: () => {
    dispatch(fetchAllArticles())
  }
});

export default connect(
  mapState,
  mapDispatch
)(Homepage);
