import React, { Component } from 'react';
import DateTimePicker from 'react-datetime-picker';

const DAY_IN_MONTH = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);

class Countdown extends Component {
  state = {
    date: new Date(),
    isCountdown: false,
    countdownTime: ''
  }

  onChange = date => this.setState({ date })

  toDateTime = (secx) => {
    const countdown = {};
    let day, month, year, hour, min, sec;
    min = Math.floor(secx / 60);
    sec = secx - min * 60;

    hour = Math.floor(min / 60);
    min -= hour * 60;

    day = Math.floor(hour / 24);
    hour -= day * 24;

    year = Math.floor(day / 365);
    day -= year * 365;
    countdown.min = min;
    countdown.sec = sec;
    countdown.hour = hour;
    countdown.year = year;
    for (var i = 0; i < 11; i++) {
      if (day >= DAY_IN_MONTH[i]) {
        day -= DAY_IN_MONTH[i];
      }
      else {
        countdown.month = i;
        countdown.day = day;
        break;
      }
    }


    return countdown;
  }

  countdownStart = () => {
    const {
      date
    } = this.state
    const countDown = setInterval(() => {
      const today = new Date();
      const totalSec = Math.floor(Math.abs(Date.parse(date) - Date.parse(today))/1000);
      if (totalSec === 0) {
        this.setState({
          isCountdown: false
        });
        clearInterval(countDown);
      }
      const {
        day,
        month,
        year,
        hour,
        min,
        sec
      } = this.toDateTime(totalSec);
      
      this.setState({
        isCountdown: true,
        countdownTime : `${day} days ${month} months ${year} years ${hour} hours ${min} minutes ${sec} seconds`
      });
    },1000);
  }

  render() {
    return (
      <div className="Countdown">
        {!this.state.isCountdown &&
        <DateTimePicker
          onChange={this.onChange}
          value={this.state.date}
        />}
        <div onClick={this.countdownStart}> Countdown </div>
        {this.state.isCountdown && <div> {this.state.countdownTime} </div>}
      </div>
    );
  }
}

export default Countdown;
