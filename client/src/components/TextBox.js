import React, { Component } from 'react';
import { withRouter }from 'react-router-dom';
import './styles/TextBox.css';

class TextBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };

    this.onTyping = this.onTyping.bind(this);
    this.onPressEnter = this.onPressEnter.bind(this);
  }
  onTyping(ev) {
    this.setState({
      text: ev.target.value
    });
  }
  onPressEnter(ev) {
    const isText = this.state.text.trim();

    if(ev.charCode === 13 && isText) {
      const url = this.state.text;
      
      this.props.history.push(`/${url}`);
      this.setState({
        text: ''
      });
    }
  }
  render() {
    return (
      <div className='textContainer'>
        <input type='text' value={this.state.text} onChange={this.onTyping} onKeyPress={this.onPressEnter} placeholder='search..' />
      </div>
    );
  }
}

export default withRouter(TextBox);
