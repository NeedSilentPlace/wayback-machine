import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import './styles/Calendar.css';

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: 2019,
      archiveTime: []
    };

    this.makeMonthCalendar = this.makeMonthCalendar.bind(this);
    this.onClickModalOut = this.onClickModalOut.bind(this);
    this.onClickNext = this.onClickNext.bind(this);
    this.onClickPrev = this.onClickPrev.bind(this);
  }

  makeMonthCalendar(mon, year) {
    const mark = this.props.mark.map(date => {
      const localTime = new Date(date);

      return `${localTime.getFullYear()}-${localTime.getMonth()}-${localTime.getDate()}`;
    });
    const datesBeMarked = [...new Set(mark)];
    const today = new Date(year, mon);
    const monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dayList = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const day = today.getDay();
    const lastDate = new Date(year, mon + 1, -1).getDate();
    const number = [];
    
    for(let i = 0; i < 42; i++) {
      if(i - day > lastDate) {
        number.push('');
        continue;
      }
      if(i >= day) {
        number.push(i - day + 1);
        continue;
      }
      number.push('');
    }

    if(number[35]) {
      return (
        <div className='calendarBox' key={mon}>
          <div>{monthList[mon]}</div>
          <div className='calendar'>
            {[...dayList, ...number].map((date, index) => {
              if(index < 7) {
                return <div className='day' key={index}>{date}</div>;
              }
              if(date) {
                const fullDate = `${year}-${mon}-${date}`;
                if(datesBeMarked.includes(fullDate)) {
                  return <div className='day marker' key={index} onClick={this.onClickMarker.bind(this, fullDate)}>{date}</div>;
                } else {
                  return <div className='day' key={index}>{date}</div>;
                }
              } else {
                return <div className='day' key={index}>{date}</div>;
              }
            })}
          </div>
        </div>
      );
    } else {
      return (
        <div className='calendarBox' key={mon}>
          <div>{monthList[mon]}</div>
          <div className='calendar'>
            {[...dayList, ...number.slice(0, 35)].map((date, index) => {
              if(index < 7) {
                return <div className='day' key={index}>{date}</div>;
              }
              if(date) {
                const fullDate = `${year}-${mon}-${date}`;
                if(datesBeMarked.includes(fullDate)) {
                  return <div className='day marker' key={index} onClick={this.onClickMarker.bind(this, fullDate)}>{date}</div>;
                } else {
                  return <div className='day' key={index}>{date}</div>;
                }
              } else {
                return <div className='day' key={index}>{date}</div>;
              }
            })}
          </div>
        </div>
      );
    }
  }

  onClickMarker(marker) {
    const archiveTime = this.props.mark.filter(date => {
      const localTime = new Date(date);
      
      return `${localTime.getFullYear()}-${localTime.getMonth()}-${localTime.getDate()}` === marker;
    });

    this.setState({
      archiveTime
    });
  }

  onClickPrev() {
    this.setState({
      year: this.state.year - 1
    });
  }

  onClickNext() {
    this.setState({
      year: this.state.year + 1
    });
  }

  onClickModalOut() {
    this.setState({
      archiveTime: []
    });
  }

  render() {
    const month =[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    return (
      <div className='timeArea'>
        <Link to='/request/result' className='archiveAtCalendar' onClick={ev => this.props.onClickAdd(this.props.title)}>Archive Now</Link>
        <div className='year'>
          <span className='changeYear' onClick={this.onClickPrev}>&#8249;</span>
          {this.state.year}
          <span className='changeYear' onClick={this.onClickNext}>&#8250;</span>
        </div>
        <div className='calendarContainer'>
          {month.map(m => {
            return this.makeMonthCalendar(m, this.state.year);
          })}
        </div>
        {this.state.archiveTime.length ? <Modal urlDirection={this.props.title} content={this.state.archiveTime} inactive={this.onClickModalOut}/> : null}
      </div>
    );
  }
}

export default Calendar;
