import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../../components/header/header";
import OMO from "../../images/OMO.png"
import Roulette from "../../components/roulette_modal/roulette";
import ProfileModal from "../../components/profile_modal/profile";

const Mypage = (props) => {
  const [modifyProfile, setModifyProfile] = useState(false);
  const [createRoulette, setCreateRoulette] = useState(false);

  useEffect(() => {
    console.log(localStorage.getItem("uid"))
  }, []);

  return (
    <Wrapper>
      <Header />
      {modifyProfile && <ProfileModal closeModal={setModifyProfile} />}
      {createRoulette && <Roulette closeModal={setCreateRoulette} />}
      <Container>
        <MainSection>
          <Profile>
            <div>
              <span>프로필</span>
              &nbsp;
              <button onClick={() => setModifyProfile(true)}>수정</button>
            </div>
            <img src={OMO} alt="프로필 사진" width="200px" height="200px" />
            <input tpye="text" value="닉네임" readOnly></input>
          </Profile>
          <TodoList>투두 리스트</TodoList>
        </MainSection>
        <BottomSection>
          <RouletteList>
            <button onClick={() => { setCreateRoulette(true) }}>룰렛 추가</button>
            <div>룰렛 리스트</div>
          </RouletteList>
        </BottomSection>

      </Container>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* border: 1px solid red; */
`;

const Container = styled.div`
  font-size: 30px;
  /* border: 5px solid black; */
`;

const MainSection = styled.div`
  display: flex;
  justify-content: center;
  height: 40vh;
`;
const Profile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-basis: 40%;
  border: 1px solid blue;
  & > input {
    margin-top: 20px;
    width: 200px;
  }
  & > div > button {
    cursor: pointer;
  }
`;

const TodoList = styled.div`
  flex-basis: 40%;
  border: 1px solid blue;
`;

const BottomSection = styled.div`
  display: flex;
  justify-content: center;
`;

const RouletteList = styled.div`
  display: flex;
  height: 40vh;
  width: 80%;
  border: 2px solid red;
  & > button {
      margin-top: 5%;
      width: 200px;
      height: 100px;
      cursor: pointer;
  }
  & > div {
    display: flex;
    height: 100%;
    width: 100%;
    border: 1px solid red;
    align-items: center;
    justify-content: center;
  }
`;

export default Mypage;
