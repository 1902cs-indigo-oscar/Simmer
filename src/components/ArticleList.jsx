import React from "react";

export const ArticleList = ({
  articles,
  history,
  bookmarkArticle,
  removeBookmark
}) => {
  return (
    <div className="columns is-centered is-multiline">
      {articles.map(article => (
        <div key={article.id} className="column is-one-third">
          <div className="card">
            <header className="card-header">
              <p
                className="card-header-title is-centered is-size-4"
                onClick={() => history.push(`/articles/${article.id}`)}
              >
                {article.title}
              </p>
              {article.users && article.users.length ? (
                <button
                  className="button is-danger"
                  onClick={() => removeBookmark(article)}
                >
                  X
                </button>
              ) : (
                <button
                  className="button is-info"
                  onClick={() => bookmarkArticle(article.url)}
                >
                  +
                </button>
              )}
            </header>
            <div
              className="card-content"
              onClick={() => history.push(`/articles/${article.id}`)}
            >
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
      <style jsx="">{`
          .button {
            margin: 1em 0.5em 0 0;
          }
          .card {
            border: 0.1em solid rgba(0, 0, 0, 0.3);
            border-radius: 1em;
            box-shadow: 0.3em 0.5em rgba(0, 0, 0, 0.4);
          }
          img {
            border: 5px solid rgba(0, 0, 0, 0);
            border-radius: 2em;
          }
        `}</style>
    </div>
  );
};
