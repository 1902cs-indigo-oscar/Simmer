import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSingleArticle } from "../store";

class Article extends Component {
  componentDidMount() {
    this.props.loadSingleArticle(this.props.match.params.id);
  }

  render() {
    const { article } = this.props;
    return (
      <div className="all-articles-container has-text-centered">
        <div>
          <h1 className="title is-2">{article.title}</h1>
          <h6 className="title is-5">{article.author}</h6>
          <a href={article.url} className="title is-4 has-text-link is-italic">
            {article.site}
          </a>
          <br />
          <img src={article.imageUrl} alt={article.title} />
          <br />
          <div className="ingredients">
            <h2 className="title-is-3">
              <u>INGREDIENTS:</u>
            </h2>
            <ul>
              {article.ingredients &&
                article.ingredients.map((ingredient, index) => (
                  <li key={index}>{">"} {ingredient} {"<"}</li>
                ))}
            </ul>
          </div>
          <br />
          <div className="instructions">
            <h2 className="title-is-3">
              <u>INSTRUCTIONS:</u>
            </h2>
            <ul>
              {article.instructions &&
                article.instructions.map((instruction, index) => (
                  <li key={index}>
                    {index + 1}. {instruction}
                    <br />
                    <br />
                  </li>
                ))}
            </ul>
          </div>
          <br />
          <hr />
          <div className="columns">
            <div className="column is-half">
              <div className="tags-list">
                <h2 className="title-is-3">
                  <u>TAGS:</u>
                </h2>
                <ul>
                  {article.tags &&
                    article.tags.map((tag, index) => (
                      <li key={index} className="is-size-7">
                        {tag}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
            <div className="column is-half">
              <div className="misc">
                <h2 className="title-is-3">
                  <u>MISCELLANEOUS:</u>
                </h2>
                <ul>
                  {article.misc &&
                    article.misc.map((item, index) => (
                      <li key={index} className="is-size-7">
                        {item}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <style jsx="">{`
          .all-articles-container {
            margin: 3em;
          }
          img {
            width: 300px;
          }
          @media only screen and (min-width: 600px) {
            .instructions {
              margin: 0 3em;
            }
          }
        `}</style>
      </div>
    );
  }
}

const mapState = state => ({
  article: state.article.single
});

const mapDispatch = dispatch => ({
  loadSingleArticle: id => {
    dispatch(fetchSingleArticle(id));
  }
});

export default connect(
  mapState,
  mapDispatch
)(Article);
