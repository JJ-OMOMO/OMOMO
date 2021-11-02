import React, { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { Link } from "react-router-dom";
import SocialLogin from "../social_login_modal/socialLogin";
import omomo_title from "../../images/omomo_title.png";

const Header = ({ authService }) => {
  const history = useHistory();
  const [openModal, setOpenModal] = useState(false);

  const onLogout = () => {
    localStorage.removeItem("uid");
    history.push("/");
  };
  return (
    <Wrapper>
      {openModal && (
        <SocialLogin authService={authService} closeModal={setOpenModal} />
      )}
      <HeaderBox>
        <HeaderTitle>
          <Link to="/">
            <img
              src={omomo_title}
              alt="header_title"
              width="200px"
              height="50px"
            />
          </Link>
        </HeaderTitle>
        <LoginMyPage>
          {localStorage.uid ? (
            <HeaderLogout onClick={onLogout}>Logout</HeaderLogout>
          ) : (
            <HeaderLogin onClick={() => setOpenModal(true)}>Login</HeaderLogin>
          )}
          {localStorage.uid ? (
            <HeaderMyPage>
              <Link to="/mypage">MyPage</Link>
            </HeaderMyPage>
          ) : (
            <HeaderMyPage onClick={() => alert("로그인 먼저 해주세요")}>
              MyPage
            </HeaderMyPage>
          )}
        </LoginMyPage>
      </HeaderBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100px;
`;

const HeaderLogout = styled.button`
  font-size: 20px;
  font-family: "CookieRun-Regular";
  height: 40px;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 4px;
  background-color: #fdfae6;
  &:hover {
    background-color: #bb5b3f;
  }
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
  color: #f7fa1b;
  font-size: 30px;
  display: flex;
  justify-content: center;
`;

const LoginMyPage = styled.div`
  position: absolute;
  right: 0px;
`;
const HeaderLogin = styled.button`
  font-size: 20px;
  font-family: "CookieRun-Regular";
  height: 40px;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 4px;
  background-color: #fdfae6;
  &:hover {
    background-color: #bb5b3f;
  }
`;

const HeaderMyPage = styled.button`
  font-size: 20px;
  font-family: "CookieRun-Regular";
  height: 40px;
  margin-left: 10px;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 4px;
  background-color: #fdfae6;
  &:hover {
    background-color: #bb5b3f;
  }
`;
export default Header;
