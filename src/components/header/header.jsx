import React from "react";
import styled from "styled-components";

const Header = (props) => (
  <Wrapper>
    <HeaderBox>
      <HeaderTitle>오모오모</HeaderTitle>
      <LoginMyPage>
        <HeaderLogin>Login</HeaderLogin>
        <HeaderMyPage>MyPage</HeaderMyPage>
      </LoginMyPage>
    </HeaderBox>
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100px;
  background-color: black;
`;

const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin: auto;
`;
const HeaderTitle = styled.span`
  font-size: 30px;
  color: #e9f108;
  display: flex;
  justify-content: center;
  border: 1px solid yellow;
`;

const LoginMyPage = styled.div`
  display: flex;
`;
const HeaderLogin = styled.button`
  font-size: 20px;
`;

const HeaderMyPage = styled.button`
  font-size: 20px;
  margin-left: 10px;
`;
export default Header;
