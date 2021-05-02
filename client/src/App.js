import React, { Suspense } from "react";
import { Route, withRouter } from "react-router-dom";
import HomePage from "./containers/HomePage";
import Header from "./components/Header";
import ViewItemsPage from "./containers/ViewItemsPage";
import ItemPage from "./containers/ItemPage";

const RoutedHeader = withRouter(Header);

const App = () => (
  <>
    <RoutedHeader />
    <Suspense fallback={null}>
      <Route path="/" exact component={HomePage} />
      <Route path="/browse" exact component={ViewItemsPage} />
      <Route path="/item" component={ItemPage} />
      {/*Add new routes here!*/}
    </Suspense>
  </>
);

export default App;
