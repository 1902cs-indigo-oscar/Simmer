const initialState = {
  opacity: 0,
  text: '',
};

const GOT_ERROR = 'GOT_ERROR ';
const SET_OPACITY = 'SET_OPACITY ';

const gotError = err => ({
  type: GOT_ERROR,
  err,
  opacity: 1,
});

const setOpacity = () => ({
  type: SET_OPACITY,
  opacity: 0,
});

export const getError = err => dispatch => {
  if (err) {
    dispatch(gotError('Sorry, could not find this page'));
  }
};

export const changeOpacity = () => dispatch => {
  dispatch(setOpacity());
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_ERROR:
      return { ...state, text: action.err, opacity: action.opacity };
    case SET_OPACITY:
      return { ...state, opacity: action.opacity };
    default:
      return state;
  }
}
