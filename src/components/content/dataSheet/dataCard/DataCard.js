import React, { Component } from "react";
import "./DataCard.scss";
import AddCategory from "../../modals/AddCategory";
import RemoveCategory from "../../modals/RemoveCategory";
import AddMoney from "../../modals/AddMoney";

class DataCard extends Component {
  state = {
    items: [],
    total: 0,
    viewAddCategory: false,
    viewRemoveCategory: false,
    viewAddMoney: false,
    viewEditItems: false
  };

  componentDidMount() {
    const dataLocal = localStorage.getItem(this.props.name);
    if (dataLocal === null) {
      this.setState({ items: this.props.template });
    } else {
      this.setState({
        items: JSON.parse(dataLocal)
      });
    }
  }

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

  // Handling open edit items modal
  handleEditItems = () => {
    this.setState(state => ({
      viewEditItems: !state.viewEditItems
    }));
  };

  // Edit all items with EditItems modal component
  onEditItems = newItems => {
    this.setState(state => ({
      state: newItems,
      viewEditItems: !state.viewEditItems
    }));
  };

  // Handling open add money modal
  handleAddMoney = () => {
    this.setState(state => ({
      viewAddMoney: !state.viewAddMoney
    }));
  };

  calculateTotalValue = () => {
    let totalSum = 0;
    for (let i = 0; i < this.state.items.length; i++) {
      totalSum += this.state.items[i].sum;
    }
    return totalSum;
  };

  // Get data from AddMoney modal component
  onAddMoney = (category, newSum) => {
    let newItems = [...this.state.items];
    let id = newItems.findIndex(el => el.title === category);
    newItems[id].sum += newSum;

    let totalSum = this.calculateTotalValue();

    this.setState(state => ({
      total: totalSum,
      items: newItems,
      viewAddMoney: !state.viewAddMoney
    }));
  };

  // Handle reset
  handleReset = () => {
    let newItems = [...this.state.items];
    newItems.forEach(function(element) {
      element.sum = 0;
    });
    let totalSum = this.calculateTotalValue();
    this.setState({ items: newItems, total: totalSum });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.items.length !== prevState.items.length) {
      let totalSum = this.calculateTotalValue();
      this.setState(state => ({
        total: totalSum
      }));
    }

    if (
      this.state.total !== prevState.total &&
      typeof this.props.getTotal === "function"
    ) {
      this.props.getTotal(this.state.total);
      localStorage.setItem(this.props.name, JSON.stringify(this.state.items));
    }
  }

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
        <button onClick={this.handleReset}>Reset</button>
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
