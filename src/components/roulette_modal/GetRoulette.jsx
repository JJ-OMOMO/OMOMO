import React, { useState, useRef } from "react";
import styled from "styled-components";
import Wheel from "../roulette_wheel/roulette_wheel";
import { dbService } from "../../service/firebase";
import Share from "../../images/share.png";
import Swal from "sweetalert2";

const GetRoulette = ({ closeModal, rouletteData, getRoulette }) => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(false);
  const [newRouletteName, setNewRouletteName] = useState(
    rouletteData.rouletteName
  );
  const [newSartTime, setNewSartTime] = useState(rouletteData.startTime);
  const [newEndTime, setNewEndTime] = useState(rouletteData.endTime);
  // const [newOptionName, setNewOptionName] = useState(rouletteData.optionName);
  const [newOptionName, setNewOptionName] = useState("");
  const ModalBack = useRef(null);

  const onDelete = async () => {
    const ok = Swal.fire({
      text: "룰렛을 삭제하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#463400",
      cancelButtonColor: "#BF5847",
      confirmButtonText: "네",
      cancelButtonText: "아니오",
      background: "#FEDB41",
      backdrop: "rgba(0,0,0,0.8)",
    });
    if ((await ok).isConfirmed) {
      const docId = rouletteData.id;
      await dbService.doc(`roulettes/${docId}`).delete();
      await getRoulette();
      await closeModal(false);
      await window.location.reload();
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const docId = rouletteData.id;

    if (data.length === 0) {
      await dbService.doc(`roulettes/${docId}`).update({
        rouletteName: newRouletteName,
        optionName: rouletteData.optionName, // 룰렛optionName이 수정되지 않았을 경우에는 기존 optionName데이터가 저장되어야 함
        startTime: newSartTime,
        endTime: newEndTime,
      });
    } else {
      await dbService.doc(`roulettes/${docId}`).update({
        rouletteName: newRouletteName,
        optionName: data,
        startTime: newSartTime,
        endTime: newEndTime,
      });
    }
    await getRoulette();
    await closeModal(false);
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
    !newOptionName
      ? Swal.fire({
          text: "내용을 입력해주세요",
          background: "#FEDB41",
          backdrop: "rgba(0,0,0,0.8)",
          confirmButtonColor: "#463400",
          icon: "info",
        })
      : data.length === 8
      ? Swal.fire({
          text: "최대 8개까지 설정가능합니다.",
          background: "#FEDB41",
          backdrop: "rgba(0,0,0,0.8)",
          confirmButtonColor: "#463400",
          icon: "info",
        })
      : setData([...data, { option: newOptionName }]);
    setNewOptionName("");
  };

  const handleSpinClick = async () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  const onClickCloseModal = (e) => {
    e.target === ModalBack.current && closeModal(false);
  };

  return (
    <ModalBackground ref={ModalBack} onClick={(e) => onClickCloseModal(e)}>
      <RouletteModalWrapper>
        <RouletteHeader>
          <span>Roulette</span>
          <ExitButton onClick={() => closeModal(false)}>
            <i className="fas fa-times"></i>
          </ExitButton>
        </RouletteHeader>
        <RouletteModalBody>
          <LeftSection>
            <Wheel
              getRoulette={getRoulette}
              closeModal={closeModal}
              onSubmit={onSubmit}
              mustSpin={mustSpin}
              setMustSpin={setMustSpin}
              rouletteData={rouletteData}
              prizeNumber={prizeNumber}
              data={data.length === 0 ? rouletteData.optionName : data}
              backgroundColors={[
                "#F7FA1B",
                "#82E35B",
                "#00C184",
                "#009993",
                "#009557",
                "#00B248",
                "#4ECD35",
              ]}
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
            {edit && (
              <AddItem>
                <input
                  value={newOptionName}
                  onChange={(e) => setNewOptionName(e.target.value)}
                ></input>
                <button onClick={() => create()}>추가</button>
              </AddItem>
            )}
            <Bottom>
              {edit ? (
                <button onClick={() => reset()}>다시할래</button>
              ) : (
                <>
                  <button onClick={handleSpinClick}>돌려봐</button>
                </>
              )}
            </Bottom>
          </LeftSection>
          <RightSection onSubmit={onSubmit}>
            {edit ? (
              <RouletteName
                defaultValue={newRouletteName || ""}
                onChange={onChange}
                type="text"
                placeholder="룰렛 네임"
              ></RouletteName>
            ) : (
              <RouletteName
                defaultValue={rouletteData.rouletteName || ""}
                readOnly
                type="text"
                placeholder="룰렛 네임"
              ></RouletteName>
            )}

            {edit ? (
              <RouletteTime>
                <span>Start Time</span>
                <input
                  defaultValue={newSartTime || ""}
                  onChange={(e) => setNewSartTime(e.target.value)}
                  type="time"
                  placeholder="시작 시간"
                />
              </RouletteTime>
            ) : (
              <RouletteTime>
                <span>Start Time</span>
                <input
                  defaultValue={rouletteData.startTime || ""}
                  readOnly
                  type="time"
                  placeholder="시작 시간"
                />
              </RouletteTime>
            )}
            {edit ? (
              <RouletteTime>
                <span>End Time</span>
                <input
                  defaultValue={newEndTime || ""}
                  onChange={(e) => setNewEndTime(e.target.value)}
                  type="time"
                  placeholder="끝 시간"
                />
              </RouletteTime>
            ) : (
              <RouletteTime>
                <span>End Time</span>
                <input
                  defaultValue={rouletteData.endTime || ""}
                  readOnly
                  type="time"
                  placeholder="끝 시간"
                />
              </RouletteTime>
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
  background-color: rgba(0, 0, 0, 0.8);
  @media screen and (max-width: 414px) {
    position: absolute;
    height: 180rem;
  }
`;

const RouletteModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: rgb(250, 250, 231);
  border-radius: 1rem;
  font-family: "CookieRun-Regular";
  // width: 80rem;
  width: 100%;
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
    color: #ffc770;
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
  top: 10%;
  right: 1%;
  font-size: 3rem;
  font-weight: xx-large;
  cursor: pointer;
  background: none;
  border: none;
  color: #ffc770;
  font-family: "CookieRun-Regular";
  :hover {
    transform: scale(1.2);
    color: #f88f70;
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
  border-top: 5px solid #ffb896;
  border-bottom: 5px solid #ffb896;
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
  border-right: 5px solid #ffb896;
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
    color: #fcfae8;
    text-align: center;
    background: #ffc770;
    border-radius: 1rem;
    border: none;
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
    background: #ffc770;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 600;
    color: #fcfae8;
    :hover {
      transform: scale(1.2);
      background: #f88f70;
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
    color: #fcfae8;
    font-family: "CookieRun-Regular";
    background: #ffc770;
    border-radius: 7px;
    cursor: pointer;
    :hover {
      transform: scale(1.1);
      background: #f88f70;
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
  background: #ffc770;
  border: none;
  color: #fcfae8;
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
  background: #ffc770;
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
    color: #fcfae8;
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
  & > input[type="time"]::-webkit-calendar-picker-indicator {
    cursor: pointer;
    :hover {
      transform: scale(1.2);
    }
  }
`;
const RouletteButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 414px) {
    width: 100%;
    height: 18rem;
  }
`;
const RoultteButton = styled.button`
  font-family: "CookieRun-Regular";
  margin: 0 0.5rem 1rem 0.5rem;
  width: 120px;
  height: 45px;
  font-size: 1.5rem;
  font-weight: 700;
  cursor: pointer;
  background: #ffc770;
  border: none;
  border-radius: 5px;
  color: #fcfae8;
  &:hover {
    transform: scale(1.1);
    background-color: #f88f70;
  }
  @media screen and (max-width: 414px) {
    font-size: 3.5rem;
    width: 100%;
    height: 100%;
    margin: 0 0.5rem 0 0.5rem;
  }
`;

export default GetRoulette;
