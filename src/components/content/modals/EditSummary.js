import React, { Component } from "react";
import "./EditSummary.scss";

class EditSummary extends Component {
  state = {
    begin: this.props.begin,
    current: this.props.current
  };

  handleBeginChange = event => {
    this.setState({ begin: event.target.value });
  };

  handleCurrentChange = event => {
    this.setState({ current: event.target.value });
  };

  handleButtonClick = () => {
    if (typeof this.props.onEdit === "function") {
      this.props.onEdit(
        parseFloat(this.state.begin),
        parseFloat(this.state.current)
      );
    }
  };

  render() {
    return (
      <div className="edit-summary">
        <h1>Edycja podsumowania (zł)</h1>
        <label>Stan konta na początku miesiąca:</label>
        <input
          type="number"
          name="begin"
          value={this.state.begin}
          onChange={this.handleBeginChange}
          placeholder="np. 1000"
        />
        <label>Rzeczywisty stan konta:</label>
        <input
          type="number"
          name="current"
          value={this.state.current}
          onChange={this.handleCurrentChange}
          placeholder="np. 1000"
        />
        <button onClick={this.handleButtonClick}>Zapisz</button>
      </div>
    );
  }
}

export default EditSummary;
