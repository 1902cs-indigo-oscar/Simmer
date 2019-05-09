import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchArticlesByIngredient, clearArticles } from "../store";

class Homepage extends Component {
componentWillUnmount(){
  this.props.clearLoadedArticles()
}

  render() {
    const { articles, loadArticlesByText } = this.props;
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
            <input type="text" name="ingredient" />
            <button type="submit">Find By Ingredient</button>
          </form>
          <br />
          {articles.length ? (
            <div className="columns is-centered is-multiline">
              {articles.map(article => (
                <div key={article.id} className="column is-one-third">
                  <div
                    className="card"
                    onClick={() =>
                      this.props.history.push(`/articles/${article.id}`)
                    }
                  >
                    <header className="card-header">
                      <p className="card-header-title is-centered is-size-4">
                        {article.title}
                      </p>
                    </header>
                    <div className="card-content">
                      <div className="content">
                        <figure className="image is-4by3">
                          <img src={article.imageUrl} alt={article.title} />
                        </figure>
                        <p className="is-italic">{article.site}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="has-text-danger">
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
  loadArticlesByText: evt => {
    evt.preventDefault();
    const text = evt.target.ingredient.value;
    dispatch(fetchArticlesByIngredient(text));
    evt.target.ingredient.value = ""
  },
  clearLoadedArticles: () => dispatch(clearArticles())
});

export default connect(
  mapState,
  mapDispatch
)(Homepage);
