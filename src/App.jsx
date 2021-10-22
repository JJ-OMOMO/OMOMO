import React from "react";
import { Route, Switch } from "react-router-dom";
import Main from "./pages/mainpage/mainpage"
import myPage from "./pages/mypage/mypage"

function App() {

  return (
    <Switch>
      <Route path="/" component={Main} exact></Route>
      <Route path="/mypage" component={myPage} exact></Route>
    </Switch>
  );
}

export default App;
