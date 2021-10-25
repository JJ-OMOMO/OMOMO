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
    authService //
      .login(event.currentTarget.textContent)
      .then((data) => goToMain(data.user.uid));
  };

  useEffect(() => {
    authService //
      .onAuthChange((user) => {
        user && goToMain(user.uid);
      });
  });

  return (
    <ModalBackground>
      <LoginModal>
        <ExitButton onClick={() => closeModal(false)}>X</ExitButton>
        <GoogleLogin onClick={onLogin}>Google</GoogleLogin>
        <KakaoLogin onClick={onLogin}>Kakao</KakaoLogin>
        <NaverLogin onClick={onLogin}>Naver</NaverLogin>
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
`;

const ExitButton = styled.button`
  font-size: 20px;
`;

const LoginModal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 500px;
  background-color: white;
`;

const GoogleLogin = styled.button`
  width: 50%;
  height: 50px;
  font-size: 30px;
  cursor: pointer;
`;

const KakaoLogin = styled.button`
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
