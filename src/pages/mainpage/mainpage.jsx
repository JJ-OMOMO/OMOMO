import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import SocialLogin from "../../components/social_login_modal/socialLogin";
import Wheel from "../../components/roulette_wheel/roulette_wheel";
import { useLocation } from "react-router";

const initialData = [
  { option: "가" },
  { option: "나" },
  { option: "다" },
  { option: "라" },
  { option: "마" },
  { option: "바" },
];

const Mainpage = ({ authService }) => {
  const location = useLocation();
  const userId = location.state;
  const [mustSpin, setMustSpin] = useState(false);
  const [data, setData] = useState([]);
  const [test, setTest] = useState("");

  useEffect(() => {
    // console.log(localStorage.getItem("uid"));
  }, []);

  const reset = () => {
    setData([]);
  };

  const create = () => {
    data.length === 8 ? alert("stop") : setData([...data, { option: test }]);
  };

  return (
    <Wrapper>
      <Header authService={authService} userId={userId} />
      <Container>
        <TrialRoulette>
          룰렛 체험판
          <Wheel
            mustSpin={mustSpin}
            prizeNumber={3}
            data={data.length === 0 ? initialData : data}
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
          <AddItem>
            <input onChange={(e) => setTest(e.target.value)}></input>
            <button onClick={() => create()}>추가</button>
          </AddItem>
          <Bottom>
            <button onClick={() => reset()}>reset</button>
            <button onClick={() => setMustSpin(true)}>spin</button>
          </Bottom>
        </TrialRoulette>
        <RouletteDescription>룰렛 예시 설명란</RouletteDescription>
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
  background-color: black;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
  font-size: 30px;
`;

const TrialRoulette = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-basis: 40%;
  padding-top: 10px;
  background-color: #78db56;
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

const RouletteDescription = styled.div`
  flex-basis: 40%;
  background-color: #00bb80;
`;

export default Mainpage;
