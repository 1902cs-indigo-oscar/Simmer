import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchSingleArticle,
  addArticleToUserSingle,
  removeArticleFromUserSingle,
  addBookmark,
  removeBookmark,
  changeOpacity
} from "../store";

class Article extends Component {
  componentDidMount() {
    window.scrollTo(0,0)
    this.props.loadSingleArticle(this.props.match.params.id);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.users !== this.props.users) {
      return true;
    } else if (this.props.opacity !== nextProps.opacity) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const {
      article,
      bookmarkArticle,
      removeBookmark,
      messageText,
      opacity
    } = this.props;
    return (
      <div className="all-articles-container has-text-centered">
        <div id="error-message" className="columns is-centered is-mobile">
          <div
            id="message"
            className="column box is-small has-text-centered has-background-info"
          >
            <p>{messageText}</p>
          </div>
        </div>
        <div className="columns is-mobile is-centered">
          <div className="column is-two-thirds">
            {article.users && article.users.length ? (
              <button
                className="button is-danger is-rounded is-medium is-pulled-right"
                onClick={evt => removeBookmark(evt, article)}
              >
                Remove Recipe
              </button>
            ) : (
              <button
                className="button is-info is-rounded is-medium is-pulled-right"
                onClick={evt => bookmarkArticle(evt, article.url)}
              >
                Save Recipe
              </button>
            )}
          </div>
        </div>
        <h1 className="title is-size-2-desktop">{article.title}</h1>
        <h6 className="title is-size-4-desktop">{article.author}</h6>
        <a
          href={article.url}
          className="title is-size-4 has-text-link is-italic"
        >
          {article.site}
        </a>
        <br />
        <br />
        <img src={article.imageUrl} alt={article.title} />
        <br />
        <br />
        <div className="columns is-centered">
          <div className="column is-three-fifths is-mobile">
            <div className="box information ingredients">
              <h2 className="title is-size-4-mobile">
                <u>INGREDIENTS:</u>
              </h2>
              <ul>
                {article.ingredients &&
                  article.ingredients.map((ingredient, index) => (
                    <li key={index}>
                      {">"} {ingredient.text} {"<"}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
        <br />
        <div className="columns">
          <div className="column">
            <div className="box information instructions">
              <h2 className="title is-size-4-mobile">
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
          </div>
        </div>
        <hr />
        <div className="columns">
          <div className="column is-half">
            <div className="box information tags-list">
              <h2 className="title-is-3">
                <u>TAGS:</u>
              </h2>
              <ul>
                {article.tags &&
                  article.tags.map((tag, index) => (
                    <li key={index} className="is-size-6">
                      {tag}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div className="column is-half">
            <div className="box information misc">
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
        <style jsx="">{`
          .all-articles-container {
            margin: 1em;
          }
          .information{
            border: 0.1em solid rgba(0, 0, 0, 0.3);
            box-shadow: 0.1em 0.5em 1em 0.5em rgba(0, 0, 0, 0.2);
          }
          #message {
            opacity: ${opacity};
            transition: 0.5s all;
            z-index: 2;
            position: fixed;
          }
          img {
            width: 300px;
            border: 5px solid;
            border-radius: 15px;
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
  article: state.article.single,
  users: state.article.single.users,
  messageText: state.message.text,
  opacity: state.message.opacity
});

const mapDispatch = dispatch => ({
  loadSingleArticle: id => {
    dispatch(fetchSingleArticle(id));
  },
  bookmarkArticle: (evt, url) => {
    dispatch(addArticleToUserSingle(url));
    dispatch(addBookmark());
    setTimeout(() => {
      dispatch(changeOpacity());
    }, 1000);
  },
  removeBookmark: (evt, article) => {
    dispatch(removeArticleFromUserSingle(article));
    dispatch(removeBookmark());
    setTimeout(() => {
      dispatch(changeOpacity());
    }, 1000);
  }
});

export default connect(
  mapState,
  mapDispatch
)(Article);
