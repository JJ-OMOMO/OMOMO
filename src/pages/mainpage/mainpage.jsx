import React, { useState } from "react";
import styled from "styled-components";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import Wheel from "../../components/roulette_wheel/roulette_wheel";
import { useLocation } from "react-router";
import avatar1 from "../../images/avatar1.png";
import avatar2 from "../../images/avatar2.png";
import avatar3 from "../../images/avatar3.png";
import avatar4 from "../../images/avatar4.png";
import RedShare from "../../images/red-share.png";
import Swal from "sweetalert2";

const initialData = [
  { option: "모" },
  { option: "하" },
  { option: "지" },
  { option: "오" },
  { option: "늘" },
  { option: "은" },
];

const Mainpage = ({ authService }) => {
  const location = useLocation();
  const userId = location.state;
  const [mustSpin, setMustSpin] = useState(false);
  const [data, setData] = useState([]);
  const [test, setTest] = useState("");
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = async () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  const reset = () => {
    setData([]);
  };

  const create = () => {
    !test
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
        : setData([...data, { option: test }]);
    setTest("");
  };
  // console.log("MAINDATA", data);
  return (
    <Wrapper>
      <Header authService={authService} userId={userId} />
      <Container>
        <TrialRoulette>
          <TrialRouletteIntro>나만의 룰렛을 만들어보세요.</TrialRouletteIntro>
          <Wheel
            mustSpin={mustSpin}
            prizeNumber={prizeNumber}
            data={data.length === 0 ? initialData : data}
            backgroundColors={["#ff8f43", "#C0BC83", "#F7F2CB", "#F7FA1B"]}
            textColors={["black"]}
            outerBorderColor={"005248"}
            innerBorderColor={"#30261a"}
            innerBorderWidth={0}
            innerRadius={0}
            radiusLineColor={"#005248"}
            fontSize={33}
            textDistance={60}
          />
          <AddItem>
            <input
              value={test}
              onChange={(e) => setTest(e.target.value)}
              placeholder="OMOMO"
            ></input>
            <button onClick={() => create()}>추가</button>
          </AddItem>
          <Bottom>
            <button onClick={() => reset()}>다시할래</button>
            <button onClick={() => handleSpinClick()}>돌려봐</button>
          </Bottom>
        </TrialRoulette>
        <RouletteDescription>
          <DescriptionWrapper>
            <Avatar>
              <img src={avatar1} alt="avatar1" width="100%" height="100%" />
            </Avatar>
            <DescriptionBubbleLeft>
              <BubbleTitle color="#ff2132"> 오늘은 모하지? </BubbleTitle>
              공부도 해야되고, 운동도 해야되는데... <br />
              공부는 뭘 하지? 운동은 또 뭘 하고? <br />
              나는 매번 뭐할지 고민만 하다 시간이 다 가.
            </DescriptionBubbleLeft>
          </DescriptionWrapper>
          <DescriptionWrapper>
            <DescriptionBubbleRight>
              <BubbleTitle color="#4b39b5">오늘은 모먹지? </BubbleTitle>
              피자? 햄버거? 치킨? 쌀국수? <br />
              메뉴 정하는 건 너무 어려워. 누가 좀 정해줬으면~
            </DescriptionBubbleRight>
            <Avatar>
              <img src={avatar2} alt="avatar2" width="100%" height="100%" />
            </Avatar>
          </DescriptionWrapper>
          <DescriptionWrapper>
            <Avatar>
              <img src={avatar3} alt="avatar3" width="100%" height="100%" />
            </Avatar>
            <DescriptionBubbleLeft>
              <BubbleTitle color="#ffb010">이번 주말에 어디갈까? </BubbleTitle>
              부산? 경주? 전주? 제주도? <br />
              여행지는 왜 이리 많은지...
            </DescriptionBubbleLeft>
          </DescriptionWrapper>
          <DescriptionWrapper>
            <DescriptionBubbleRight>
              <BubbleTitle color="#24b29f">무슨 게임하고 놀까? </BubbleTitle>
              동물의 숲? 심즈? 어몽어스?
              <br />
              아님 요즘 핫하다는 엑시인피니티? 선택이 어려워~
            </DescriptionBubbleRight>
            <Avatar>
              <img src={avatar4} alt="avatar4" width="100%" height="100%" />
            </Avatar>
          </DescriptionWrapper>
          <RouletteDescriptionIntro>
            선택의 기로에 놓인 당신... <br />
            오모오모가 당신의 선택을 도와드립니다. <br />
            무엇이든 적고 돌리기만 하면 OK~
          </RouletteDescriptionIntro>
        </RouletteDescription>
      </Container>
      <Footer />
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
  @media screen and (max-width: 1024px) {
    height: 100%;
  }
`;

const Container = styled.div`
  max-width: 1600px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex: 1;
  font-size: 30px;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const TrialRoulette = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-basis: 50%;
  padding-top: 10px;
  background-color: #f88f70;
  & > :nth-child(2) > :nth-child(2) {
    content: url(${RedShare});
    z-index: 5;
    width: 17%;
    right: 6px;
    top: 30px;
  }
`;

const TrialRouletteIntro = styled.div`
  font-family: "CookieRun-Regular";
  padding-bottom: 20px;

  @media screen and (max-width: 1024px) {
    font-size: 1.8rem;
    padding-top: 0.5rem;
    padding-bottom: 1rem;
  }
  @media screen and (max-width: 500px) {
    font-size: 4rem;
    padding-top: 0.5rem;
    padding-bottom: 1rem;
  }
`;

const AddItem = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  & > input {
    text-align: center;
    margin-right: 10px;
    width: 100px;
    height: 30px;
    border: 1px solid transparent;
    border-radius: 4px;
    font-family: "CookieRun-Regular";
    r &::placeholder {
      color: #a0958a;
    }
    @media screen and (max-width: 1024px) {
      margin-top: -0.8rem;
      height: 30px;
      font-size: 1.2rem;
    }
  }
  & > button {
    width: 40px;
    height: 100%;
    cursor: pointer;
    font-family: "CookieRun-Regular";
    border: 1px solid transparent;
    border-radius: 4px;
    background-color: #fdfae6;
    @media screen and (max-width: 1024px) {
      margin-top: -0.8rem;
      width: 50px;
      height: 30px;
      font-size: 1.2rem;
    }
  }
`;

const Bottom = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  & > button {
    width: 80px;
    height: 35px;
    cursor: pointer;
    font-family: "CookieRun-Regular";
    border: 1px solid transparent;
    border-radius: 4px;
    background-color: #fdfae6;
    margin: 0 10px 10px 0;
  }
  @media screen and (max-width: 1024px) {
    padding-top: -1.2rem;
    padding-bottom: 0.8rem;
  }
`;

const RouletteDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-basis: 50%;
  overflow: hidden;
  background-color: #bb5b3f;
  padding-top: 0.625rem;
  padding-bottom: 0.3rem;
  @media screen and (max-width: 1024px) {
    padding-top: 1.7rem;
  }
  @media screen and (max-width: 500px) {
    padding-top: 6rem;
    padding-bottom: 5rem;
  }
`;

const RouletteDescriptionIntro = styled.div`
  color: #fdfae6;
  font-family: "CookieRun-Regular";
  padding: 0rem 1.063rem;
  @media screen and (max-width: 1024px) {
    font-size: 1.9rem;
    padding-top: 0.5rem;
    padding-bottom: 1rem;
  }
  @media screen and (max-width: 500px) {
    font-size: 4rem;
    padding-top: 2rem;
    padding-bottom: 0.5rem;
  }
`;

const DescriptionWrapper = styled.div`
  display: flex;
  margin-bottom: 0.625rem;
  justify-content: center;
  width: 100%;
`;

const Avatar = styled.div`
  width: 6.25rem;
  height: 6.25rem;
  background-color: #fdfae6;
  border-radius: 50%;
  margin-right: 10px;
  @media screen and (max-width: 1024px) {
    width: 8rem;
    height: 8rem;
  }
  @media screen and (max-width: 500px) {
    width: 15rem;
    height: 15rem;
  }
`;
const DescriptionBubbleLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: black;
  font-size: 1.125rem;
  font-family: "GowunDodum-Regular";
  padding: 0.5rem 0.8rem;
  position: relative;
  // width: 23.75rem;
  width: 50%;
  height: auto;
  background-color: #fdfae6;
  border-radius: 4px;
  margin-left: 20px;
  // white-space: nowrap;
  word-break: keep-all;
  &:after {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    width: 0;
    height: 0;
    border: 20px solid transparent;
    border-right-color: #fdfae6;
    border-left: 0;
    border-bottom: 0;
    margin-top: -10px;
    margin-left: -20px;
    @media screen and (max-width: 500px) {
      content: "";
      position: absolute;
      left: 0;
      top: 50%;
      width: 0;
      height: 0;
      border: 10px solid transparent;
      border-right-color: #fdfae6;
      border-left: 0;
      border-bottom: 0;
      margin-top: -10px;
      margin-left: -10px;
    }
  }
  @media screen and (max-width: 1024px) {
    font-size: 1.5rem;
    // width: 27rem;
    width: 50%;
    height: auto;
  }
  @media screen and (max-width: 500px) {
    font-size: 3rem;
    // width: 50rem;
    width: 65%;
    height: auto;
    margin-left: 5px;
    margin-top: 3px;
  }
`;

const BubbleTitle = styled.div`
  color: ${(props) => props.color};
  font-weight: bold;
`;

const DescriptionBubbleRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: black;
  font-size: 1.125rem;
  font-family: "GowunDodum-Regular";
  padding: 0.5rem 0.8rem;
  position: relative;
  // width: 380px;
  width: 50%;
  height: auto;
  background-color: #fdfae6;
  border-radius: 4px;
  margin-right: 27px;
  // white-space: nowrap;
  word-break: keep-all;
  &:after {
    content: "";
    position: absolute;
    right: 0;
    top: 50%;
    width: 0;
    height: 0;
    border: 20px solid transparent;
    border-left-color: #fdfae6;
    border-right: 0;
    border-top: 0;
    margin-top: -10px;
    margin-right: -20px;
    @media screen and (max-width: 500px) {
      content: "";
      position: absolute;
      right: 0;
      top: 50%;
      width: 0;
      height: 0;
      border: 10px solid transparent;
      border-left-color: #fdfae6;
      border-right: 0;
      border-top: 0;
      margin-top: -10px;
      margin-right: -10px;
    }
  }
  @media screen and (max-width: 1024px) {
    font-size: 1.5rem;
    // width: 31rem;
    width: 53%;
    height: auto;
  }
  @media screen and (max-width: 500px) {
    font-size: 3rem;
    width: 60%;
    height: auto;
    margin-top: 3px;
    margin-right: 13px;
  }
`;

export default Mainpage;
