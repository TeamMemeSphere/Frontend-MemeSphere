import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { SubTitle1Typo } from "../../../styles/Typography";
import Overlay from "../../Commons/Overlay";

import Login from "./Login";
import Signup from "./Signup";
import ProfileSetup from "./ProfileSetup";
import GreetingModal from "../GreetingModal";
import ForgotPasswordModal from "../ForgotPasswordModal";
import { useAuth } from "../../../hooks/common/useAuth";

const useScrollLock = (lock: boolean) => {
  useEffect(() => {
    if (lock) {
      const scrollPosition = window.pageYOffset;
      const bodyStyle = document.body.style.cssText;

      document.body.style.cssText = `
        position: fixed;
        top: -${scrollPosition}px;
        left: 0;
        right: 0;
        overflow: hidden;
      `;

      return () => {
        document.body.style.cssText = bodyStyle;
        window.scrollTo(0, scrollPosition);
      };
    }
  }, [lock]);
};

interface ModalProps {
  closeModal: () => void;
}

const UserModal: React.FC<ModalProps> = ({ closeModal }) => {
  const { isAuthenticated } = useAuth();

  const [activeTab, setActiveTab] = useState<"login" | "signup" | "profileSetup" | "greeting" | "forgotPassword">(isAuthenticated ? "greeting" : "login");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useScrollLock(activeTab !== "greeting");

  useEffect(() => {
    if (isAuthenticated) {
      setActiveTab("greeting");
    }
  }, [isAuthenticated]);

  const handleOverlayClick = (e?: React.MouseEvent) => {
    if (!e || e.target === e.currentTarget) {
      closeModal();
      setActiveTab("login");
    }
  };

  const handleClose = () => {
    closeModal();
    if (!isAuthenticated) {
      setActiveTab("login");
    }
  };

  return (
    <>
    {activeTab === "greeting" && <GreetingModal closeModal={closeModal}/>}
    {activeTab !== "greeting" && (
      <>
      <Overlay onClick={handleOverlayClick} />
      <ModalContent activeTab={activeTab}>
        <FlexContainer>
          <Title>
            {activeTab === "login" && "로그인"}
            {activeTab === "signup" && "회원가입"}
            {activeTab === "profileSetup" && "회원가입"}
            {activeTab == "forgotPassword" && "비밀번호 찾기"}
          </Title>
          <CloseButton onClick={handleClose} src="/assets/common/autentication/authentication back icon.svg" />
        </FlexContainer>
        <ContentContainer>
          {activeTab === "login" && (
            <Login 
              onLogin={() => 
                setActiveTab("greeting")
              }
              switchToSignup={() => setActiveTab("signup")}
              switchToForgotPassword={() => setActiveTab("forgotPassword")} />
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
          {activeTab === "forgotPassword" && (
            <ForgotPasswordModal />
          )}
        </ContentContainer>
      </ModalContent>
      </>
    )}
    </>
  );
};

export default UserModal;


const ModalContent = styled.div.withConfig({shouldForwardProp: (prop) => prop !== "activeTab",})<{activeTab: string}>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;

  width: 42.5rem;
  height: ${({ activeTab }) => 
    activeTab === "login" ? "45rem" : 
    activeTab === "forgotPassword" ? "26.25rem" : "50rem"
  };

  max-width: 90vw;
  max-height: 90vw;

  background-color: var(--grey-100);
  box-shadow: 0px 0.25rem 0.625rem rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  overflow-y: auto;

  @media (max-width: 480px) {
    width: 90vw;
    max-height: 80vh;
    margin-top: 0.1rem;
    overflow-y: auto;
  }

  @media (max-height: 800px) {
    height: 80vh;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2.188rem;
  margin-left: 3.125rem;
  gap: 0.875rem;
  align-items: center;
`;

const Title = styled(SubTitle1Typo)`
  color: white;
`;

const CloseButton = styled.img`
  cursor: pointer;
  margin-right: 3.5rem;
`;

const ContentContainer = styled.div`
  margin: 2.25rem 9.125rem;
  display: flex;
  flex-direction: column;

  @media (max-width: 650px) {
    margin: 1.5rem 3rem;
  }

  @media (max-width: 480px) {
    margin-top: 1.5rem;
    margin-left: 3rem;
    margin-right: 3rem;
    margin-bottom: 1.5rem;
  }
`;
