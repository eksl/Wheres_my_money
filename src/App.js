import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import "./App.scss";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import DataSheet from "./components/content/dataSheet/DataSheet";
import About from "./components/content/about/About";

function App() {
  return (
    <div className="App">
      <Header />
      <HashRouter>
        <Switch>
          <Route exact path="/" component={DataSheet} />
          <Route path="/About" component={About} />
        </Switch>
      </HashRouter>
      <Footer />
    </div>
  );
}

export default App;
