import React, { Component } from "react";
import "./SwapItems.scss";

class SwapItems extends Component {
  state = {
    newItems: this.props.items,
    chosenItem: ""
  };

  handleButtonClick = () => {
    if (typeof this.props.onSwap === "function") {
      this.props.onSwap(this.state.newItems);
    }
  };

  handleChosenItemChange = event => {
    this.setState({ chosenItem: event.target.value });
  };

  moveUp = () => {
    let tempItems = [...this.state.newItems];
    const findIndex = tempItems.findIndex(
      element => element.title === this.state.chosenItem
    );
    if (findIndex > 0) {
      const tempElement = tempItems[findIndex];
      tempItems[findIndex] = tempItems[findIndex - 1];
      tempItems[findIndex - 1] = tempElement;
    }
    this.setState({ newItems: tempItems });
  };

  moveDown = () => {
    let tempItems = [...this.state.newItems];
    const findIndex = tempItems.findIndex(
      element => element.title === this.state.chosenItem
    );
    if (findIndex < tempItems.length - 1) {
      const tempElement = tempItems[findIndex];
      tempItems[findIndex] = tempItems[findIndex + 1];
      tempItems[findIndex + 1] = tempElement;
    }
    this.setState({ newItems: tempItems });
  };

  resetValue = () => {
    let tempItems = [...this.state.newItems];
    const findIndex = tempItems.findIndex(
      element => element.title === this.state.chosenItem
    );
    tempItems[findIndex].sum = 0;
    this.setState({ newItems: tempItems });
  };

  render() {
    return (
      <div className="remove-category">
        <h1>Zamiana miejsc</h1>
        <ul>
          {this.state.newItems.map((item, index) => (
            <li key={item.title}>
              <label>
                {index + 1} {item.title}
              </label>
            </li>
          ))}
        </ul>
        <select
          value={this.state.chosenItem}
          onChange={this.handleChosenItemChange}
        >
          <option></option>
          {this.state.newItems.map((item, index) => (
            <option key={item.title}>{item.title}</option>
          ))}
        </select>
        <button onClick={this.moveUp}>W górę</button>
        <button onClick={this.moveDown}>W dół</button>
        <button onClick={this.resetValue}>Reset</button>
        <button onClick={this.handleButtonClick}>Zapisz</button>
      </div>
    );
  }
}

export default SwapItems;
