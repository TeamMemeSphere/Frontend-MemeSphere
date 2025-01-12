import React, { useState } from "react";
import styled from "styled-components";
import { SubTitle2Typo } from "../../styles/Typography";
import userIcon from "../../../public/assets/Modal/profile-button.svg";

interface ModalProps {
  closeModal: () => void;
}

const UserModal: React.FC<ModalProps> = ({ closeModal }) => {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent>
        <FlexContainer>
          <img src={userIcon} />
          <Tab
            isActive={activeTab === "login"}
            onClick={() => setActiveTab("login")}
          >
            로그인
          </Tab>
          <Tab
            isActive={activeTab === "signup"}
            onClick={() => setActiveTab("signup")}
          >
            회원가입
          </Tab>
        </FlexContainer>
        {/* 여기에 모달 내용 구현 */}
      </ModalContent>
    </ModalOverlay>
  );
};

export default UserModal;

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
  width: 536px;
  height: 862px;
  background: url("../../../public/assets/Modal/background2.svg");
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

const Tab = styled(SubTitle2Typo)<{ isActive: boolean }>`
  cursor: pointer;
  color: ${({ isActive }) =>
    isActive ? "var(--white-100)" : "var(--white-50)"};
  transition: color 0.2s;
`;
