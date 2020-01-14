import React, { Component } from "react";
import AddCategory from "../../modals/AddCategory";
import RemoveCategory from "../../modals/RemoveCategory";
import SwapItems from "../../modals/SwapItems";
import AddMoney from "../../modals/AddMoney";
import ConfirmModal from "../../modals/ConfirmModal";

class DataCard extends Component {
  state = {
    items: [],
    total: 0,
    viewAddCategory: false,
    viewRemoveCategory: false,
    viewSwapItems: false,
    viewAddMoney: false,
    viewEditItems: false,
    viewConfirmModal: false
  };

  componentDidMount() {
    const fileName = `${this.props.name}_${this.props.date.month}_${this.props.date.year}`;
    const dataLocal = localStorage.getItem(fileName);
    if (dataLocal === null) {
      this.setState({
        items: this.props.template
      });
    } else {
      this.setState({
        items: JSON.parse(dataLocal)
      });
    }
    let totalSum = this.calculateTotalValue();
    this.setState({
      total: totalSum
    });
  }

  // Handling open add category modal
  handleAddItem = () => {
    this.setState(state => ({
      viewAddCategory: !state.viewAddCategory
    }));
  };

  // Get data from AddCategory modal component
  onAddItem = newTitle => {
    let doesExist = false;
    this.state.items.forEach(function(element) {
      if (newTitle === element.title) {
        doesExist = true;
      }
    });
    if (!doesExist) {
      this.setState(state => ({
        items: [...state.items, { title: newTitle, sum: 0 }],
        viewAddCategory: !state.viewAddCategory
      }));
    }
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

  // Handling open swap items modal
  handleSwapItems = () => {
    this.setState(state => ({
      viewSwapItems: !state.viewSwapItems
    }));
  };

  // Swap items with SwapItems modal component
  onSwapItems = newItems => {
    let totalSum = this.calculateTotalValue();
    this.setState(state => ({
      items: newItems,
      total: totalSum,
      viewSwapItems: !state.viewSwapItems
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
    if (newSum > 0) {
      let newItems = [...this.state.items];
      let id = newItems.findIndex(el => el.title === category);
      newItems[id].sum += newSum;

      let totalSum = this.calculateTotalValue();

      this.setState(state => ({
        total: totalSum,
        items: newItems,
        viewAddMoney: !state.viewAddMoney
      }));
    }
  };

  // Handle reset
  handleReset = () => {
    this.setState(state => ({
      viewConfirmModal: !state.viewConfirmModal
    }));
  };

  onConfirmYes = () => {
    let newItems = [...this.state.items];
    newItems.forEach(function(element) {
      element.sum = 0;
    });
    let totalSum = this.calculateTotalValue();
    this.setState(state => ({
      items: newItems,
      total: totalSum,
      viewConfirmModal: !state.viewConfirmModal
    }));
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.name !== prevProps.name ||
      this.props.date.month !== prevProps.date.month ||
      this.props.date.year !== prevProps.date.year
    ) {
      const fileName = `${this.props.name}_${this.props.date.month}_${this.props.date.year}`;
      const dataLocal = localStorage.getItem(fileName);
      if (dataLocal === null) {
        this.setState({ items: this.props.template }, () => {
          let totalSum = this.calculateTotalValue();
          this.setState({
            total: totalSum
          });
        });
      } else {
        this.setState(
          {
            items: JSON.parse(dataLocal)
          },
          () => {
            let totalSum = this.calculateTotalValue();
            this.setState({
              total: totalSum
            });
          }
        );
      }
    }

    if (this.state.items.length !== prevState.items.length) {
      let totalSum = this.calculateTotalValue();
      this.setState({
        total: totalSum
      });
    }

    if (
      this.state.total !== prevState.total &&
      typeof this.props.getTotal === "function"
    ) {
      const fileName = `${this.props.name}_${this.props.date.month}_${this.props.date.year}`;
      this.props.getTotal(this.state.total);
      localStorage.setItem(fileName, JSON.stringify(this.state.items));
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
    } else if (this.state.viewSwapItems) {
      modal = <SwapItems items={this.state.items} onSwap={this.onSwapItems} />;
    } else if (this.state.viewAddMoney) {
      modal = <AddMoney items={this.state.items} onAdd={this.onAddMoney} />;
    } else if (this.state.viewConfirmModal) {
      modal = (
        <ConfirmModal onYes={this.onConfirmYes} onNo={this.handleReset} />
      );
    } else {
      modal = null;
    }

    return (
      <div className="data-card">
        <h2>{this.props.name}</h2>
        <div className="buttons">
          <button onClick={this.handleAddItem}>+</button>
          <button onClick={this.handleRemoveItem}>-</button>
          <button onClick={this.handleSwapItems}>Zmień układ</button>
          <button onClick={this.handleAddMoney}>+</button>
          <button onClick={this.handleReset}>Reset</button>
        </div>

        <ul>
          {this.state.items.map(item => (
            <li key={item.title}>
              <label>{item.title}: </label>
              <label>{item.sum} zł</label>
            </li>
          ))}
          <li>
            <label>Podsumowanie: </label>
            <label>{this.state.total} zł</label>
          </li>
        </ul>
        {modal}
      </div>
    );
  }
}

export default DataCard;
