import React from "react";
import styled from "styled-components";
import { SubTitle2Typo } from "../../styles/Typography";
import bellIcon from "../../../public/assets/Modal/notification-icon.svg";

interface ModalProps {
  closeModal: () => void;
}

const AlarmModal: React.FC<ModalProps> = ({ closeModal }) => {
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent>
        <FlexContainer>
          <img src={bellIcon} />
          <SubTitle2Typo>알림</SubTitle2Typo>
        </FlexContainer>
        {/* 여기에 모달 내용 구현 */}
      </ModalContent>
    </ModalOverlay>
  );
};

export default AlarmModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  z-index: 10;
`;

const ModalContent = styled.div`
  margin-top: 5.813rem;
  margin-right: 3.95rem;
  width: 789px;
  height: 877px;
  background: url("../../../public/assets/Modal/background.svg");
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
`;

const FlexContainer = styled.div`
  display: flex;
  margin-top: 2.188rem;
  margin-left: 1.375rem;
  gap: 0.875rem;
  align-items: center;
`;

