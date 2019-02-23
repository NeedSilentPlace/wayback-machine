import { POST_ARCHIVE, ARCHIVE_NOT_FOUND, ARCHIVE_FOUND, LOADING, GET_ARCHIVE } from '../actions/types';

const initialState = {
  onLoading: false,
  dates: [],
  message: '',
  error: '',
  html: '',
  similarUrls: []
};

function rootReducer(state = initialState, actions) {
  const newState = JSON.parse(JSON.stringify(state));
  
  switch(actions.type) {
    case LOADING:
      newState.onLoading = true;
      newState.dates = [];
      newState.message = '';

      return newState;
    case ARCHIVE_FOUND:
      newState.onLoading = false;
      newState.message = '';
      newState.dates = actions.dates;

      return newState;
    case ARCHIVE_NOT_FOUND:
      newState.onLoading = false;
      newState.dates = [];
      newState.similarUrls = actions.similarUrls;

      return newState;
    case GET_ARCHIVE:
      newState.onLoading = false;
      newState.html = actions.html;

      return newState;
    case POST_ARCHIVE:
      newState.onLoading = false;
      newState.error = actions.error;
      newState.message = actions.message;

      return newState;
    default:

      return newState;
  }
};

export default rootReducer;
