import React, { Component } from "react";
import "./DataSheet.scss";
import DataCard from "./DataCard/DataCard";
import DataSummary from "./DataSummary/DataSummary";

class DataSheet extends Component {
  render() {
    return (
      <div className="data-sheet">
        <h2>Data Sheet</h2>
        <DataCard name="Przychody" />
        <DataCard name="Wydatki" />
        <DataSummary />
      </div>
    );
  }
}

export default DataSheet;
