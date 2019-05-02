import React, { Component } from 'react';
import {connect} from 'react-redux';
import {createNewArticle} from '../store';

class Homepage extends Component {
  render() {
    const { articles } = this.props;
    return (
      <div>
        {articles.map(article => <p key={article.id}>{article.title}</p>)}
      </div>
    )
  }
}

const mapState = state => ({
  articles: state.article.all
})

const mapDispatch = dispatch => ({
  createNewArticle: (url) => dispatch(createNewArticle(url))
})

export default connect(mapState, mapDispatch)(Homepage);
