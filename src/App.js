import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import SearchPage from "./SearchPage";
import MainPage from "./MainPage";

class BooksApp extends React.Component {
  state = {};

  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/search" render={(props) => <SearchPage {...props} />} />
        </Switch>
      </div>
    );
  }
}

export default BooksApp;
