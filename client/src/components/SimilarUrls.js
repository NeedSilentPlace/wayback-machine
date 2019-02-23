import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import './styles/SimilarUrls.css';

class SimilarUrls extends Component {
  render() {
    return (
      <Fragment>
        <div className='message'>Is this what you looking for?</div>
        {this.props.urls.map((url, index) => {
          return (
            <div key={index} className='similarList'>
              <Link to={`${url}`}>
                {url}
              </Link>
            </div>
          );
        })}
        <Link to='/request/result' className='currentUrl' onClick={ev => this.props.onClickUrl(this.props.currentUrl)}>
          {`Click if you want to store this ${this.props.currentUrl} page`}
        </Link>
      </Fragment>
    );
  }
}

export default SimilarUrls;
