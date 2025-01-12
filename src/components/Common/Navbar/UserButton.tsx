import React, { useState } from "react";
import styled from "styled-components";
import * as S from "./HeaderButtonStyle";
import user from "../../../../public/assets/common/navbar/user.svg";
import UserModal from "../../Modal/UserModal";

const UserButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <StyledHeaderButton onClick={openModal}>
        <S.Icon src={user} />
      </StyledHeaderButton>
      {isModalOpen && <UserModal closeModal={closeModal} />}
    </>
  );
};

export default UserButton;

const StyledHeaderButton = styled(S.HeaderButtonWrapper)`
  background: var(--purple);
`;
