import React from "react";
import styled from "styled-components";
import Modal from "styled-react-modal";

const SocialLogin = (props) => (
  <LoginModal>
    <GoogleLogin>Google</GoogleLogin>
    <KakaoLogin>Kakao</KakaoLogin>
    <NaverLogin>Naver</NaverLogin>
  </LoginModal>
);

const LoginModal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
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
  cursor: pointer;
  margin-top: 30px;
`;
export default SocialLogin;
