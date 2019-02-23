import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles/Modal.css';

class Modal extends Component {
  timeConverter(time) {
    const clock = new Date(time);
    const year = clock.getFullYear();
    const month = clock.getMonth() + 1 < 10 ? `0${clock.getMonth() + 1}` : `${clock.getMonth() + 1}`;
    const date = clock.getDate() < 10 ? `0${clock.getDate()}` : `${clock.getDate()}`;
    const minutes = clock.getMinutes() < 10 ? `0${clock.getMinutes()}` : `${clock.getMinutes()}`;

    if(clock.getHours() > 12) {
      const hours = (clock.getHours() - 12) < 10 ? `0${clock.getHours() - 12}` : `${clock.getHours() - 12}`;

      return `${year}.${month}.${date} PM ${hours} : ${minutes}`;
    } else {
      const hours = clock.getHours() < 10 ? `0${clock.getHours()}` : `${clock.getHours()}`;

      return `${year}.${month}.${date} AM ${hours} : ${minutes}`;
    }
  }
  render() {
    const timeList = this.props.content;
    timeList.sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

    return (
      <div className='modal'>
        <div onClick={this.props.inactive}>Out!</div>
        {timeList.map((time, index) => {
          return (
            <div key={index}>
              <Link to={{pathname: `/frame/${this.props.urlDirection}/${time}`}}>
                {this.timeConverter(time)}
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Modal;
