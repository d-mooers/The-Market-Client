import React, { Suspense } from "react";
import { Route, withRouter } from "react-router-dom";
import HomePage from "./containers/HomePage";
import Header from "./components/Header";
import ViewItemsPage from "./containers/ViewItemsPage";
import Register from "./containers/RegisterContainer";
import Questions from "./containers/QuestionsContainer";
import ItemPage from "./containers/ItemPage";
import ViewProfilePage from "./containers/ViewProfilePage";
import ViewLoginPage from "./containers/ViewLoginPage";
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
      <Route path="/login" exact component={ViewLoginPage} />
      <Route path="/sell" exact component={ListItemPage} />
      <Route path="/questions" component={Questions} />
      <Route path="/register" exact component={Register} />
      {/*Add new routes here!*/}
    </Suspense>
  </>
);

export default App;
