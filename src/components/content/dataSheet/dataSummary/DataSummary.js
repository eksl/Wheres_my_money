import React, { Component } from "react";
import "./DataSummary.scss";
import EditSummary from "../../modals/EditSummary";

class DataSummary extends Component {
  state = {
    total: 0,
    begin: 0,
    current: 0,
    simulation: 0,
    difference: 0,
    viewEditSummary: false
  };

  handleEdit = () => {
    this.setState(state => ({
      viewEditSummary: !state.viewEditSummary
    }));
  };

  onEdit = (newBegin, newCurrent) => {
    this.setState(state => ({
      begin: newBegin,
      current: newCurrent,
      viewEditSummary: !state.viewEditSummary
    }));
  };

  componentDidUpdate(prevProps, prevState) {
    // Calculate income - expenses
    if (
      this.props.totalIncome !== prevProps.totalIncome ||
      this.props.totalExpenses !== prevProps.totalExpenses
    ) {
      this.setState({
        total: this.props.totalIncome - this.props.totalExpenses
      });
    }

    // Calculate simulation
    if (
      this.state.total !== prevState.total ||
      this.state.begin !== prevState.begin
    ) {
      this.setState(state => ({
        simulation: state.total + state.begin
      }));
    }

    // Calculate difference
    if (
      this.state.simulation !== prevState.simulation ||
      this.state.current !== prevState.current
    ) {
      this.setState(state => ({
        difference: Math.abs(state.simulation - state.current)
      }));
    }
  }

  render() {
    let modal;
    if (this.state.viewEditSummary) {
      modal = (
        <EditSummary
          begin={this.state.begin}
          current={this.state.current}
          onEdit={this.onEdit}
        />
      );
    } else {
      modal = null;
    }

    return (
      <div className="data-summary">
        <h3>DataSummary</h3>
        <p>Zarobki - wydatki --> {this.state.total} zł</p>
        <p>Stan konta na początku miesiąca --> {this.state.begin} zł</p>
        <p>Symulacja --> {this.state.simulation} zł</p>
        <p>Rzeczywisty stan konta --> {this.state.current} zł</p>
        <p>Różnica --> {this.state.difference} zł</p>
        <button onClick={this.handleEdit}>Edit</button>
        {modal}
      </div>
    );
  }
}

export default DataSummary;
