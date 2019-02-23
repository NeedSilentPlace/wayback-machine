import React, { Component, Fragment } from 'react';
import Spinner from './Spinner';

class ArchiveVisualizer extends Component {
  componentDidMount() {
    const { url, date } = this.props.match.params;
    this.props.onMount(url, date);
  }
  render() {
    return (
      <Fragment>
        {this.props.onLoading ? <Spinner /> : <iframe title="view" srcDoc={this.props.content} />}
      </Fragment>
    );
  }
}

export default ArchiveVisualizer;
