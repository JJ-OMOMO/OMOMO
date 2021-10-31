import React, { useState, useEffect, useCallback, useMemo } from "react";
import styled from "styled-components";
import Header from "../../components/header/header";
import CreateRoulette from "../../components/roulette_modal/CreateRoulette";
import ProfileModal from "../../components/profile_modal/profile";
import { dbService } from "../../service/firebase";
import GetRoulette from "../../components/roulette_modal/GetRoulette";
import { Wheel } from "react-custom-roulette";
import Arrow from "../../images/arrow.png";

const Mypage = () => {
  const [modifyProfile, setModifyProfile] = useState(false);
  const [roulette, setRoulette] = useState(false);
  const [rouletteList, setRouletteList] = useState(false);
  const [data, setData] = useState([]);
  const [onClickData, setOnClickData] = useState([]);
  const [character, setCharacter] = useState("");
  const [nickname, setNickname] = useState("");
  const [todo, setTodo] = useState([]);

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
      const rouletteObj = {
        id: doc.id,
        ...doc.data(),
      };
      result.push(rouletteObj);
      return setData(result);
    });
  }

  const onClickRoulette = async (index) => {
    const temp = [...data]
    setOnClickData(temp[index])
    await setRouletteList(true)
  }

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

  const GetTodolist = () => {
    const arr = []
    console.log("실행횟수")
    // data.forEach((e) => {
    // const result = JSON.parse(localStorage.getItem(e.id));
    // console.log(e)
    // }
    for (let i = 0; i < data.length; i++) {
      console.log('확인')

    }
    return setTodo(arr);
  }
  // const GetTodolist = async () => {
  //   const result = [];
  //   const citiesRef = dbService.collection("roulettes");
  //   const snapshot = await citiesRef
  //     .where("userId", "==", localStorage.uid)
  //     .get();

  //   if (snapshot.empty) {
  //     console.log("empty roulette");
  //     return;
  //   }

  //   snapshot.forEach((doc) => {
  //     const rouletteObj = {
  //       id: doc.id,
  //       ...doc.data(),
  //     };
  //     result.push(rouletteObj);
  //     return setTodo(result);
  //   });
  // }

  useEffect(() => {
    getRoulette();
    getProfile();
    InitialSetProfile();
    GetTodolist();
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
          <TodoList>
            투두리스트
            {todo.length > 0 ?
              todo.map((data, index) => (
                <div key={index}>
                  <h5>{data.rouletteName}</h5>
                  <p>{data.optionName}</p>
                  <span>
                    <input type="time" value={data.date} readOnly />
                    <input type="time" value={data.date} readOnly />
                  </span>
                </div>)) :
              <h1>룰렛을 돌려주세요~</h1>
            }

          </TodoList>
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
                <li key={index} onClick={() => onClickRoulette(index)}>
                  {data.rouletteName}
                  <Wheel
                    mustSpin={1}
                    prizeNumber={3}
                    data={data.optionName}
                    backgroundColors={["#ff8f43", "#70bbe0", "#0b3351", "#f9dd50"]}
                    textColors={["black"]}
                    outerBorderColor={"#eeeeee"}
                    outerBorderWidth={20}
                    innerBorderColor={"#30261a"}
                    innerBorderWidth={0}
                    innerRadius={0}
                    radiusLineColor={"#eeeeee"}
                    radiusLineWidth={10}
                    fontSize={33}
                    textDistance={60}
                  />
                </li>
              ))}
            </ul>
          </RouletteList>
        </BottomSection>
      </Container>
    </Wrapper >
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
  height: 100%;
  border: 1px solid blue;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-y: scroll;
  overflow-x: hidden;
  & > div {
    width: 100%;
    height: 20%;
    margin: 5px 5px 0px 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid red;
    & > h5 {
      width: 20%;
      margin-left: 20px;
      border: 1px solid blue;
    }
    & > p {
      font-size: 1rem;
    }
    & > span {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 5%;
      width: 40%;
      border: 1px solid green;
      & > :nth-child(1) {
        margin-right: 5px;
      }
    }

  }
`;

const BottomSection = styled.div`
  display: flex;
  justify-content: center;
  height: 50vh;
`;

const RouletteList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
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

    & > li {
    padding-bottom: 20px;
    position: relative;
    /* border: 1px solid orange; */
    width: 80%;
    height: 80%;
    font-size: 20px;
    font-weight: 500px;
    text-align: center;
    cursor: pointer;
      & > :nth-child(1) {
      width: 100%;
      height: 100%;
        & > :nth-child(2) {
          position: absolute;
          z-index: 5;
          width: 17%;
          right: 10px;
          top: 7px;
          content: url(${Arrow}); 
        }
      }
    }
  }
`;

export default Mypage;