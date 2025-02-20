import styled from "styled-components";
import * as S from "./../../styles/Typography.ts";
import Overlay from "../Commons/Overlay.tsx";

type LoginRequiredModalProps = {
  isReqLogin: boolean;
  onClose: () => void;
  toLogin: () => void;
};

const LoginRequiredModal: React.FC<LoginRequiredModalProps> = ({
  isReqLogin,
  onClose,
  toLogin,
}) => {
  return (
    <>
      <Overlay onClick={onClose} />
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <S.BodyTypo>
          {isReqLogin
            ? "로그인 후 이용 가능한 기능입니다."
            : "잘못된 접근입니다"}
        </S.BodyTypo>
        <ButtonContainer>
          {isReqLogin && (
            <GoLoginButton 
              onClick={() => {
                toLogin();
                onClose();
              }}
            >
              <S.CaptionTypoMedium>
                로그인 하러 가기
              </S.CaptionTypoMedium>
            </GoLoginButton>
          )}
          <CloseButton onClick={() => onClose()}>
            <S.CaptionTypoMedium>닫기</S.CaptionTypoMedium>
          </CloseButton>
        </ButtonContainer>
      </ModalContent>
    </>
  );
};

export default LoginRequiredModal;

// const Overlay = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100vw;
//   height: 100vh;
//   display: flex;
//   background-color: rgba(30, 30, 32, 0.8);
//   justify-content: center;
//   align-items: center;
//   z-index: 10;
// `;

const ModalContent = styled.div`
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translate(-50%);

  display: flex;
  width: 23.625rem;
  padding: 2.563rem 1.938rem 1.75rem 1.938rem;
  margin-bottom: 70vh;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.688rem;
  border-radius: 1.25rem;
  background: var(--grey-80, rgba(38, 38, 43, 0.8));
  z-index: 1000;

  /* modal */
  box-shadow: 0px 0px 1.875rem 0px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(1.563rem);
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.813rem;
  justify-content: flex-end;
  width: 100%;
`;

const Button = styled.button`
  display: flex;
  padding: 0.625rem 1.563rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.625rem;
  background: var(--grey-100, #26262a);
  cursor: pointer;
`;

const GoLoginButton = styled(Button)`
  border: 1.5px solid var(--primary-purple, #7061f0);
  color: var(--primary-purple, #7061f0);
`;

const CloseButton = styled(Button)`
  border: 1.5px solid var(--White-50, rgba(255, 255, 255, 0.5));
  color: var(--white-50, rgba(255, 255, 255, 0.5));
`;
