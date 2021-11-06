import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { dbService } from "../../service/firebase";
import Wheel from "../roulette_wheel/roulette_wheel";
import Share from "../../images/share.png"

const CreateRoulette = ({ closeModal, getRoulette }) => {
  const [rouletteName, setRouletteName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [data, setData] = useState([]);
  const [temp, setTemp] = useState("");
  const ModalBack = useRef(null);

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

  const create = async () => {
    console.log('create')
    !temp ? alert("내용을 입력해주세요.") :
      data.length === 8 ? alert("최대 8개까지 설정가능합니다.") :
        setData([...data, { option: temp }])
    console.log(data)
    await setTemp("");
  };

  const CheckSubmit = () => {
    !rouletteName || !data || !startTime || !endTime ?
      alert("내용을 입력해주세요") :
      onSubmit();
    getRoulette();
  }

  const onSubmit = async () => {
    await dbService.collection("roulettes").add({
      userId: localStorage.uid,
      rouletteName,
      optionName: data,
      startTime,
      endTime
    });
    closeModal(false);
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setRouletteName(value);
  };

  const onClickCloseModal = (e) => {
    e.target === ModalBack.current && closeModal(false)
  };

  return (
    <ModalBackground ref={ModalBack} onClick={(e) => onClickCloseModal(e)}>
      <RouletteModalWrapper>
        <RouletteHeader>
          <span>Roulette</span>
          <ExitButton onClick={() => closeModal(false)}>X</ExitButton>
        </RouletteHeader>
        <RouletteModalBody>
          <LeftSection>
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
              <input value={temp} placeholder="목록을 작성해주세요~" onChange={(e) => setTemp(e.target.value)}></input>
              <button onClick={() => create()}>추가</button>
            </AddItem>
            <Bottom>
              <button onClick={() => reset()}>다시할래</button>
            </Bottom>
          </LeftSection>
          <RightSection>
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
        <RoultteButton onClick={CheckSubmit}>저장하기</RoultteButton>
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
      @media screen and (max-width: 414px) {
        position: absolute;
        height: 100%;
      }
      `;

const RouletteModalWrapper = styled.div`
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      background-color:rgb(250,250,231);
      border-radius: 1rem;
      font-family: "CookieRun-Regular";
      width: 80rem;
      height: 60rem;
      @media only screen and (max-width: 768px) {
      width: 55rem;
      height: 50rem;
    }
      @media only screen and (max-width: 414px) {
      width: 100%;
      height: 180rem;
    }
    `;


const RouletteHeader = styled.header`
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 10%;
  & > span {
      padding-top: 1rem;
      font-size: 4rem;
      font-weight: 700;
      color: #FFC770;
  }
  @media only screen and (max-width: 414px) {
    height: 20rem;
    & > span {
      font-size: 10rem;
      }
    }
      `;
const ExitButton = styled.button`
      position: absolute;
      top: 20%;
      right: 2%;
      font-size: 2rem;
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
    @media only screen and (max-width: 414px) {
      font-size: 4rem;
    }
      `;

const RouletteModalBody = styled.div`
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 70vh;
      margin: 1% 0;
      border-top: 5px solid #FFB896;
      border-bottom: 5px solid #FFB896;
      @media screen and (max-width: 414px) {
        flex-direction: column-reverse;
        height: 140rem;
        border: none;
      }
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
        width: 40vw;
        height: 40vw;
        & > :nth-child(2) {
          position: absolute;
          z-index: 5;
          width: 17%;
          right: 6px;
          top: 30px;
          content: url(${Share}); 
        }
  }
  @media screen and (max-width: 414px) {
        width: 100%;
        height: 70%;
        border: none;
        & > :nth-child(1) {
        width: 80vw;
        height: 80vw;
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
      height: 2.5rem;
      width: 15rem;
      font-family: "CookieRun-Regular";
      &::placeholder {
        color: #a0958a;
    }
  }
  & > button {
        width: 3.3rem;
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
  @media screen and (max-width: 414px) { 
    margin: 2rem 0;
      & > input {
        width: 45rem;
        height: 8rem;
      }
      & > button {
        width: 13rem;
        height: 8rem;
      }
    }
  `;

const Bottom = styled.div`
      margin-top: 0.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
& > button {
      width: 17rem;
      height: 3rem;
      margin: 0 10px 10px 0;
      border: none;
      font-size: 1rem;
      font-weight: 600;
      color: #FCFAE8;
      font-family: "CookieRun-Regular";
      background: #FFC770;
      border-radius: 7px;
      cursor: pointer;
      :hover {
        transform: scale(1.1);
      background:#F88F70;
    }
    @media screen and (max-width: 414px) { 
     width: 75vw;
     height: 8rem;
     margin: 0 auto;
     font-size: 3.5rem;
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
      @media screen and (max-width: 414px) { 
        width: 100%;
        height: 30%;
      }
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
  @media screen and (max-width: 414px) { 
        width: 80vw;
        height: 10rem;
        font-size: 5rem;     
        margin-botoom: 2rem;
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
      @media screen and (max-width: 414px) { 
        width: 80vw;
        height: 8rem;
      }
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
      @media screen and (max-width: 414px) { 
        width: 80%;
        height: 10rem;
        font-size: 5rem;
      }
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
  @media screen and (max-width: 414px) {
        width: 100%;
        height: 20rem;
        font-size: 8rem;
        margin-bottom: 0;
    }
      `;

export default CreateRoulette;
