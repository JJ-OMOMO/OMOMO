import React, { useState, useEffect, useCallback, useMemo } from "react";
import styled from "styled-components";
import Header from "../../components/header/header";
import CreateRoulette from "../../components/roulette_modal/CreateRoulette";
import ProfileModal from "../../components/profile_modal/profile";
import { dbService } from "../../service/firebase";
import GetRoulette from "../../components/roulette_modal/GetRoulette";
import { Wheel } from "react-custom-roulette";
import Roulette from "../../images/roulette.png";
import Share from "../../images/share.png";

const Mypage = () => {
  const [modifyProfile, setModifyProfile] = useState(false);
  const [roulette, setRoulette] = useState(false);
  const [rouletteList, setRouletteList] = useState(false);
  const [data, setData] = useState([]);
  const [onClickData, setOnClickData] = useState([]);
  const [character, setCharacter] = useState("");
  const [nickname, setNickname] = useState("");
  const [todo, setTodo] = useState([]);

  useEffect(async () => {
    await getRoulette();
    await getProfile();
    await InitialSetProfile();
  }, []);

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
    const arr = [];
    const citiesRef = dbService.collection("roulettes");
    const snapshot = await citiesRef
      .where("userId", "==", localStorage.uid)
      .get();
    if (snapshot.empty) {
      console.log("empty roulette");
      return;
    }
    snapshot.forEach((doc) => {
      const rouletteObj = {
        id: doc.id,
        ...doc.data(),
      };
      result.push(rouletteObj);
    });
    // TO-DO list 목록 보기
    result.map((e) => {
      const result = JSON.parse(localStorage.getItem(e.id));
      result !== null ? arr.push(result) : console.log("패스");
    });
    setTodo(arr);
    setData(result);
  };

  const onClickRoulette = async (index) => {
    const temp = [...data];
    setOnClickData(temp[index]);
    await setRouletteList(true);
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
        <GetRoulette rouletteData={onClickData} closeModal={setRouletteList} />
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
                width="140px"
                height="140px"
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
          <TodoList>
            <h3>오늘은 모하지??</h3>
            {
              todo.length > 0 ?
                todo.map((data, index) => (
                  <div key={index} onClick={() => { console.log('확인') }} style={{ cursor: "pointer" }}>
                    <h5>{data.rouletteName}</h5>
                    <p>{data.optionName}</p>
                    <span>
                      <input type="time" value={data.startTime} readOnly />
                      <input type="time" value={data.endTime} readOnly />
                    </span>
                  </div>
                ))
                : (
                  <h1>룰렛을 돌려주세요~</h1>
                )
            }
          </TodoList >
        </MainSection >
        <BottomSection>
          <RouletteList>
            <div>
              <div
                onClick={() => {
                  setRoulette(true);
                }}
              >
              </div>
              룰렛 생성하기
            </div>
            <ul>
              {data.map((data, index) => (
                <li key={index} onClick={() => onClickRoulette(index)}>
                  {data.rouletteName}
                  <Wheel
                    mustSpin={1}
                    prizeNumber={3}
                    data={data.optionName}
                    backgroundColors={[
                      "#F7FA1B",
                      "#82E35B",
                      "#00C184",
                      "#009993",
                      "#F7FA1B",
                      "#A7E520",
                      "#4ECD35",
                      "#00B248"
                    ]}
                    textColors={["black"]}
                    outerBorderColor={"rgb(40,71,64)"}
                    outerBorderWidth={10}
                    innerBorderColor={"rgb(40,71,64)"}
                    innerBorderWidth={0}
                    innerRadius={0}
                    radiusLineColor={"rgb(40,71,64)"}
                    radiusLineWidth={10}
                    fontSize={33}
                    textDistance={60}
                  />
                </li>
              ))}
            </ul>
          </RouletteList>
        </BottomSection>
      </Container >
    </Wrapper >
  );
};
const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #FFC6A4;
  overflow: hidden;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  width: 80%;
  height: 90vh;
  margin: 0 auto;
  background-color: #BB5B3F;
  font-family: "CookieRun-Regular";
`;


const MainSection = styled.div`
  display: flex;
  height: 37vh;
  width: 80%;
  overflow: hidden;
  margin-bottom: 3vh;
  margin-top: 5vh;
`;
const Profile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-basis: 32%;
  margin-right: 3%;
  border: none;
  background-color: rgb(250,250,229);
  border-radius: 50%;
  & > input {
    height: 30px;
    width: 130px;
    border: none;
    border-radius: 12px;
    font-family: "CookieRun-Regular";
    color: rgb(250,250,229);
    background-color: #1D1C0C !important;
  }
  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & > div > button {
    cursor: pointer;
    width: 50px;
    height: 30px;
    border-radius: 8px;
    border: none;
    color: rgb(250,250,229);
    background-color: #1D1C0C !important;
    font-family: "CookieRun-Regular";
    &:hover {
      transform: scale(1.05);
    }
  }
`;

const TodoList = styled.div`
  flex-basis: 65%;
  height: 95%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: rgb(250,250,229);
  overflow-y: scroll;
  overflow-x: hidden;
  -ms-overflow-style: none;
    scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
}
  & > h3 {
    height: 3rem;
  }
  & > div {
    border-bottom:2px solid rgb(40,71,64);
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    &:hover {
      transform: scale(1.02);
    }
    & > h5 {
      text-align: center;
      width: 20%;
      margin-left: 20px;
      font-size: 1.5rem;
    }
    & > p {
      text-align: center;
      width: 52%;
      font-size: 1.3rem;
      margin: 0 1.5%;
    }
    & > span {
      width: 25%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      & > input {
        font-family: "CookieRun-Regular";
        background-color:transparent;
        border: none;
        text-align: center;
        font-size: 1rem;
      }
    }
  }
`;

const BottomSection = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 53vh;
  margin-bottom: 2vh;
`;

const RouletteList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 80%;
  border-radius: 13px;
  margin-bottom: 20px;
  background-color:rgb(250,250,229);
  & > div {
    width: 20%;
    height: 100%;
    padding-left: 2%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-size: 1rem;
      & > div {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 70%;
      height: 35%;
      cursor: pointer;
      border-radius: 50%;
      font-family: "CookieRun-Regular";
      background:url(${Roulette});
      background-size: 100% 100%;
      &:hover {
      transform: scale(1.05);
      }
    }
  }
  & > ul {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(5, minmax(100px, 1fr));
    height: 100%;
    width: 100%;
    align-items: center;
    list-style: none;
    overflow: hidden;

    & > li {
    padding-bottom: 20px;
    position: relative;
    width: 80%;
    height: 80%;
    font-size: 20px;
    font-weight: 500px;
    text-align: center;
    cursor: pointer;
    &:hover {
      transform: scale(1.05);
    }
      & > :nth-child(1) {
        width: 100%;
        height: 100%;
        & > :nth-child(2) {
          position: absolute;
          z-index: 5;
          width: 25%;
          right: 20px;
          top: 8px;
          content: url(${Share}); 
        }
      }
    }
  }
`;

export default Mypage;
