import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { SubTitle1Typo } from "../../../styles/Typography";
import Overlay from "../../Common/Overlay";

import Login from "./Login";
import Signup from "./Signup";
import ProfileSetup from "./ProfileSetup";
import GreetingModal from "../GreetingModal";
import { useAuth } from "../../../hooks/common/useAuth";

interface ModalProps {
  closeModal: () => void;
  onLogin: () => void;
}

const UserModal: React.FC<ModalProps> = ({ closeModal, onLogin }) => {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<"login" | "signup" | "profileSetup" | "greeting">(isAuthenticated ? "greeting" : "login");
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [email, setEmail] = useState<string>("");
  const [password,setPassword] = useState<string>("");

  useEffect(() => {
    const openGreetingModal = () => setActiveTab("greeting");
    window.addEventListener("openGreetingModal", openGreetingModal);
    console.log("isAuthenticated 상태 변경됨:", isAuthenticated);
    return () => window.removeEventListener("openGreetingModal", openGreetingModal);
  }, []);

  useEffect(() => {
    console.log("isAuthenticated 상태 변경됨:", isAuthenticated);
    setActiveTab(isAuthenticated ? "greeting" : "login");
  }, [isAuthenticated]);

  const handleOverlayClick = (e?: React.MouseEvent) => {
    if (!e || e.target === e.currentTarget) {
      closeModal();
      setActiveTab("login");
    }
  };

  const handleClose = () => {
    closeModal();
    setActiveTab("login");
  };

  // 유저 모달창 열리면 스크롤 비활성화
  useEffect(() => {
    if (activeTab !== "login") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    
    return() => {
      document.body.style.overflow = "auto";
    };
  }, [activeTab]);

  return (
    <>
    {activeTab === "greeting" && <GreetingModal closeModal={closeModal}/>}
    {activeTab !== "greeting" && (
      <>
      <Overlay onClick={handleOverlayClick} />
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
                <Signup 
                  onSignup={(email:string, password:string) => {
                    setEmail(email);
                    setPassword(password);
                    setActiveTab("profileSetup");
                }} />
              )}
              {activeTab === "profileSetup" && (
                <ProfileSetup
                  email={email}
                  password={password}
                  onSuccess={() => {
                    setActiveTab("login");
                  }}
                />
              )}
        </ContentContainer>
      </ModalContent>
      </>
    )}
    </>
  );
};

export default UserModal;

const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%; 
  transform: translate(-50%, -50%);
  z-index: 999;

  margin-top: 5.813rem;
  margin-right: 3.95rem;

  width: 680px;
  height: 800px;
  max-width: 90vw;
  max-height: 90vw;
  
  background-color: var(--grey-100);
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