import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../../components/header/header";
import OMO from "../../images/OMO.png";
import CreateRoulette from "../../components/roulette_modal/CreateRoulette";
import ProfileModal from "../../components/profile_modal/profile";
import { dbService } from "../../service/firebase";
import GetRoulette from "../../components/roulette_modal/GetRoulette";

const Mypage = () => {
  const [modifyProfile, setModifyProfile] = useState(false);
  const [roulette, setRoulette] = useState(false);
  const [rouletteList, setRouletteList] = useState(false);
  const [data, setData] = useState([]);

  const getRoulette = async () => {
    const result = [];
    const citiesRef = dbService.collection("roulettes");
    const snapshot = await citiesRef
      .where("userId", "==", localStorage.uid)
      .get();

    if (snapshot.empty) {
      console.log("No matching documents.");
      return;
    }
    snapshot.forEach((doc) => {
      result.push(doc.data());
    });
    return setData(result);
  };

  useEffect(() => {
    getRoulette();
  }, []);

  return (
    <Wrapper>
      <Header />
      {modifyProfile && <ProfileModal closeModal={setModifyProfile} />}
      {roulette && <CreateRoulette closeModal={setRoulette} />}
      {rouletteList && (
        <GetRoulette rouletteData={data} closeModal={setRouletteList} />
      )}
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
            <button
              onClick={() => {
                setRoulette(true);
              }}
            >
              룰렛 추가
            </button>
            <ul>
              {data.map((data, index) => (
                <li key={index} onClick={() => setRouletteList(true)}>
                  {data.rouletteName}
                </li>
              ))}
            </ul>
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
  align-items: center;
  justify-content: center;
  height: 40vh;
  width: 80%;
  border: 1px solid green;
  & > button {
    width: 200px;
    height: 100px;
    cursor: pointer;
  }
  & > ul {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(5, minmax(100px, 1fr));
    height: 100%;
    width: 100%;
    border: 1px solid red;
    align-items: center;
    list-style: none;
    overflow: hidden;
  }
  & > ul > li {
    border: 1px solid orange;
    width: 80%;
    height: 80%;
    font-size: 30px;
    font-weight: 500px;
    text-align: center;
    cursor: pointer;
  }
`;

export default Mypage;
