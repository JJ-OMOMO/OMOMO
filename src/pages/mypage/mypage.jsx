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
  const [character, setCharacter] = useState("");
  const [nickname, setNickname] = useState("");

  const getProfile = async () => {
    const tempNick = [];
    const tempChar = [];
    const snapshot = await dbService
      .collection("profile")
      .where("userId", "==", localStorage.uid)
      .get();
    snapshot.forEach((doc) => {
      tempNick.push(doc.data().nickname);
      tempChar.push(doc.data().character);
    });
    return setCharacter(tempChar), setNickname(tempNick);
  };

  const getRoulette = async () => {
    const result = [];
    const citiesRef = dbService.collection("roulettes");
    const snapshot = await citiesRef
      .where("userId", "==", localStorage.uid)
      .get();

    if (snapshot.empty) {
      console.log("empty roulette");
      return;
    }
    snapshot.forEach((doc) => {
      // result.push(doc.data());
      const rouletteObj = {
        id: doc.id,
        ...doc.data(),
      };
      return setData((prev) => [rouletteObj, ...prev]);
    });
  };

  const InitialSetProfile = async () => {
    const citiesRef = dbService.collection("profile");
    const snapshot = await citiesRef
      .where("userId", "==", localStorage.uid)
      .get();

    if (snapshot.empty) {
      setModifyProfile(true);
      alert("처음이시군요 프로필을 설정해주세요");
      return;
    }
  };

  useEffect(() => {
    getRoulette();
    getProfile();
    InitialSetProfile();
  }, []);

  return (
    <Wrapper>
      <Header />
      {modifyProfile && (
        <ProfileModal
          Char={character}
          setChar={setCharacter}
          Nick={nickname}
          setNick={setNickname}
          closeModal={setModifyProfile}
        />
      )}
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
            {character.length < 1 ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "150px",
                  height: "150px",
                  border: "1px solid black",
                  fontSize: "16px",
                }}
              >
                프로필 사진 없음
              </div>
            ) : (
              <img
                src={character}
                alt="프로필 사진"
                width="150px"
                height="150px"
              />
            )}
            {nickname.length < 1 ? (
              <input
                tpye="text"
                value={"닉네임을 설정해주세요"}
                style={{ textAlign: "center" }}
                readOnly
              ></input>
            ) : (
              <input
                tpye="text"
                value={nickname}
                style={{ textAlign: "center" }}
                readOnly
              ></input>
            )}
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
                  {data.id}
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
