import React, { useEffect } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

const SocialLogin = ({ closeModal, authService }) => {
  const history = useHistory();
  const goToMain = (userId) => {
    history.push({
      pathname: "/",
      state: { id: userId },
    });
  };

  const onLogin = (event) => {
    closeModal(false);
    authService //
      .login(event.currentTarget.textContent)
      // .then((data) => goToMain(data.user.uid));
      .then((data) =>
        localStorage.setItem('uid', data.user.uid)
      )
      .then(() => history.push("/mypage"));
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
        <ExitButton onClick={() => closeModal(false)}>X</ExitButton>
        <GoogleLogin onClick={onLogin}>Google</GoogleLogin>
        <GithubLogin onClick={onLogin}>Github</GithubLogin>
      </LoginModal>
    </ModalBackground>
  );
};

const ModalBackground = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const LoginModal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 500px;
  height: 500px;
  background-color: white;
`;

const ExitButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
`;

const GoogleLogin = styled.button`
  width: 50%;
  height: 50px;
  font-size: 30px;
  cursor: pointer;
`;

const GithubLogin = styled.button`
  width: 50%;
  height: 50px;
  font-size: 30px;
  cursor: pointer;
  margin-top: 30px;
`;

const NaverLogin = styled.button`
  width: 50%;
  height: 50px;
  font-size: 30px;
  margin-top: 30px;
`;
export default SocialLogin;
