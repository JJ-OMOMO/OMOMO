import React from "react";
import styled from "styled-components";
import OMO from "../../images/OMO.png";
import CUTE from "../../images/cuteIcon.png";
import Github from "../../images/github.png";
import Boy from "../../images/Glassesboy.png";
import Girl from "../../images/Glassesgirl.png";
import Mario from "../../images/SuperMario.png";
import { dbService } from "../../service/firebase";

const ProfileIMG = [OMO, CUTE, Github, Boy, Girl, Mario]

const ProfileModal = ({ closeModal, Nick, setNick, Char, setChar }) => {

  const setProfile = async () => {
    const citiesRef = dbService.collection('profile');
    await citiesRef.doc(localStorage.uid).set({
      userId: localStorage.uid,
      character: Char,
      nickname: Nick,
      createAt: Date.now()
    })
      .then(() => closeModal(false));
  }

  return (
    <ModalBackground>
      <ModalContainer>
        <BackButton onClick={() => closeModal(false)}>&lt;</BackButton>
        <Profile>
          {Char.length < 1 ?
            <img src={OMO} alt={"오모오모"} width="200px" height="200px" />
            :
            <img src={Char} alt={"프로필 사진"} width="200px" height="200px" />
          }
          <input tpye="text" value={Nick} onChange={(e) => setNick(e.target.value)}></input>
        </Profile>
        <CharacterList>
          {ProfileIMG.map((img, index) => {
            return (
              <span key={index} onClick={() => setChar(img)}>
                <img src={img} alt={`프로필 사진 ${index + 1}`} width="100%" height="100%" />
              </span>
            )
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
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 1000px;
  height: 800px;
  background-color: #ffffffc6;
`;

const BackButton = styled.div`
  font-size: 20px;
  cursor: pointer;
`;

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  & > input {
    margin-top: 20px;
    width: 200px;
    height: 20px;
    text-align: center;
  }
`;

const CharacterList = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(5, minmax(100px, 1fr));
  /* text-align: center; */
  width: 100%;
  height: 300px;
  border: 1px solid red;
  margin-top: 20px;
  overflow-x: scroll;
  & > span {
    width: 150px;
    height: 150px;
    border:1px solid blue;
    margin: 10px;
  }
`;

const SaveButton = styled.button`
  width: 80px;
  height: 30px;
  margin-top: 20px;
`;

export default ProfileModal;
