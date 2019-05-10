const initialState = {
  opacity: 0,
  text: '',
};

const GOT_ERROR = 'GOT_ERROR ';
const SET_OPACITY = 'SET_OPACITY ';
const LOAD_ARTICLE = 'LOAD_ARTICLE';

const gotError = err => ({
  type: GOT_ERROR,
  err,
  opacity: 1,
});

const setOpacity = () => ({
  type: SET_OPACITY,
  opacity: 0,
});

const loadArticle = text => ({
  type: LOAD_ARTICLE,
  text,
  opacity: 1,
})

export const getError = err => dispatch => {
  if (err) {
    dispatch(gotError('Sorry, could not find this page'));
  }
};

export const changeOpacity = () => dispatch => {
  dispatch(setOpacity());
};

export const loadingArticle = () => dispatch => {
  dispatch(loadArticle('Loading...'));
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_ERROR:
      return { ...state, text: action.err, opacity: action.opacity };
    case SET_OPACITY:
      return { ...state, opacity: action.opacity };
    case LOAD_ARTICLE:
      return { ...state, text: action.text, opacity: action.opacity };
    default:
      return state;
  }
}
