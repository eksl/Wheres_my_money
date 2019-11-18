import React, { Component } from "react";
import "./DataCard.scss";
import AddCategory from "../../Modals/AddCategory";

class DataCard extends Component {
  state = {
    items: [],
    viewForm: false
  };

  // Handling open modal
  handleAddItem = () => {
    this.setState(state => ({
      viewForm: !state.viewForm
    }));
  };

  // Get data from AddCategory modal component
  onAddCategory = newTitle => {
    this.setState(state => ({
      items: [...state.items, { title: newTitle, sum: 0 }],
      viewForm: !state.viewForm
    }));
  };

  render() {
    let form;
    if (this.state.viewForm) {
      form = <AddCategory onAdd={this.onAddCategory} />;
    } else {
      form = null;
    }

    return (
      <div className="data-card">
        <h3>DataCard -> {this.props.name}</h3>
        <button onClick={this.handleAddItem}>+</button>
        <ul>
          {this.state.items.map(item => (
            <li key={item}>
              <label>{item.title} ---> </label>
              <label>{item.sum} zł</label>
            </li>
          ))}
        </ul>
        <div>{form}</div>
      </div>
    );
  }
}

export default DataCard;
