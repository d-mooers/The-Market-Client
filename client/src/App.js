import React, { Suspense } from "react";
import { Route, withRouter } from "react-router-dom";
import HomePage from "./containers/HomePage";
import Header from "./components/Header";

const RoutedHeader = withRouter(Header);

const App = () => (
  <>
    <RoutedHeader />
    <Suspense fallback={null}>
      <Route path="/" exact component={HomePage} />
      {/*Add new routes here!*/}
    </Suspense>
  </>
);

export default App;
