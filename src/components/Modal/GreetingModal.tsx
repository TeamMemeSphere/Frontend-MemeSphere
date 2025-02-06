import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { SubTitle2Typo, BodyTypo } from "../../styles/Typography";
import { useAuth } from "../../hooks/common/useAuth";

interface GreetingModalProps {
  closeModal: () => void;
}

const GreetingModal: React.FC<GreetingModalProps> = ({ closeModal }) => {
  const { logout, isAuthenticated } = useAuth();
  const [userNickName, setUserNickName] = useState<string>("");

  useEffect(() => {
    const storedNickname = localStorage.getItem("nickname") || "기본닉?";
    setUserNickName(storedNickname);
  }, [isAuthenticated]);

  useEffect(() => {
    const handleScroll = () => closeModal();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [closeModal]);

  useEffect(() => {
    if (!isAuthenticated) {
      closeModal();
    }
  }, [isAuthenticated, closeModal]);

  const handleLogout = () => {
    logout();
    closeModal();
  };
  
  return (
    <ModalContainer>
      <Icon src="../../../public/assets/common/autentication/profile button.svg" />
      <Message><Nickname>{userNickName}</Nickname>님 반갑습니다!</Message>
      <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
    </ModalContainer>
  );
};

export default GreetingModal;

const ModalContainer = styled.div`
  position: fixed;
  top: 5.625rem;
  right: 5rem;

  width: 33.5rem;
  height: 5.313rem;
  border-radius: 0.625rem;
  background-color: var(--grey-80);

  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  z-index: 20;

  display: flex;
  flex-direction: row;
  align-items: center
`;

const Icon = styled.img`
  padding-left: 1.375rem;
`;

const Message = styled(BodyTypo).attrs({ as: "div"})`
  display: flex;
  align-items: center;
  color: rgba(225, 225, 225, 0.8);
`;

const Nickname = styled(SubTitle2Typo).attrs({ as: "div"})`
  margin-right: 0.313rem;
  margin-left: 1.125rem;
  color: white;
`;

const LogoutButton = styled.button`
  width: 6.25rem;
  height: 2.313rem;
  background-color: transparent;
  border: 1px solid var(--purple);
  color: var(--purple);
  border-radius: 40px;
  cursor: pointer;
  margin-left: auto;
  margin-right: 1.375rem;
`;
