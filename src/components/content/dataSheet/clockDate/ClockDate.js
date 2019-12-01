import React, { Component } from "react";

class ClockDate extends Component {
  state = {
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear()
  };

  handleMonthChange = event => {
    this.setState({ month: event.target.value });
  };

  handleYearChange = event => {
    // Max year is current year
    if (event.target.value > new Date().getFullYear()) {
      this.setState({ year: new Date().getFullYear() });
    } else {
      this.setState({ year: event.target.value });
    }
  };

  handleButtonClick = () => {
    if (typeof this.props.getDate === "function") {
      this.props.getDate(this.state.month, this.state.year);
    }
  };

  render() {
    const todayDay = new Date().getDate();
    const todayMonth = new Date().getMonth() + 1;
    const todayYear = new Date().getFullYear();

    let warning = null;
    if (todayDay > 26) {
      warning = (
        <p className="warning">
          Końcówka miesiąca, pamiętaj o uzupełnieniu informacji o bieżącym
          stanie konta
        </p>
      );
    } else {
      warning = null;
    }

    let today = (
      <div className="today">
        {todayDay}.{todayMonth}.{todayYear}
        {warning}
      </div>
    );

    const month = (
      <select
        className="calendar__month"
        value={this.state.month}
        onChange={this.handleMonthChange}
      >
        <option></option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
        <option>7</option>
        <option>8</option>
        <option>9</option>
        <option>10</option>
        <option>11</option>
        <option>12</option>
      </select>
    );

    const year = (
      <input
        className="calendar__year"
        type="number"
        name="year"
        value={this.state.year}
        onChange={this.handleYearChange}
      ></input>
    );

    return (
      <div className="clock-date">
        {today}
        <div className="calendar">
          {month}
          {year}
          <button className="calendar-button" onClick={this.handleButtonClick}>
            Wybierz
          </button>
        </div>
      </div>
    );
  }
}

export default ClockDate;
