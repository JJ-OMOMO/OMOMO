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
              <Link
                to="/mypage"
                style={{ textDecoration: "inherit", color: "inherit" }}
              >
                MyPage
              </Link>
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
  width: 100%;
  max-width: 1800px;
  margin: 0 auto;
  @media screen and (max-width: 414px) {
    height: 60px;
  }
`;

const HeaderLogout = styled.button`
  font-size: 1.25rem;
  font-family: "CookieRun-Regular";
  height: 40px;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 4px;
  background-color: #fdfae6;
  &:hover {
    background-color: #bb5b3f;
  }
  @media screen and (max-width: 414px) {
    height: 30px;
  }
`;

const HeaderBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: auto;
`;
const HeaderTitle = styled.span`
  color: #f7fa1b;
  font-size: 1.875rem;
  display: flex;
  justify-content: center;
`;

const LoginMyPage = styled.div`
  position: absolute;
  right: 100px;
  @media screen and (max-width: 1600px) {
    right: 0px;
  }
`;
const HeaderLogin = styled.button`
  font-size: 1.25rem;
  font-family: "CookieRun-Regular";
  height: 40px;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 4px;
  background-color: #fdfae6;
  &:hover {
    background-color: #bb5b3f;
  }
  @media screen and (max-width: 414px) {
    height: 30px;
  }
`;

const HeaderMyPage = styled.button`
  font-size: 1.25rem;
  font-family: "CookieRun-Regular";
  height: 40px;
  margin-left: 0.625rem;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 4px;
  background-color: #fdfae6;
  &:hover {
    background-color: #bb5b3f;
  }
  @media screen and (max-width: 414px) {
    height: 30px;
    margin-right: 2px;
  }
`;
export default Header;
