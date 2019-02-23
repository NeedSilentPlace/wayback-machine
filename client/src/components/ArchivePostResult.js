import React, { Component, Fragment } from 'react';
import Spinner from './Spinner';
import './styles/ArchivePostResult.css';

class ArchivePostResult extends Component {
  render() {
    return (
      <Fragment>
        {this.props.onLoading ? <Spinner /> : null}
        {this.props.message && !this.props.onLoading ? <div className='success'>{this.props.message}</div> : null}
        {this.props.error && !this.props.onLoading ? <div className='fail'>{this.props.error}</div> : null}
      </Fragment>
    );
  }
}

export default ArchivePostResult;
