import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Wheel from "../roulette_wheel/roulette_wheel";
import { dbService } from "../../service/firebase";

const GetRoulette = ({ closeModal, rouletteData, setRouletteList }) => {
  const [rouletteName, setRouletteName] = useState("");
  const [date, setDate] = useState("");
  const [mustSpin, setMustSpin] = useState(false);
  const [data, setData] = useState([]);
  const [test, setTest] = useState("");

  console.log(rouletteData)

  const onSubmit = async (event) => {
    // event.preventDefault();
    // closeModal(false);
    // await dbService.collection("roulettes").add({
    //   userId: localStorage.uid,
    //   rouletteName,
    //   optionName: data,
    //   date,
    // });
    // setRouletteName("");
    // setData([]);
    // setDate("");
  };

  // const docId = rouletteData.map((doc) => doc.id);
  // console.log(docId);
  // console.log(rouletteData);
  // const rouletteObj = {
  //   ...rouletteData,
  // };
  // console.log(rouletteObj);
  const onDelete = async () => {
    const ok = window.confirm("룰렛을 삭제하시겠습니까?");
    if (ok) {
      const docId = rouletteData.id;
      await dbService.doc(`roulettes/${docId}`).delete();
      await setRouletteList(false);
    }
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
    // const {
    //   target: { value },
    // } = event;
    // setRouletteName(value);
  };

  //   console.log(rouletteData.map((data) => console.log(data)));

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
              mustSpin={mustSpin}
              prizeNumber={3}
              data={rouletteData.optionName}
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
            <Bottom>
              <button onClick={() => setMustSpin(true)}>spin</button>
            </Bottom>
          </LeftSection>
          <RightSection onSubmit={onSubmit}>
            <RouletteName
              value={rouletteData.rouletteName}
              onChange={onChange}
              type="text"
              placeholder="룰렛 네임"
            ></RouletteName>

            <RouletteTime
              value={rouletteData.date}
              onChange={(e) => setDate(e.target.value)}
              type="time"
              placeholder="시간"
            ></RouletteTime>
          </RightSection>
        </RouletteModalBody>
        <RouletteButtonWrapper>
          <RoultteButton>수정하기</RoultteButton>
          <RoultteButton onClick={onDelete}>삭제하기</RoultteButton>
        </RouletteButtonWrapper>
      </RouletteModalWrapper>
    </ModalBackground>
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
`;

const RouletteModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: rgb(32, 32, 32);
`;

const RouletteHeader = styled.header`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 3rem;
  & > span {
    font-size: 2rem;
    font-weight: 700;
    color: white;
  }
`;
const ExitButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
`;

const RouletteModalBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80vw;
  height: 70vh;
  margin: 5px 0;
`;

const RouletteButtonWrapper = styled.div`
  display: flex;
`;
const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 50%;
  height: 100%;
  border: 1px solid white;
`;

const Bottom = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  & > button {
    width: 100px;
    height: 40px;
    margin: 0 10px 10px 0;
  }
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
  border: 1px solid white;
`;

const RouletteName = styled.input`
  width: 200px;
  height: 50px;
  font-size: 2rem;
  text-align: center;
`;

const RouletteTime = styled.input`
  width: 200px;
  height: 50px;
  font-size: 1.5rem;
  text-align: center;
`;

const RoultteButton = styled.button`
  bottom: 5px;
  width: 120px;
  height: 45px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
`;
export default GetRoulette;
