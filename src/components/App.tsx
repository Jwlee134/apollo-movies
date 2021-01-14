import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Detail from "../routes/Detail";
import Home from "../routes/Home";

const App = () => {
  return (
    <HashRouter>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/:id">
        <Detail />
      </Route>
    </HashRouter>
  );
};

export default App;
