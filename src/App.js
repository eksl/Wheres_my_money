import React from "react";
import "./App.scss";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import DataSheet from "./components/content/dataSheet/DataSheet";

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
