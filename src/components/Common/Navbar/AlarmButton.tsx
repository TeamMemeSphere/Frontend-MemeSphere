import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as S from "./HeaderButtonStyle";
import bell from "../../../../public/assets/common/navbar/bell.svg";
import AlarmModal from "../../Modal/AlarmModal";
import LoginRequiredModal from "../../Modal/LoginRequiredModal";
import { useAuth } from "../../../hooks/common/useAuth";
import UserModal from "../../Modal/Auth/UserModal";

const AlarmButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const {isAuthenticated}= useAuth();

  const accessToken = isAuthenticated ? localStorage.getItem("accessToken") : null;
  const refreshToken = isAuthenticated ? localStorage.getItem("refreshToken") : null;

  const openUserModal = () => {
    setIsUserModalOpen(true);
  };

  const closeUserModal = () => {
    setIsUserModalOpen(false);
  };
  
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(()=>{
    if(isModalOpen && !isAuthenticated){
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto"; 
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  },[isModalOpen]);

  return (
    <>
      <StyledHeaderButton onClick={openModal}>
        <S.Icon src={bell} />
      </StyledHeaderButton>
      {isModalOpen && 
      (isAuthenticated
      ? <AlarmModal closeModal={closeModal} />
      : <LoginRequiredModal onClose={closeModal} isReqLogin={true} toLogin={openUserModal}/>)}
      {isUserModalOpen && <UserModal closeModal={()=>closeUserModal()}></UserModal>}
    </>
  );
};

export default AlarmButton;

const StyledHeaderButton = styled(S.HeaderButtonWrapper)`
  background: var(--green);
`;
