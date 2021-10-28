import React, { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { Link } from "react-router-dom";
import SocialLogin from "../social_login_modal/socialLogin";

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
          <Link to="/">오모오모</Link>
        </HeaderTitle>
        <LoginMyPage>
          {localStorage.uid ? (
            <HeaderLogout onClick={onLogout}>Logout</HeaderLogout>
          ) : (
            <HeaderLogin onClick={() => setOpenModal(true)}>Login</HeaderLogin>
          )}
          {localStorage.uid ?
            <HeaderMyPage>
              <Link to="/mypage">MyPage</Link>
            </HeaderMyPage>
            :
            <HeaderMyPage onClick={() => alert('로그인 먼저 해주세요')}>MyPage</HeaderMyPage>
          }

        </LoginMyPage>
      </HeaderBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100px;
  border: 1px solid blue;
`;

const HeaderLogout = styled.button`
  font-size: 20px;
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
