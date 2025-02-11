import React from "react";
import styled from "styled-components";
import { SubTitle2Typo, BodyTypo } from "../../styles/Typography";
import { useAuth } from "../../hooks/common/useAuth";

interface GreetingModalProps {
  closeModal: () => void;
}

const GreetingModal: React.FC<GreetingModalProps> = ({ closeModal }) => {
  const { logout, nickName } = useAuth(); 

  const handleLogout = () => {
    logout();
    closeModal();
  };
  
  return (
    <BackDrop onClick={closeModal}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Icon src="../../../public/assets/common/autentication/profile button.svg" />
        <Message><Nickname>{nickName}</Nickname>님 반갑습니다!</Message>
        <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
      </ModalContainer>
    </BackDrop>
  );
};

export default GreetingModal;

const BackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

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
