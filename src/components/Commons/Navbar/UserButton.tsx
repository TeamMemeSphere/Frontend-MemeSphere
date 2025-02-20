import React, { useState } from "react";
import styled from "styled-components";
import * as S from "./HeaderButtonStyle";
import user from "../../../../public/assets/common/navbar/user.svg";
import UserModal from "../../Modal/Auth/UserModal";
import { useAuth } from "../../../hooks/common/useAuth";

const UserButton: React.FC = () => {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  const toggleModal = () => {
    setIsUserModalOpen((prev) => !prev);
  };
  
  const closeModal = () => {
    setIsUserModalOpen(false);
  };
  
  return (
    <>
      <StyledHeaderButton onClick={toggleModal}>
        <S.Icon src={user} />
      </StyledHeaderButton>
      {isUserModalOpen && <UserModal closeModal={closeModal}/>}
    </>
  );
};

export default UserButton;

const StyledHeaderButton = styled(S.HeaderButtonWrapper)`
  background: var(--purple);
`;
