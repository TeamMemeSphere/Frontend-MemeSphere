import styled from "styled-components";
import { ChatTextTypo } from "../../../styles/Typography";

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0rem;
  width: 24.313rem;

  @media (max-width: 480px) {
    width: 90vw; 
    max-width: 100%; 
    height: 90vw;
  }
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  & > button {
    margin-top: 0.125rem;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled(ChatTextTypo).attrs({ as: "label" })``;

export const Input = styled.input`
  width: 100%;
  height: 3.563rem;
  border-radius: 0.625rem;
  background-color: rgba(255, 255, 255, 0.05);

  font-size: 1rem;
  color: rgba(255, 255, 255, 0.4);
  padding: 0 1.125rem;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: var(--purple);
  }

  @media (max-width: 480px) {
    height: 3rem; /* 모바일 화면에서 높이를 줄임 */
    font-size: 0.9rem; /* 글자 크기 줄이기 */
  }
`;

export const StyledInput = styled(Input)<{ $hasError: boolean; isAvailable?: boolean }>`
  border-color: ${(props) =>
    props.isAvailable ? "var(--white-10)" 
      : props.$hasError || props.isAvailable === false 
      ? "var(--red)" 
      : "var(--white-10)"};
`;

export const ErrorMessage = styled.div<{ isAvailable?: boolean }>`
  font-size: 0.75rem;
  color: ${(props) => (props.isAvailable ? "var(--purple)" : "var(--red)")};
  display: flex;
  justify-content: flex-end;
`;

export const Button = styled.button`
  width: 100%;
  height: 3.563rem;
  border: none;
  border-radius: 0.625rem;
  cursor: pointer;

  margin-top: 1.688rem;
  padding: 1.188rem 0;

  font-size: var(--font-size-body);
  font-weight: var(--font-weight-semibold);
  color: white;

  background-color: var(--purple);
  transition: background-color 0.2s;

  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 480px) {
    height: 3rem; /* 버튼 높이 조정 */
    font-size: 0.9rem; /* 폰트 크기 줄이기 */
  }
`;

export const Separator = styled.img`
  margin: 1.25rem 0;
  z-index: 1;
`;

export const SocialButtons = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  gap: 0.5rem;
`;

export const SocialButton = styled.button`
  height: 3.563rem;
  padding: 0.75rem;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;

  font-size: 0.875rem;
  color: white;

  background-color: transparent;
  border: 1px solid rgba(225, 225, 225, 0.3);
  border-radius: 0.625rem;

  @media (max-width: 480px) {
    height: 3rem;
    font-size: 0.9rem;
  }
`;

export const SocialImage = styled.img`
height: 2rem;
`;