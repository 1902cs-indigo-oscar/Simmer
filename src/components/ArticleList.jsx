import React from "react";

export const ArticleList = ({ articles, history }) => {
  return (
    <div className="columns is-centered is-multiline">
      {articles.map(article => (
        <div key={article.id} className="column is-one-third">
          <div
            className="card"
            onClick={() => history.push(`/articles/${article.id}`)}
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
  );
};
