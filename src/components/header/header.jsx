import React, { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { Link } from "react-router-dom";
import SocialLogin from "../social_login_modal/socialLogin";
import omomo_title from "../../images/omomo_title.png";
import Swal from "sweetalert2";

const Header = ({ authService }) => {
  const history = useHistory();
  const [openModal, setOpenModal] = useState(false);

  const onLogout = () => {
    localStorage.removeItem("uid");
    history.push("/");
  };
  return (
    <Backgrond>
      {openModal && (
        <SocialLogin authService={authService} closeModal={setOpenModal} />
      )}
      <Wrapper>
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
              <HeaderMyPage
                onClick={() =>
                  Swal.fire({
                    text: "로그인이 필요한 서비스입니다.",
                    background: "#FEDB41",
                    backdrop: "rgba(0,0,0,0.8)",
                    confirmButtonColor: "#463400",
                    icon: "info",
                  })
                }
              >
                MyPage
              </HeaderMyPage>
            )}
          </LoginMyPage>
        </HeaderBox>
      </Wrapper>
    </Backgrond>
  );
};
const Backgrond = styled.div`
  width: 100%;
`

const Wrapper = styled.div`
  display: flex;
  height: 100px;
  max-width: 1600px;
  margin: 0 auto;
  @media screen and (max-width: 500px) {
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
  @media screen and (max-width: 500px) {
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
  height: 5vh;
`;
const HeaderTitle = styled.span`
  color: #f7fa1b;
  font-size: 1.875rem;
  display: flex;
  justify-content: center;
`;

const LoginMyPage = styled.div`
  position: absolute;
  right: 0;
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
  @media screen and (max-width: 500px) {
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
  @media screen and (max-width: 500px) {
    height: 30px;
    margin-right: 2px;
  }
`;
export default Header;
