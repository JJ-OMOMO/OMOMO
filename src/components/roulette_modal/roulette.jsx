import React from "react";
import styled from "styled-components";

const Roulette = ({ closeModal }) => {
    return (
        <ModalBackground>
            <RouletteModalWrapper>
                <RouletteHeader>
                    <span>Roulette</span>
                    <ExitButton onClick={() => closeModal(false)}>X</ExitButton>
                </RouletteHeader>
                <RouletteModalBody>
                    <LeftSection>
                        <Wheel></Wheel>
                        <Option></Option>
                    </LeftSection>
                    <RightSection>
                        <RouletteName type="text" placeholder="룰렛 네임"></RouletteName>
                        <RouletteOption name="otion">
                            <option value="">룰렛 개수</option>
                            <option value="">1</option>
                            <option value="학생">2</option>
                            <option value="회사원">3</option>
                            <option value="기타">4</option>
                            <option value="기타">5</option>
                            <option value="기타">6</option>
                        </RouletteOption>
                        <RouletteTime type="time" placeholder="시간"></RouletteTime>
                    </RightSection>
                </RouletteModalBody>
                <RoultteButton>저장하기</RoultteButton>
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
    `;

const RouletteModalWrapper = styled.div`
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      background-color: rgb(32,32,32);
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
`
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

const LeftSection = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 50%;
    height: 100%;
    border: 1px solid white;
`
const Wheel = styled.div`
    width: 98%;
    height: 98%;
    border: 2px solid white;
    border-radius: 50%;
`
const Option = styled.input`
    position: absolute;
    top: 45%;
    left: 40%;
    width: 100px;
    height: 30px;
`

const RightSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 100%;
    border: 1px solid white;
`

const RouletteName = styled.input`
    width: 200px;
    height: 50px;
    font-size: 2rem;
    text-align: center;
`
const RouletteOption = styled.select`
    width: 200px;
    height: 50px;
    font-size: 2rem;
    text-align: center;
    margin: 30px 0;
`
const RouletteTime = styled.input`
    width: 200px;
    height: 50px;
    font-size: 1.5rem;
    text-align: center;
`

const RoultteButton = styled.button`
    bottom: 5px;
    width: 120px;
    height: 45px;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
`

export default Roulette;
