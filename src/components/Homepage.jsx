import React, { Component } from "react";
import { connect } from "react-redux";
import { createNewArticle, fetchAllArticles } from "../store";

class Homepage extends Component {
  componentDidMount() {
    this.props.loadAllArticles();
  }

  render() {
    const { articles, createNewArticle, user } = this.props;
    return (
      <div className="all-articles-container has-text-centered">
        <div>
          <h1 className="title is-2">{user.firstName}'s Articles</h1>
          <div className="columns is-centered is-multiline">
            {articles.map(article => (
              <div key={article.id} className="column is-one-third">
                <div className="card">
                  <header className="card-header">
                    <p className="card-header-title is-centered">
                      {article.title}
                    </p>
                  </header>
                  <div className="card-content">
                    <div className="content">
                      <figure className="image is-4by3">
                      <img src={article.imageUrl} alt={article.title} />
                      </figure>
                      <div className="is-4">
                        {article.site}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
    const url = evt.target.article.value;
    dispatch(createNewArticle(url));
  },
  loadAllArticles: () => {
    dispatch(fetchAllArticles());
  }
});

export default connect(
  mapState,
  mapDispatch
)(Homepage);
