import axios from 'axios';
import { getError, getSearchError, loadingArticle } from './';

const GET_ALL_ARTICLES = 'GET_ALL_ARTICLES';
const GET_SINGLE_ARTICLE = 'GET_SINGLE_ARTICLE';
const ADD_ARTICLE = 'ADD_ARTICLE';
const REMOVE_ARTICLE = 'REMOVE_ARTICLE';
const ADD_USER_TO_ARTICLE = 'ADD_USER_TO_ARTICLE';
const REMOVE_USER_FROM_ARTICLE = 'REMOVE_USER_FROM_ARTICLE';

const initialState = {
  all: [],
  single: {},
};

const getAllArticles = articles => ({ type: GET_ALL_ARTICLES, articles });
const getSingleArticle = article => ({ type: GET_SINGLE_ARTICLE, article });
const addArticle = article => ({ type: ADD_ARTICLE, article });
const removeArticle = article => ({ type: REMOVE_ARTICLE, article });
const addUserToArticle = article => ({ type: ADD_USER_TO_ARTICLE, article });
const removeUserFromArticle = article => ({
  type: REMOVE_USER_FROM_ARTICLE,
  article,
});

export const fetchAllArticles = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/articles');
    dispatch(getAllArticles(data));
  } catch (err) {
    console.error(err);
  }
};

export const fetchSingleArticle = id => async dispatch => {
  try {
    const articleId = Number(id);
    const { data } = await axios.get(`/api/articles/${articleId}`);
    dispatch(getSingleArticle(data));
  } catch (err) {
    console.error(err);
  }
};

export const createNewArticle = url => async dispatch => {
  try {
    dispatch(loadingArticle());
    const res = await axios.post('/api/articles/', { url });
    dispatch(addArticle(res.data));
  } catch (err) {
    dispatch(getError(err));
    console.error(err);
  }
};

export const addArticleToUser = url => async dispatch => {
  try {
    const { data } = await axios.post('/api/articles/', { url });
    dispatch(addUserToArticle(data));
  } catch (err) {
    console.error(err);
  }
};

export const addArticleToUserSingle = url => async dispatch => {
  try {
    const { data } = await axios.post('/api/articles/', { url });
    dispatch(getSingleArticle(data));
  } catch (err) {
    console.error(err);
  }
};

export const fetchArticlesByIngredient = text => async dispatch => {
  try {
    dispatch(loadingArticle());
    const { data } = await axios.get(`/api/articles/search/${text}`);
    dispatch(getAllArticles(data));
  } catch (err) {
    dispatch(getSearchError(err));
    console.error(err);
  }
};

export const removeArticleFromUser = article => async dispatch => {
  try {
    await axios.delete(`/api/articles/${article.id}`);
    dispatch(removeArticle(article));
  } catch (err) {
    console.error(err);
  }
};

export const removeArticleFromUserSingle = article => async dispatch => {
  try {
    await axios.delete(`/api/articles/${article.id}`);
    dispatch(removeUserFromArticle(article));
  } catch (err) {
    console.error(err);
  }
};

export const getRecommendations = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/articles/recommendations');
    dispatch(getAllArticles(data));
  } catch (err) {
    console.error(err);
  }
};

export const clearArticles = () => dispatch => {
  dispatch(getAllArticles([]));
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_ARTICLES:
      return { ...state, all: action.articles };
    case GET_SINGLE_ARTICLE:
      return { ...state, single: action.article };
    case ADD_ARTICLE:
      return { ...state, all: [...state.all, action.article] };
    case REMOVE_ARTICLE:
      return {
        ...state,
        all: state.all.map(article =>
          article.id === action.article.id ? { ...article, users: [] } : article
        ),
      };
    case REMOVE_USER_FROM_ARTICLE:
      return {
        ...state,
        single: { ...state.single, users: [] },
      };
    case ADD_USER_TO_ARTICLE:
      return {
        ...state,
        all: state.all.map(article =>
          article.id === action.article.id
            ? { ...article, users: [article.users] }
            : article
        ),
      };
    default:
      return state;
  }
}
