import React, { Suspense } from "react";
import { Route, withRouter } from "react-router-dom";
import HomePage from "./containers/HomePage";
import Header from "./components/Header";
import ViewItemsPage from "./containers/ViewItemsPage";

const RoutedHeader = withRouter(Header);

const App = () => (
  <>
    <RoutedHeader />
    <Suspense fallback={null}>
      <Route path="/" exact component={HomePage} />
      <Route path="/browse" exact component={ViewItemsPage} />
      <Route path="/item" component={null} />
      {/*Add new routes here!*/}
    </Suspense>
  </>
);

export default App;
