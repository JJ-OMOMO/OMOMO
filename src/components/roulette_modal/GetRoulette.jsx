import React, { useState } from "react";
import styled from "styled-components";
import Wheel from "../roulette_wheel/roulette_wheel";
import { dbService } from "../../service/firebase";

const GetRoulette = ({ closeModal, rouletteData, setRouletteList }) => {
  const [mustSpin, setMustSpin] = useState(false);
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(false);
  const [newRouletteName, setNewRouletteName] = useState(
    rouletteData.rouletteName
  );
  const [newDate, setNewDate] = useState(rouletteData.date);
  const [newOptionName, setNewOptionName] = useState(rouletteData.optionName);

  // console.log(data, rouletteData.optionName);

  const onDelete = async () => {
    const ok = window.confirm("룰렛을 삭제하시겠습니까?");
    if (ok) {
      const docId = rouletteData.id;
      await dbService.doc(`roulettes/${docId}`).delete();
      await setRouletteList(false);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    // console.log(rouletteData, newRouletteName);
    const docId = rouletteData.id;

    if (data.length === 0) {
      await dbService.doc(`roulettes/${docId}`).update({
        rouletteName: newRouletteName,
        optionName: rouletteData.optionName, // 룰렛optionName이 수정되지 않았을 경우에는 기존 optionName데이터가 저장되어야 함
        date: newDate,
      });
    } else {
      await dbService.doc(`roulettes/${docId}`).update({
        rouletteName: newRouletteName,
        optionName: data,
        date: newDate,
      });
    }
    // await setEdit(false);
    await closeModal(false);
    await window.location.reload();
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewRouletteName(value);
  };

  const reset = () => {
    setData([]);
  };

  const create = () => {
    data.length === 8
      ? alert("stop")
      : setData([...data, { option: newOptionName }]);
  };

  return (
    <ModalBackground>
      <RouletteModalWrapper>
        <RouletteHeader>
          <span>Roulette</span>
          <ExitButton onClick={() => closeModal(false)}>X</ExitButton>
        </RouletteHeader>
        <RouletteModalBody>
          <LeftSection>
            <Wheel
              onSubmit={onSubmit}
              mustSpin={mustSpin}
              prizeNumber={3}
              data={data.length === 0 ? rouletteData.optionName : data}
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
            {edit && (
              <AddItem>
                <input
                  onChange={(e) => setNewOptionName(e.target.value)}
                ></input>
                <button onClick={() => create()}>추가</button>
              </AddItem>
            )}
            <Bottom>
              {edit ? (
                <button onClick={() => reset()}>reset</button>
              ) : (
                <button onClick={() => setMustSpin(true)}>spin</button>
              )}
            </Bottom>
          </LeftSection>
          <RightSection onSubmit={onSubmit}>
            {edit ? (
              <RouletteName
                defaultValue={newRouletteName}
                onChange={onChange}
                type="text"
                placeholder="룰렛 네임"
              ></RouletteName>
            ) : (
              <RouletteName
                value={rouletteData.rouletteName}
                readOnly
                type="text"
                placeholder="룰렛 네임"
              ></RouletteName>
            )}

            {edit ? (
              <RouletteTime
                defaultValue={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                type="time"
                placeholder="시간"
              ></RouletteTime>
            ) : (
              <RouletteTime
                value={rouletteData.date}
                readOnly
                type="time"
                placeholder="시간"
              ></RouletteTime>
            )}
          </RightSection>
        </RouletteModalBody>
        <RouletteButtonWrapper>
          {edit ? (
            <RoultteButton onClick={onSubmit}>저장하기</RoultteButton>
          ) : (
            <>
              <RoultteButton onClick={() => setEdit(true)}>
                수정하기
              </RoultteButton>
              <RoultteButton onClick={onDelete}>삭제하기</RoultteButton>
            </>
          )}
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
  z-index: 1000;
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

const AddItem = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  & > input {
    margin-right: 10px;
    width: 100px;
  }
  & > button {
    width: 40px;
  }
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
