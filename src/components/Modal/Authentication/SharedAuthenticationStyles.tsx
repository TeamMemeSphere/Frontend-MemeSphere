import styled from "styled-components";
import { ChatTextTypo } from "../../../styles/Typography";

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0rem;
  width: 24.313rem;
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
`;

export const StyledInput = styled(Input)<{ hasError: boolean }>`
  border-color: ${(props) => (props.hasError ? "var(--red)" : "var(--white-10)")};
`;

export const ErrorMessage = styled.div`
  font-size: 12px;
  color: var(--red);
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

  &:hover {
    // Hover 디자인 미정.
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

  font-size: 1rem;
  font-weight: bold;
  color: white;

  background-color: transparent;
  border: 1px solid rgba(225, 225, 225, 0.3);
  border-radius: 0.625rem;
`;

export const SocialImage = styled.img`
height: 2rem;
`;
