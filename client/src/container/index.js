import { LOADING } from '../actions/types';
import { showCalendar, showSimilarUrls, getArchive, postArchive } from '../actions/index';
import { connect } from 'react-redux';
import App from '../components/App';

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    checkArchive(url) {
      dispatch({ type: LOADING });

      fetch(`http://localhost:5000/archive/${url}`)
        .then(res => res.json())
        .then(res => {
          if(res.dates) {
            dispatch(showCalendar(res));
          } else {
            dispatch(showSimilarUrls(res));
          }
        });
    },
    getArchive(url, date) {
      dispatch({ type: LOADING });

      fetch(`http://localhost:5000/archive/${url}/${date}`)
        .then(res => res.json())
        .then(res => {
          dispatch(getArchive(res));
        });
    },
    archiveFirstTime(url) {
      dispatch({ type: LOADING });

      fetch('http://localhost:5000/archive/first', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      })
      .then(res => res.json())
      .then(res => {
        dispatch(postArchive(res));
      });
    },
    archiveNotFirstTime(url) {
      dispatch({ type: LOADING });

      fetch('http://localhost:5000/archive', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      })
      .then(res => res.json())
      .then(res => {
        dispatch(postArchive(res));
      });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
