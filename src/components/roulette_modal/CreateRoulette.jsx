import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { dbService } from "../../service/firebase";
import Wheel from "../roulette_wheel/roulette_wheel";
import Share from "../../images/share.png"

const CreateRoulette = ({ closeModal }) => {
  const [rouletteName, setRouletteName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  //   const [mustSpin, setMustSpin] = useState(false);
  const [data, setData] = useState([]);
  const [test, setTest] = useState("");

  const initialData = [
    { option: "가" },
    { option: "나" },
    { option: "다" },
    { option: "라" },
    { option: "마" },
    { option: "바" },
  ];

  const reset = () => {
    setData([]);
  };

  const create = () => {
    data.length === 8 ? alert("stop") : setData([...data, { option: test }]);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("roulettes").add({
      userId: localStorage.uid,
      rouletteName,
      optionName: data,
      startTime,
      endTime
    });
    setRouletteName("");
    setData([]);
    setStartTime("");
    setEndTime("");
    closeModal(false);
    await window.location.reload();
  };

  // const onSubmit = async (event) => {
  //   const info = {
  //     userId: localStorage.uid,
  //     rouletteName,
  //     optionName: data,
  //     date,
  //   }
  //   event.preventDefault();
  //   closeModal(false);
  //   await dbService.collection("roulettes").doc(localStorage.uid).set(info)
  //   setRouletteName("");
  //   setData([]);
  //   setDate("");
  // };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setRouletteName(value);
  };

  return (
    <ModalBackground>
      <RouletteModalWrapper>
        <RouletteHeader>
          <span>Roulette</span>
          <ExitButton onClick={() => closeModal(false)}>X</ExitButton>
        </RouletteHeader>
        <RouletteModalBody>
          <LeftSection onSubmit={onSubmit}>
            <Wheel
              prizeNumber={3}
              data={data.length === 0 ? initialData : data}
              backgroundColors={["#F7FA1B", "#82E35B", "#00C184", "#009993", "#009557", "#00B248", "#4ECD35"]}
              textColors={["black"]}
              outerBorderColor={"#1D1C0C"}
              outerBorderWidth={5}
              innerBorderColor={"#1D1C0C"}
              innerBorderWidth={0}
              innerRadius={0}
              radiusLineColor={"#1D1C0C"}
              radiusLineWidth={5}
              fontSize={40}
              textDistance={60}
            />
            <AddItem>
              <input placeholder="목록을 작성해주세요~" onChange={(e) => setTest(e.target.value)}></input>
              <button onClick={() => create()}>추가</button>
            </AddItem>
            <Bottom>
              <button onClick={() => reset()}>다시할래</button>
            </Bottom>
          </LeftSection>
          <RightSection onSubmit={onSubmit}>
            <RouletteName
              value={rouletteName}
              onChange={onChange}
              type="text"
              placeholder="룰렛 네임"
            ></RouletteName>
            <RouletteTime>
              <span>Start Time</span>
              <input
                onChange={(e) => setStartTime(e.target.value)}
                type="time"
                placeholder="시작 시간" />
            </RouletteTime>
            <RouletteTime>
              <span>End Time</span>
              <input
                onChange={(e) => setEndTime(e.target.value)}
                type="time"
                placeholder="끝 시간" />
            </RouletteTime>
          </RightSection>
        </RouletteModalBody>
        <RoultteButton onClick={onSubmit}>저장하기</RoultteButton>
      </RouletteModalWrapper>
    </ModalBackground >
  );
};

const ModalBackground = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.8);
`;

const RouletteModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color:rgb(250,250,231);
  border-radius: 1rem;
  font-family: "CookieRun-Regular";
`;

const RouletteHeader = styled.header`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 3.5rem;
  & > span {
    padding-top: 1rem;
    font-size: 3rem;
    font-weight: 700;
    color: #FFC770;
  }
`;
const ExitButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1.3rem;
  font-weight: xx-large;
  cursor: pointer;
  background: none;
  border: none;
  color: #FFC770;
  font-family: "CookieRun-Regular";
  :hover {
      transform: scale(1.2);
      color: #F88F70;
    }
`;

const RouletteModalBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80vw;
  height: 70vh;
  margin: 1rem 0;
  border-top: 5px solid #FFB896;
  border-bottom: 5px solid #FFB896;
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 50%;
  height: 100%;
  border-right: 5px solid #FFB896;
  & > :nth-child(1) {
        width: 100%;
        height: 100%;
        & > :nth-child(2) {
          position: absolute;
          z-index: 5;
          width: 17%;
          right: 1rem;
          top: 1rem;
          content: url(${Share}); 
        }
  }
`;
const AddItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  & > input {
    color: #FCFAE8;
    text-align: center;
    background: #FFC770;
    border-radius: 1rem;
    border:none;
    margin-right: 10px;
    height: 2rem;
    width: 13rem;
    font-family: "CookieRun-Regular";
    &::placeholder {
      color: #a0958a;
    }
  }
  & > button {
    width: 3rem;
    height: 2rem;
    font-family: "CookieRun-Regular";
    border: none;
    background: #FFC770;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 600;
    color: #FCFAE8;
    :hover {
      transform: scale(1.2);
      background: #F88F70;
    }
  }
`;

const Bottom = styled.div`
  margin-top: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  & > button {
    width: 100px;
    height: 40px;
    margin: 0 10px 10px 0;
    border: none;
    font-size: 1rem;
    font-weight: 600;
    color: #FCFAE8;
    font-family: "CookieRun-Regular";
    background: #FFC770;
    border-radius: 5px;
    cursor: pointer;
    :hover {
      transform: scale(1.1);
      background:#F88F70;
    }
  }
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
`;

const RouletteName = styled.input`
  width: 20rem;
  height: 4rem;
  font-size: 2rem;
  text-align: center;
  margin-bottom: 3rem;
  background: #FFC770;
  border: none;
  color: #FCFAE8;
  border-radius: 1rem;
  font-family: "CookieRun-Regular";
  font-weight: 800;
  &::placeholder {
    color: #a0958a;
  }
`;
const RouletteTime = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20rem;
  height: 3rem;
  margin-bottom: 1rem;
  background: #FFC770;
  border-radius: 1rem;
  font-family: "CookieRun-Regular";
  & > span {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30%;
    font-size: 1rem;
    color: black;
  }
  & > input {
    font-family: "CookieRun-Regular";
    width: 60%;
    color: #FCFAE8;
    text-align: center;
    font-size: 1.5rem;
    border: none;
    background-color: transparent;
  }
  & > input[type=time]::-webkit-calendar-picker-indicator {
    cursor: pointer;
    :hover {
      transform: scale(1.2);
    }
}
  
`;

const RoultteButton = styled.button`
  margin-bottom: 1rem;
  width: 120px;
  height: 45px;
  font-size: 1.5rem;
  font-weight: 700;
  cursor: pointer;
  background: #FFC770;
  border: none;
  border-radius: 5px;
  color: #FCFAE8;
  &:hover {
    transform: scale(1.1);
    background-color: #F88F70;
  }
`;

export default CreateRoulette;
