import React, { Component } from "react";

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
      <div className="remove-category modal">
        <h1>Usuń kategorię</h1>
        <select
          value={this.state.category}
          onChange={this.handleCategoryChange}
        >
          <option></option>
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
