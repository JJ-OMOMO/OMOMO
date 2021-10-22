import React from "react";
import styled from "styled-components";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";

const Mainpage = () => (
  <Wrapper>
    <Header />
    <Container>
      <TrialRoulette>룰렛 체험판</TrialRoulette>
      <RouletteDescription>룰렛 예시 설명란</RouletteDescription>
    </Container>
    <Footer />
  </Wrapper>
);

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
  flex-basis: 40%;
  background-color: #78db56;
`;

const RouletteDescription = styled.div`
  flex-basis: 40%;
  background-color: #00bb80;
`;

export default Mainpage;
