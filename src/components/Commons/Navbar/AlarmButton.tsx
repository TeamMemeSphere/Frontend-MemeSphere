import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as S from "./HeaderButtonStyle";
import bell from "../../../../public/assets/common/navbar/bell.svg";
import AlarmModal from "../../Modal/AlarmModal";
import LoginRequiredModal from "../../Modal/LoginRequiredModal";
import UserModal from "../../Modal/Auth/UserModal";

const AlarmButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  

  const authTokens = {
    accessToken: localStorage.getItem("accessToken") ?? "",
    refreshToken: localStorage.getItem("refreshToken") ?? "",
  };
  const isLoggedIn = !!authTokens.accessToken;

  const openUserModal = () => {
    setIsUserModalOpen(true);
  };

  const handleLogin = () => {
    setIsUserModalOpen(false);
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

  useEffect(() => {
    if (isModalOpen && !isLoggedIn) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen, isLoggedIn]);

  return (
    <>
      <StyledHeaderButton onClick={openModal}>
        <S.Icon src={bell} />
      </StyledHeaderButton>
      {isModalOpen &&
        (isLoggedIn
          ? <AlarmModal closeModal={closeModal} {...authTokens} />
          : <LoginRequiredModal onClose={closeModal} isReqLogin={true} toLogin={openUserModal} />)}
      {isUserModalOpen && <UserModal closeModal={() => setIsUserModalOpen(false)}></UserModal>}
    </>
  );
};

export default AlarmButton;

const StyledHeaderButton = styled(S.HeaderButtonWrapper)`
  background: var(--green);
`;
