import React, { Component } from "react";
import "./RemoveCategory.scss";

class RemoveCategory extends Component {
  state = {
    categories: this.props.items,
    category: ""
  };

  handleCategoryChange = event => {
    this.setState({ category: event.target.value });
  };

  handleButtonClick = () => {
    if (typeof this.props.onRemove === "function") {
      this.props.onRemove(this.state.category);
    }
  };

  render() {
    return (
      <div className="remove-category">
        <h1>Usuń kategorię</h1>
        <select
          value={this.state.category}
          onChange={this.handleCategoryChange}
        >
          {this.state.categories.map(item => (
            <option key={item.title}>{item.title}</option>
          ))}
        </select>
        <button onClick={this.handleButtonClick}>Usuń</button>
      </div>
    );
  }
}

export default RemoveCategory;
