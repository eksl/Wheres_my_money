import React, { Component } from "react";
import "./DataCard.scss";
import AddCategory from "../../Modals/AddCategory";
import RemoveCategory from "../../Modals/RemoveCategory";
import AddMoney from "../../Modals/AddMoney";

class DataCard extends Component {
  state = {
    items: this.props.items,
    total: 0,
    viewAddCategory: false,
    viewRemoveCategory: false,
    viewAddMoney: false
  };

  // Handling open add category modal
  handleAddItem = () => {
    this.setState(state => ({
      viewAddCategory: !state.viewAddCategory
    }));
  };

  // Get data from AddCategory modal component
  onAddItem = newTitle => {
    this.setState(state => ({
      items: [...state.items, { title: newTitle, sum: 0 }],
      viewAddCategory: !state.viewAddCategory
    }));
  };

  // Handling open remove category modal
  handleRemoveItem = () => {
    this.setState(state => ({
      viewRemoveCategory: !state.viewRemoveCategory
    }));
  };

  // Remove data with RemoveCategory modal component
  onRemoveItem = removeTitle => {
    this.setState(state => ({
      items: state.items.filter(item => item.title !== removeTitle),
      viewRemoveCategory: !state.viewRemoveCategory
    }));
  };

  // Handling open add money modal
  handleAddMoney = () => {
    this.setState(state => ({
      viewAddMoney: !state.viewAddMoney
    }));
  };

  // Get data from AddMoney modal component
  onAddMoney = (category, newSum) => {
    let newItems = [...this.state.items];
    let id = newItems.findIndex(el => el.title === category);
    newItems[id].sum += newSum;

    // Calculate total value
    let totalSum = 0;
    for (let i = 0; i < this.state.items.length; i++) {
      totalSum += this.state.items[i].sum;
    }

    this.setState(state => ({
      total: totalSum,
      items: newItems,
      viewAddMoney: !state.viewAddMoney
    }));

    if (typeof this.props.getTotal === "function") {
      this.props.getTotal(totalSum);
    }
  };

  render() {
    let modal;
    if (this.state.viewAddCategory) {
      modal = <AddCategory onAdd={this.onAddItem} />;
    } else if (this.state.viewRemoveCategory) {
      modal = (
        <RemoveCategory items={this.state.items} onRemove={this.onRemoveItem} />
      );
    } else if (this.state.viewAddMoney) {
      modal = <AddMoney items={this.state.items} onAdd={this.onAddMoney} />;
    } else {
      modal = null;
    }

    return (
      <div className="data-card">
        <h3>DataCard -> {this.props.name}</h3>
        <button onClick={this.handleAddItem}>+</button>
        <button onClick={this.handleRemoveItem}>-</button>
        <button onClick={this.handleAddMoney}>+</button>
        <ul>
          {this.state.items.map(item => (
            <li key={item.title}>
              <label>{item.title} ---> </label>
              <label>{item.sum} zł</label>
            </li>
          ))}
          <li>
            <label>Podsumowanie ---> </label>
            <label>{this.state.total} zł</label>
          </li>
        </ul>
        {modal}
      </div>
    );
  }
}

export default DataCard;
