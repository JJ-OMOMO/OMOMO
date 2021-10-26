import React from "react";
import styled from "styled-components";
import OMO from "../../images/OMO.png";

const ProfileModal = ({ closeModal }) => {
  return (
    <ModalBackground>
      <ModalContainer>
        <BackButton onClick={() => closeModal(false)}>&lt;</BackButton>
        <Profile>
          <img src={OMO} alt="프로필 사진" width="200px" height="200px" />
          <input tpye="text" value="닉네임" readOnly></input>
        </Profile>
        <CharacterList>캐릭터List</CharacterList>
        <SaveButton>저장</SaveButton>
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
  background-color: yellow;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 1000px;
  height: 800px;
  background-color: white;
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
  border: 1px solid blue;
  & > input {
    margin-top: 20px;
    width: 200px;
  }
`;

const CharacterList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 800px;
  height: 300px;
  border: 1px solid red;
  margin-top: 20px;
`;

const SaveButton = styled.button`
  width: 80px;
  height: 30px;
  margin-top: 20px;
`;

export default ProfileModal;
