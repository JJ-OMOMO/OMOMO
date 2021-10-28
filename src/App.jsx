import React from "react";
import { Route, Switch } from "react-router-dom";
import Main from "./pages/mainpage/mainpage";
import myPage from "./pages/mypage/mypage";
import { useLocation } from "react-router";

function App({ authService }) {
  return (
    <Switch>
      <Route path="/" exact>
        <Main authService={authService} />
      </Route>
      <Route path="/mypage" component={myPage} exact></Route>
    </Switch>
  );
}

export default App;
