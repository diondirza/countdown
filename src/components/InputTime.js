import React, { Component } from 'react';

class Input extends Component {
  static defaultProps = {
    min: "00:00:00",
    max: "24:00:00",
  }

  render() {
    const { name, label, value, min, max, onBlur, onChange } = this.props;

    return (
      <div>
        <label htmlFor={name}>{label}</label>
        <input
          type="time"
          name={name}
          value={value}
          min={min}
          max={max}
          pattern="[0-9]{2}:[0-9]{2}:[0-9]{2}"
          step="1"
          onBlur={onBlur}
          onChange={onChange}
        />
      </div>
    );
  }
}

export default Input;
