import React, { Suspense } from "react";
import { Route, withRouter } from "react-router-dom";
import HomePage from "./containers/HomePage";
import Header from "./components/Header";
import ViewItemsPage from "./containers/ViewItemsPage";
import ItemPage from "./containers/ItemPage";
import ViewProfilePage from "./containers/ViewProfilePage";
import ListItemPage from "./containers/ListItemPage";

const RoutedHeader = withRouter(Header);

const App = () => (
  <>
    <RoutedHeader />
    <Suspense fallback={HomePage}>
      <Route path="/" exact component={HomePage} />
      <Route path="/browse" exact component={ViewItemsPage} />
      <Route path="/profile" exact component={ViewProfilePage} />

      <Route path="/item" component={ItemPage} />
      <Route path="/sell" exact component={ListItemPage} />
      {/*Add new routes here!*/}
    </Suspense>
  </>
);

export default App;
