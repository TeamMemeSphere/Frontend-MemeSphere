import React from "react";
import styled from "styled-components";

interface GreetingModalProps {
  userNickName: string;
}

const GreetingModal: React.FC<GreetingModalProps> = ({ userNickName }) => {
  return (
    <ModalContainer>
      <Message>{userNickName}님 반갑습니다!</Message>
    </ModalContainer>
  );
};

export default GreetingModal;

const ModalContainer = styled.div`
  position: fixed;
  top: 1rem;
  right: 1rem;
  width: 250px;
  background-color: var(--grey-80);
  color: white;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  z-index: 20;
`;

const Message = styled.p`
  margin: 0;
  font-size: 1rem;
  text-align: center;
`;
