import React, { useRef } from "react";
import styled from "styled-components";
import CUTE from "../../images/cuteIcon.png";
import Github from "../../images/github.png";
import Boy from "../../images/Glassesboy.png";
import Girl from "../../images/Glassesgirl.png";
import Mario from "../../images/SuperMario.png";
import { dbService } from "../../service/firebase";

const ProfileIMG = [CUTE, Github, Boy, Girl, Mario];

const ProfileModal = ({ closeModal, Nick, setNick, Char, setChar }) => {
  const ModalBack = useRef(null);

  const setProfile = async () => {
    const citiesRef = dbService.collection("profile");
    await citiesRef
      .doc(localStorage.uid)
      .set({
        userId: localStorage.uid,
        character: Char,
        nickname: Nick,
        createAt: Date.now(),
      })
      .then(() => closeModal(false));
  };

  const onClickCloseModal = (e) => {
    e.target === ModalBack.current && closeModal(false);
  };

  return (
    <ModalBackground ref={ModalBack} onClick={(e) => onClickCloseModal(e)}>
      <ModalContainer>
        <BackButton onClick={() => closeModal(false)}>
          <i className="fas fa-chevron-left"></i>
        </BackButton>
        <Profile>
          {Char.length < 1 ? (
            <img src={CUTE} alt={"큐트"} width="200px" height="200px" />
          ) : (
            <img src={Char} alt={"프로필 사진"} width="200px" height="200px" />
          )}
          <input
            tpye="text"
            defaultValue={Nick || ""}
            onChange={(e) => setNick(e.target.value)}
          ></input>
        </Profile>
        <CharacterList>
          {ProfileIMG.map((img, index) => {
            return (
              <span key={index} onClick={() => setChar(img)}>
                <img
                  src={img}
                  alt={`프로필 사진 ${index + 1}`}
                  width="105%"
                  height="105%"
                />
              </span>
            );
          })}
        </CharacterList>
        <SaveButton onClick={setProfile}>저장</SaveButton>
      </ModalContainer>
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
  background-color: #ffff00f1;
  z-index: 6;
  background-color: rgba(0, 0, 0, 0.8);
  @media screen and (max-width: 1600px) {
    position: absolute;
    height: 120vh;
  } ;
`;

const ModalContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70rem;
  height: 50rem;
  background-color: #fedb41;
  border-radius: 0.3rem;
  @media only screen and (max-width: 1024px) {
    width: 55rem;
    height: 55rem;
  }
  @media screen and (max-width: 500px) {
    width: 100%;
    height: 120vh;
  }
`;

const BackButton = styled.div`
  position: absolute;
  left: 15px;
  top: 15px;
  color: #006e5e;
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: #006e5e;
  font-size: 2.5rem;
  cursor: pointer;
  @media screen and (max-width: 500px) {
    font-size: 5rem;
  }
`;

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > input {
    margin-top: 20px;
    width: 180px;
    height: 38px;
    border: 1px solid transparent;
    border-radius: 0.5rem;
    font-size: 1.5rem;
    text-align: center;
    color: white;
    font-family: "CookieRun-Regular";
    background-color: #006e5e;
  }
  @media screen and (max-width: 500px) {
    & > input {
      font-size: 5rem;
    }
  }
`;

const CharacterList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 95%;
  height: 25rem;
  background-color: #f2fedc;
  border: 1px solid transparent;
  border-radius: 0.3rem;
  margin-top: 30px;
  overflow-x: hidden;
  & > span {
    width: 10rem;
    height: 10rem;
    cursor: pointer;
    margin: 10px;
  }
  @media screen and (max-width: 500px) {
    height: 30rem;
    & > span {
      width: 20rem;
      height: 20rem;
    }
  }
`;

const SaveButton = styled.button`
  color: white;
  font-size: 1.3rem;
  font-family: "CookieRun-Regular";
  width: 90px;
  height: 50px;
  border: 1px solid transparent;
  border-radius: 0.5rem;
  margin-top: 30px;
  background-color: #006e5e;
  cursor: pointer;
  @media screen and (max-width: 500px) {
    width: 180px;
    height: 10rem;
    font-size: 5rem;
  }
`;

export default ProfileModal;
