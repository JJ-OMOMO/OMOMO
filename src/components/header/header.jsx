import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Header = (props) => (
  <Wrapper>
    <HeaderBox>
      <HeaderTitle>
        <Link to="/">오모오모</Link>
      </HeaderTitle>
      <LoginMyPage>
        <HeaderLogin>Login</HeaderLogin>
        <HeaderMyPage>
          <Link to="/mypage">MyPage</Link>
        </HeaderMyPage>
      </LoginMyPage>
    </HeaderBox>
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  height: 100px;
  border: 1px solid blue;
`;

const HeaderBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin: auto;
`;
const HeaderTitle = styled.span`
  font-size: 30px;
  display: flex;
  justify-content: center;
  border: 1px solid green;
`;

const LoginMyPage = styled.div`
  position: absolute;
  right: 0px;
  border: 1px solid red;
`;
const HeaderLogin = styled.button`
  font-size: 20px;
`;

const HeaderMyPage = styled.button`
  font-size: 20px;
  margin-left: 10px;
`;
export default Header;
