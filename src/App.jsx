import React from "react";
import { Route, Switch } from "react-router-dom";
import SocialLogin from "./components/social_login_modal/socialLogin";
import Main from "./pages/mainpage/mainpage";
import myPage from "./pages/mypage/mypage";

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
