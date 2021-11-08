import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../../components/header/header";
import CreateRoulette from "../../components/roulette_modal/CreateRoulette";
import ProfileModal from "../../components/profile_modal/profile";
import { dbService } from "../../service/firebase";
import GetRoulette from "../../components/roulette_modal/GetRoulette";
import { Wheel } from "react-custom-roulette";
import Roulette from "../../images/roulette.png";
import Swal from "sweetalert2";

const Mypage = () => {
  const [modifyProfile, setModifyProfile] = useState(false);
  const [roulette, setRoulette] = useState(false);
  const [rouletteList, setRouletteList] = useState(false);
  const [data, setData] = useState([]);
  const [onClickData, setOnClickData] = useState([]);
  const [character, setCharacter] = useState("");
  const [nickname, setNickname] = useState("");
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    getRoulette();
    getProfile();
    InitialSetProfile();
  }, []);

  const getProfile = async () => {
    const snapshot = await dbService
      .collection("profile")
      .where("userId", "==", localStorage.uid)
      .get();
    snapshot.forEach((doc) => {
      setNickname(() => doc.data().nickname);
      setCharacter(() => doc.data().character);
    });
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
      return result !== null && arr.push(result)
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
      Swal.fire({
        text: "처음이시군요. 프로필을 설정해주세요!",
        background: "#FEDB41",
        backdrop: "rgba(0,0,0,0.8)",
        confirmButtonColor: "#463400",
        icon: "info",
      });
      return;
    }
  };

  const DoneTodo = async (id) => {
    // const result = window.confirm("할 일을 끝내셨나요?!");
    const result = Swal.fire({
      text: "할 일을 끝내셨나요?!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#463400",
      cancelButtonColor: "#BF5847",
      confirmButtonText: "네",
      background: "#FEDB41",
      backdrop: "rgba(0,0,0,0.8)",
    });
    if ((await result).isConfirmed) {
      Swal.fire({
        text: "수고하셨어요! 느므 멋져요!",
        background: "#FEDB41",
        backdrop: "rgba(0,0,0,0.8)",
        confirmButtonColor: "#463400",
        icon: "success",
      });
      localStorage.removeItem(id);
      return getRoulette();
    } else {
      return Swal.fire({
        text: "조금만 힘내서 마무리 해봐요!",
        background: "#FEDB41",
        backdrop: "rgba(0,0,0,0.8)",
        confirmButtonColor: "#463400",
        icon: "info",
      });
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
      {roulette && (
        <CreateRoulette closeModal={setRoulette} getRoulette={getRoulette} />
      )}
      {rouletteList && (
        <GetRoulette
          rouletteData={onClickData}
          closeModal={setRouletteList}
          getRoulette={getRoulette}
        />
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
            {todo.length > 0 ? (
              todo.map((data, index) => (
                <div
                  key={index}
                  onClick={() => {
                    DoneTodo(data.id);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <h5>{data.rouletteName}</h5>
                  <p>{data.optionName}</p>
                  <span>
                    <input type="time" value={data.startTime} readOnly />
                    <input type="time" value={data.endTime} readOnly />
                  </span>
                </div>
              ))
            ) : (
              <h2>룰렛을 돌려주세요~</h2>
            )}
          </TodoList>
        </MainSection>
        <BottomSection>
          <RouletteList>
            <div>
              <div
                onClick={() => {
                  setRoulette(true);
                }}
              ></div>
              룰렛 생성
            </div>
            <ul>
              {data.map((data, index) => (
                <li key={index} onClick={() => onClickRoulette(index)}>
                  <div>{data.rouletteName}</div>
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
                      "#00B248",
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
  background-color: #ffc6a4;
  @media screen and (max-width: 1600px) {
    height: 120vh;
  }
`;

const Container = styled.div`
  max-width: 1600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  width: 100%;
  height: 110vh;
  margin: 0 auto;
  background-color: #bb5b3f;
  font-family: "CookieRun-Regular";
  @media screen and (max-width: 500px) {
    flex-direction: column; 
    height: 110vh;
  }
`;

const MainSection = styled.div`
  display: flex;
  height: 32vh;
  width: 80%;
  overflow: hidden;
  margin-bottom: 3vh;
  margin-top: 5vh;
  @media screen and (max-width: 500px) {
    flex-direction: column;
    height: 100%;
  }
`;
const Profile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-basis: 32%;
  margin-right: 3%;
  border: none;
  background-color: rgb(250, 250, 229);
  border-radius: 50%;
  & > input {
    height: 30px;
    width: 130px;
    border: none;
    margin-top: 5px;
    border-radius: 12px;
    font-family: "CookieRun-Regular";
    color: rgb(250, 250, 229);
    background-color: #1d1c0c !important;
  }
  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 5px;
  }
  & > div > button {
    cursor: pointer;
    width: 50px;
    height: 30px;
    border-radius: 8px;
    border: none;
    color: rgb(250, 250, 229);
    background-color: #1d1c0c !important;
    font-family: "CookieRun-Regular";
    &:hover {
      transform: scale(1.05);
    }
  }
  @media screen and (max-width: 500px) {
    margin-bottom: 5rem;
    padding: 3rem 0;
    & > input {
      height: 5rem;
      width: 20rem;
    }
    & > div {
      font-size: 4rem;
    }
    & > div > button {
      cursor: pointer;
      width: 10rem;
      height: 5rem;
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
  background-color: rgb(250, 250, 229);
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
    border-bottom: 2px solid rgb(40, 71, 64);
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
      margin-left: 1rem;
      font-size: 1.2rem;
    }
    & > p {
      text-align: center;
      width: 32%;
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
        background-color: transparent;
        border: none;
        text-align: center;
        font-size: 1rem;
      }
    }
  }
  @media screen and (max-width: 500px) {
    font-size: 3.5rem;
    padding-bottom: 2rem;
    height: 40vh;
  }
`;

const BottomSection = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 47vh;
  margin-bottom: 2vh;
  @media screen and (max-width: 500px) {
    height: 60vh;
    overflow: scroll;
    overflow-x: hidden;
    -ms-overflow-style: none;
      scrollbar-width: none;
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

const RouletteList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 80%;
  border-radius: 13px;
  margin-bottom: 20px;
  background-color: rgb(250, 250, 229);
  & > div {
    width: 20%;
    height: 100%;
    padding-left: 2%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-size: 1rem;
    @media screen and (max-width: 500px) {
      margin-left: 5rem;
      & > div {
        height: 25%;
      }
    }
    & > div {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 70%;
      height: 35%;
      cursor: pointer;
      border-radius: 50%;
      font-family: "CookieRun-Regular";
      background: url(${Roulette});
      background-size: 100% 100%;
      &:hover {
        transform: scale(1.05);
      }
    }
  }
  & > ul {
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(4, minmax(2rem, 1fr));
    height: 100%;
    width: 100%;
    align-items: center;
    list-style: none;
    overflow: hidden;
    & > li {
      padding-bottom: 1.5rem;
      position: relative;
      width: 80%;
      height: 80%;
      font-size: 1rem;
      font-weight: 600;
      text-align: center;
      cursor: pointer;
      &:hover {
        transform: scale(1.05);
      }
      & > div {
        width: 100%;
        height: 2rem;
        overflow: hidden;
      }
      & > :nth-child(2) {
        width: 100%;
        height: 100%;
        & > :nth-child(2) {
          display: none;
        }
      }
    }
    @media screen and (max-width: 1024px) {
      grid-template-columns: repeat(3, minmax(2rem, 1fr));
    }
    @media screen and (max-width: 500px) {
      grid-template-columns: repeat(2, minmax(2rem, 1fr));
    }
  }
`;

export default Mypage;
