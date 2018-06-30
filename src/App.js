import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { Countdown, InputTime } from './components';
import {
  setCounter,
  startCountdown,
  stopCountdown,
  setStartTime,
  setEndTime,
} from './store/modules/countdown';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    start: '00:00:00',
    end: '00:00:00',
    errorMsg: '',
  };

  handleStartChange = ({ target }) => {
    this.setState({ start: target.value });
  };

  handleStartBlur = ({ target }) => {
    const start = target.value;
    const endTime = moment(start, 'HH:mm:ss').add(1, 's');

    this.setState({ end: endTime.format('HH:mm:ss') });
  };

  handleEndChange = ({ target }) => {
    console.log('VALUE', target.name, target.value);
    this.setState({ end: target.value });
  };

  handleCountdown = () => {
    const {
      countdownId,
      setEndTime,
      setStartTime,
      startCountdown,
      stopCountdown,
    } = this.props;
    const { start, end } = this.state;

    if (!countdownId) {
      const startTime = moment(start, 'HH:mm:ss');
      const endTime = moment(end, 'HH:mm:ss');
      const timeDiff = endTime.diff(startTime);

      if (timeDiff <= 0) {
        this.setState({
          errorMsg:
            'Invalid time range, start time should be earlier than end time',
        });
      } else {
        this.setState({ errorMsg: '' });
        setStartTime(startTime);
        setEndTime(endTime);
        startCountdown(setInterval(this.countdownTick, 1000));
      }
    } else {
      stopCountdown();
    }
  };

  countdownTick = () => {
    const {
      countdownId,
      counter,
      endTime,
      setCounter,
      stopCountdown,
    } = this.props;
    const newCounter = counter.clone().add(1, 's');
    const timeDiff = endTime.diff(newCounter);

    setCounter({
      counter: newCounter,
      timeDiff,
      timeExpired: timeDiff < 0,
    });

    if (timeDiff < 0) {
      clearInterval(countdownId);
      stopCountdown();
    }
  };

  render() {
    const { countdownId } = this.props;
    const { start, end, errorMsg } = this.state;
    const buttonText = countdownId ? 'Stop Countdown' : 'Start Countdown';

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Countdown App</h1>
        </header>
        <section className="App-intro">
          <InputTime
            name="start"
            label="Start Time"
            value={start}
            onBlur={this.handleStartBlur}
            onChange={this.handleStartChange}
          />
          <InputTime
            name="end"
            label="End Time"
            value={end}
            min={start}
            onChange={this.handleEndChange}
          />
          <button onClick={this.handleCountdown}>{buttonText}</button>
          {errorMsg && <span className="error">{errorMsg}</span>}
          {!errorMsg && <Countdown />}
        </section>
      </div>
    );
  }
}

const mapStateToProps = ({ countdown }) => ({
  countdownId: countdown.countdownId,
  counter: countdown.counter,
  endTime: countdown.endTime,
  startTime: countdown.startTime,
});

const mapDispatchToProps = {
  setCounter,
  setStartTime,
  setEndTime,
  startCountdown,
  stopCountdown,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
