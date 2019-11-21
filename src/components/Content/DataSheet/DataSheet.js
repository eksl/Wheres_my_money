import React, { Component } from "react";
import "./DataSheet.scss";
import DataCard from "./DataCard/DataCard";
import DataSummary from "./DataSummary/DataSummary";

class DataSheet extends Component {
  state = {
    totalIncome: 0,
    totalExpenses: 0,
    totalSum: 0
  };

  getTotalIncome = incomeSum => {
    this.setState(state => ({
      totalIncome: incomeSum
    }));
  };

  getTotalExpenses = expensesSum => {
    this.setState(state => ({
      totalExpenses: expensesSum
    }));
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.totalIncome !== prevState.totalIncome ||
      this.state.totalExpenses !== prevState.totalExpenses
    ) {
      this.setState(state => ({
        totalSum: state.totalIncome - state.totalExpenses
      }));
    }
  }

  render() {
    // Templates
    const income = [
      { title: "Praca", sum: 0 },
      { title: "Kredyty, pożyczki", sum: 0 },
      { title: "Oddane długi", sum: 0 },
      { title: "Dofinansowania", sum: 0 },
      { title: "Premie, dodatki", sum: 0 },
      { title: "Inne", sum: 0 }
    ];
    const expenses = [
      { title: "Mieszkanie", sum: 0 },
      { title: "Jedzenie", sum: 0 },
      { title: "Picie", sum: 0 },
      { title: "Lekarstwa, wizyty lekarskie", sum: 0 },
      { title: "Higiena, pralnia", sum: 0 },
      { title: "Kredyty, długi", sum: 0 },
      { title: "Transport (paliwo, bilety)", sum: 0 },
      { title: "Abonamenty", sum: 0 },
      { title: "Rozrywka", sum: 0 },
      { title: "Nauka", sum: 0 },
      { title: "Inne", sum: 0 }
    ];

    return (
      <div className="data-sheet">
        <h2>Data Sheet</h2>
        <DataCard
          name="Przychody"
          items={income}
          getTotal={this.getTotalIncome}
        />
        <DataCard
          name="Wydatki"
          items={expenses}
          getTotal={this.getTotalExpenses}
        />
        <h1>{this.state.totalSum}</h1>
        <DataSummary />
      </div>
    );
  }
}

export default DataSheet;
