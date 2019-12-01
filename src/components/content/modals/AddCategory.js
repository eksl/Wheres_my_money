import React, { Component } from "react";

class AddCategory extends Component {
  state = {
    category: ""
  };

  handleCategoryChange = event => {
    this.setState({ category: event.target.value });
  };

  handleButtonClick = () => {
    if (typeof this.props.onAdd === "function") {
      this.props.onAdd(this.state.category);
    }
  };

  render() {
    return (
      <div className="add-category modal">
        <h1>Dodaj kategorię</h1>
        <input
          type="text"
          name="category"
          value={this.state.category}
          onChange={this.handleCategoryChange}
          placeholder="np. jedzenie"
        />
        <button onClick={this.handleButtonClick}>Dodaj</button>
      </div>
    );
  }
}

export default AddCategory;
