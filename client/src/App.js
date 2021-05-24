import React, { Suspense, useState } from "react";
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
import Checkout from "./containers/CheckoutContainer";
import { UserProvider } from "./UserContext";

const RoutedHeader = withRouter(Header);

const App = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    _id: "609cb2b88951a63fccdcf790",
    authId: "aa94729e-866b-47b1-8c7a-ede2cfd25e51",
    loggedIn: false,
  });
  //const user = "hello";
  //const setUser = () => null;

  return (
    <UserProvider value={{ user, setUser }}>
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
        <Route path="/checkout" component={Checkout} />
        {/*Add new routes here!*/}
      </Suspense>
    </UserProvider>
  );
};

export default App;
