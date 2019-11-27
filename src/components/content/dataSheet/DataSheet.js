import React, { Component } from "react";
import "./DataSheet.scss";
import DataCard from "./dataCard/DataCard";
import DataSummary from "./dataSummary/DataSummary";
import ClockDate from "./clockDate/ClockDate";

class DataSheet extends Component {
  state = {
    totalIncome: 0,
    totalExpenses: 0
  };

  getTotalIncome = incomeSum => {
    this.setState({
      totalIncome: incomeSum
    });
  };

  getTotalExpenses = expensesSum => {
    this.setState({
      totalExpenses: expensesSum
    });
  };

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
        <ClockDate />
        <DataCard
          name="Przychody"
          template={income}
          getTotal={this.getTotalIncome}
        />
        <DataCard
          name="Wydatki"
          template={expenses}
          getTotal={this.getTotalExpenses}
        />
        <DataSummary
          totalIncome={this.state.totalIncome}
          totalExpenses={this.state.totalExpenses}
        />
      </div>
    );
  }
}

export default DataSheet;
