import React, { useState } from "react";
import styled from "styled-components";
import * as S from "./HeaderButtonStyle";
import user from "../../../../public/assets/common/navbar/user.svg";
import UserModal from "../../Modal/Auth/UserModal";

const UserButton: React.FC = () => {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleModal = () => {
    setIsUserModalOpen((prev) => !prev);
  };
  
  const closeModal = () => {
    setIsUserModalOpen(false);
  };

  const handleLogin = () =>  {
    setIsLoggedIn(true);
    setIsUserModalOpen(false);
  };

  return (
    <>
      <StyledHeaderButton onClick={toggleModal}>
        <S.Icon src={user} />
      </StyledHeaderButton>
      {isUserModalOpen && !isLoggedIn && <UserModal closeModal={closeModal} onLogin={handleLogin}/>}
    </>
  );
};

export default UserButton;

const StyledHeaderButton = styled(S.HeaderButtonWrapper)`
  background: var(--purple);
`;
