import React, { Component } from "react";
import "./AddMoney.scss";

class AddMoney extends Component {
  state = {
    categories: this.props.items,
    category: "",
    sum: ""
  };

  handleCategoryChange = event => {
    this.setState({ category: event.target.value });
  };

  handleSumChange = event => {
    this.setState({ sum: event.target.value });
  };

  handleButtonClick = () => {
    if (typeof this.props.onAdd === "function") {
      this.props.onAdd(this.state.category, parseFloat(this.state.sum));
    }
  };

  render() {
    return (
      <div className="add-money">
        <h1>Dodaj kwotę (zł)</h1>
        <select
          value={this.state.category}
          onChange={this.handleCategoryChange}
        >
          <option></option>
          {this.state.categories.map(item => (
            <option key={item.title}>{item.title}</option>
          ))}
        </select>
        <input
          type="number"
          name="sum"
          value={this.state.sum}
          onChange={this.handleSumChange}
          placeholder="np. 100"
        />
        <button onClick={this.handleButtonClick}>Dodaj</button>
      </div>
    );
  }
}

export default AddMoney;
