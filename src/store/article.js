import axios from 'axios';

const GET_ALL_ARTICLES = 'GET_ALL_ARTICLES';
const GET_SINGLE_ARTICLE = 'GET_SINGLE_ARTICLE';

const initialState = {
  all: [],
  single: {},
};

const getAllArticles = articles => ({ type: GET_ALL_ARTICLES, articles });
const getSingleArticle = article => ({ type: GET_SINGLE_ARTICLE, article });

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
    const { data } = await axios.post('/api/articles/', {url});
    dispatch(getSingleArticle(data));
  } catch (err) {
    console.error(err);
  }
};

export const fetchArticlesByIngredient = text => async dispatch => {
  try {
    const {data} = await axios.get(`/api/articles/ingredients/${text}`)
    dispatch(getSingleArticle(data))
  } catch (err) {
    console.log(err)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_ARTICLES:
      return { ...state, all: action.articles };
    case GET_SINGLE_ARTICLE:
      return { ...state, single: action.article };
    default:
      return state;
  }
}
