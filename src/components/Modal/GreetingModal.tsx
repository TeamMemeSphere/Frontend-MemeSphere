import React from "react";
import styled from "styled-components";
import { SubTitle2Typo, BodyTypo } from "../../styles/Typography";
import { useAuth } from "../../hooks/common/useAuth";
import Overlay from "../Commons/Overlay";

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
    <>
      <OverlayWrapper>
        <Overlay />
      </OverlayWrapper>

      <BackDrop onClick={closeModal}>
        <ModalContainer onClick={(e) => e.stopPropagation()}>
          <IconMessageWrapper>
            <Icon src="/assets/common/autentication/profile button.svg" />
            <Message>
              <Nickname>{nickName}</Nickname>님 반갑습니다!
            </Message>
          </IconMessageWrapper>
          <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
          <CloseButton
            onClick={closeModal}
            src="/assets/common/navbar/close button.svg"
          />
        </ModalContainer>
      </BackDrop>
    </>
  );
};

export default GreetingModal;

const OverlayWrapper = styled.div`
  @media (min-width: 481px) {
    display: none;
  }
`;

const BackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
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
  align-items: center;

  @media (max-width: 480px) {
    width: 21.25rem;
    height: 10.063rem;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: center;

    padding-top: 0.5rem;
    padding-left: 0.5rem;
  }
`;

const Icon = styled.img`
  padding-left: 1.375rem;
`;

const Message = styled(BodyTypo).attrs({ as: "div" })`
  display: flex;
  align-items: center;
  color: rgba(225, 225, 225, 0.8);
`;

const Nickname = styled(SubTitle2Typo).attrs({ as: "div" })`
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

  @media (max-width: 480px) {
    width: 6.25rem;
    height: 2.313rem;
    margin-left: auto; /* 오른쪽 정렬 */
  }
`;

const CloseButton = styled.img`
  position: absolute;
  top: -3rem;
  right: 0rem;
  cursor: pointer;
  width: 2rem;
  height: 2rem;

  @media (min-width: 481px) {
    display: none;
  }
`;

const IconMessageWrapper = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 480px) {
    margin-bottom: 1.688rem;
  }
`;
