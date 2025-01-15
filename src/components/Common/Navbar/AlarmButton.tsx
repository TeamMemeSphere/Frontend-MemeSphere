import React, { useState } from "react";
import styled from "styled-components";
import * as S from "./HeaderButtonStyle";
import bell from "../../../../public/assets/common/navbar/bell.svg";
import AlarmModal from "../../Modal/AlarmModal";

const AlarmButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <StyledHeaderButton onClick={openModal}>
        <S.Icon src={bell} />
      </StyledHeaderButton>
      {isModalOpen && <AlarmModal closeModal={closeModal} />}
    </>
  );
};

export default AlarmButton;

const StyledHeaderButton = styled(S.HeaderButtonWrapper)`
  background: var(--green);
`;
