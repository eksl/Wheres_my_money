import React, { Component } from "react";
import "./ClockDate.scss";

function ClockDateYear(props) {
  return <span>{props.date.getFullYear()}</span>;
}

function ClockDateMonth(props) {
  return <span>{props.date.getMonth() + 1}</span>;
}

function ClockDateDay(props) {
  return <span>{props.date.getDate()}</span>;
}

class ClockDate extends Component {
  state = {
    date: new Date()
  };

  render() {
    return (
      <>
        <ClockDateDay date={this.state.date} />:
        <ClockDateMonth date={this.state.date} />:
        <ClockDateYear date={this.state.date} />
      </>
    );
  }
}

export default ClockDate;
