import React, { useState } from "react";
import styled from "styled-components";
import * as S from "./HeaderButtonStyle";
import user from "../../../../public/assets/common/navbar/user.svg";
import UserModal from "../../Modal/UserModal";
import GreetingModal from "../../Modal/GreetingModal";

const UserButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    closeModal();
  };

  return (
    <>
      <StyledHeaderButton onClick={toggleModal}>
        <S.Icon src={user} />
      </StyledHeaderButton>
      {isModalOpen && !isLoggedIn && <UserModal closeModal={closeModal} onLogin={handleLogin}/>}
      {isLoggedIn && isModalOpen && <GreetingModal onLogout={handleLogout} closeModal={closeModal}/>}
    </>
  );
};

export default UserButton;

const StyledHeaderButton = styled(S.HeaderButtonWrapper)`
  background: var(--purple);
`;
