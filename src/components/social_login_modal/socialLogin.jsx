import React, { useEffect } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import roulette_bg from "../../images/roulette_bg.png";

const SocialLogin = ({ closeModal, authService }) => {
  const history = useHistory();
  // const goToMain = (userId) => {
  //   history.push({
  //     pathname: "/",
  //     state: { id: userId },
  //   });
  // };

  const onLogin = (event) => {
    closeModal(false);
    authService //
      .login(event.currentTarget.textContent)
      // .then((data) => goToMain(data.user.uid));
      .then((data) => localStorage.setItem("uid", data.user.uid))
      .then(() => history.push("/"));
  };

  // useEffect(() => {
  //   authService //
  //     .onAuthChange((user) => {
  //       user && goToMain(user.uid);
  //     });
  // });

  return (
    <ModalBackground>
      <LoginModal>
        <ExitButton onClick={() => closeModal(false)}>
          <i className="fas fa-times"></i>
        </ExitButton>
        <GoogleLogin onClick={onLogin}>Google</GoogleLogin>
        <GithubLogin onClick={onLogin}>Github</GithubLogin>
      </LoginModal>
    </ModalBackground>
  );
};

const ModalBackground = styled.div`
  max-width: 1600px;
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 6;
  background-color: rgba(0, 0, 0, 0.8);
`;

const LoginModal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 34.375rem;
  height: 34.375rem;
  background-image: url(${roulette_bg});
  background-size: cover;
  background-repeat: no-repeat;
  @media screen and (max-width: 414px) {
    width: 50rem;
    height: 50rem;
  }
`;

const ExitButton = styled.div`
  color: white;
  font-size: 3rem;
  font-family: "CookieRun-Regular";
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: white;
  position: absolute;
  top: -10px;
  right: -10px;
  cursor: pointer;
  border: 1px solid transparent;
`;

const GoogleLogin = styled.button`
  color: white;
  font-family: "CookieRun-Regular";
  width: 40%;
  height: 3.438rem;
  font-size: 2.3rem;
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: #ff2132;
  cursor: pointer;
  border: 2px solid #ff2132;
  border-radius: 0.5rem;
  background-color: #ff8da8;
  @media screen and (max-width: 414px) {
    font-size: 3rem;
    width: 30%;
    height: 4.5rem;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: #ff2132;
    border: 1px solid #ff2132;
  }
`;

const GithubLogin = styled.button`
  color: white;
  font-family: "CookieRun-Regular";
  width: 40%;
  height: 3.438rem;
  font-size: 2.3rem;
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: #ff2132;
  cursor: pointer;
  margin-top: 1.875rem;
  border: 2px solid #ff2132;
  border-radius: 0.5rem;
  background-color: #ff8da8;
  @media screen and (max-width: 414px) {
    font-size: 3rem;
    width: 30%;
    height: 4.5rem;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: #ff2132;
    border: 1px solid #ff2132;
  }
`;

export default SocialLogin;
