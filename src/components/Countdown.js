import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

class Countdown extends Component {
  render() {
    const { timeDiff, timeExpired } = this.props;

    if (timeDiff === null) {
      return null;
    }

    const duration = moment.duration(timeDiff);
    const time = moment.utc(duration.as('milliseconds'));

    return (
      <section className="countdown">
        <div>{timeExpired ? '00' : time.format('HH')}</div>
        <div>{timeExpired ? '00' : time.format('mm')}</div>
        <div>{timeExpired ? '00' : time.format('ss')}</div>
      </section>
    );
  }
}

const mapStateToProps = ({ countdown }) => ({
  timeDiff: countdown.timeDiff,
  timeExpired: countdown.timeExpired,
})

export default connect(mapStateToProps)(Countdown);
