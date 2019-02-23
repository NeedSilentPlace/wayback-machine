import Loader from 'react-loader-spinner';
import React, { Component } from 'react';

class Spinner extends Component {
  render() {
    return (
      <Loader 
        type="Watch"
        color="#21c76e"
        width="100"
        height="100"
      />
    );
  }
}

export default Spinner;
