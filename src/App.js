import React from "react";
import "./App.scss";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import DataSheet from "./components/Content/DataSheet/DataSheet";

function App() {
  return (
    <div className="App">
      <Header />
      <DataSheet />
      <Footer />
    </div>
  );
}

export default App;
