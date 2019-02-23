import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import SimilarUrls from './SimilarUrls';
import Calendar from './Calendar';
import Spinner from './Spinner';

class SearchResult extends Component {
  componentDidMount() {
    const url = this.props.location.pathname.slice(1);
    this.props.onMount(url);
  }
  componentDidUpdate(prevProps) {
    if(this.props.location.pathname !== prevProps.location.pathname) {
      const url = this.props.location.pathname.slice(1);
      this.props.onMount(url);
    }
  }
  render() {
    const { onLoading, dates, similarUrls } = this.props;
    const url = this.props.location.pathname.slice(1);
    
    return (
      <Fragment>
        {onLoading ? <Spinner /> : null}
        {dates.length && !onLoading ? <Calendar mark={dates} title={url} onClickAdd={this.props.onClickArchive} /> : null}
        {!dates.length && similarUrls.length && !onLoading ? <SimilarUrls urls={similarUrls} currentUrl={url} onClickUrl={this.props.onClickArchiveFirstTime} /> : null}
        {!similarUrls.length && !onLoading ? <Link to='/request/result' className='postButton' onClick={ev => this.props.onClickArchiveFirstTime(url)}>No similar URL.. Archive this URL</Link> : null}
      </Fragment>
    );
  }
}

export default SearchResult;
