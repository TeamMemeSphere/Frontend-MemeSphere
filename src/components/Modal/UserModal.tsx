import React, { useState } from "react";
import styled from "styled-components";
import { SubTitle1Typo } from "../../styles/Typography";

import Login from "./Authentication/Login";
import Signup from "./Authentication/Signup";
import ProfileSetup from "./Authentication/ProfileSetup";
import GreetingModal from "./GreetingModal";

interface ModalProps {
  closeModal: () => void;
  onLogin: () => void;
}

const UserModal: React.FC<ModalProps> = ({ closeModal, onLogin }) => {
  const [activeTab, setActiveTab] = useState<"login" | "signup" | "profileSetup" | "greeting">("login");
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [userNickName, setUserNickNmae] = useState<string>("");


  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
      setActiveTab("login");
    }
  };

  const handleClose = () => {
    closeModal();
    setActiveTab("login");
  };

  // 유저 모달창이 열리면 스크롤이 비활성화
  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    return() => {
      document.body.style.overflow = "auto";
      setActiveTab("login");
    };
  }, []);

  return (
    <>
    {activeTab === "greeting" && <GreetingModal onLogout={closeModal}/>}
    {activeTab !== "greeting" && (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent>
        <FlexContainer>
          <Title>
            {activeTab === "login" && "로그인"}
            {activeTab === "signup" && "회원가입"}
            {activeTab === "profileSetup" && "회원가입"}
          </Title>
          <CloseButton onClick={handleClose} src="../../../public/assets/common/autentication/authentication back icon.svg" />
        </FlexContainer>
        <ContentContainer>
          {activeTab === "login" && (
                <Login 
                  onLogin={() => {
                    onLogin();
                    setActiveTab("greeting");
                  }}
                switchToSignup={() => setActiveTab("signup")} />
              )}
              {activeTab === "signup" && (
                <Signup onSignup={() => setActiveTab("profileSetup")} />
              )}
              {activeTab === "profileSetup" && (
                <ProfileSetup
                  onStart={() => {
                    setActiveTab("login");
                  }}
                />
              )}
        </ContentContainer>
      </ModalContent>
    </ModalOverlay>
    )}
    </>
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
  justify-content: center;
  align-items: center;
  background-color: rgba(30, 30, 32, 0.8);
  z-index: 10;
`;

const ModalContent = styled.div`
  margin-top: 5.813rem;
  margin-right: 3.95rem;

  width: 680px;
  height: 800px;
  background-color: var(--grey-80);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2.188rem;
  margin-left: 50px;
  gap: 0.875rem;
  align-items: center;
`;

const Title = styled(SubTitle1Typo)`
  color: white;
`;

const CloseButton = styled.img`
  cursor: pointer;
  margin-right: 56px;
`;

const ContentContainer = styled.div`
  margin-top: 36px;
  margin-left: 146px;
  display: flex;
  flex-direction: column;
`;