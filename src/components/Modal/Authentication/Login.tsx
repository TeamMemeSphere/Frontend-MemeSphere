import React from "react";
import styled from "styled-components";
import { SmallCaptionTypo } from "../../../styles/Typography";
import { StyledInput, ErrorMessage, FormContainer, Form, InputContainer, Label, Button, Separator, SocialButtons, SocialButton, SocialImage } from "./SharedAuthenticationStyles";
import { useFormValidation } from "./FormValidation";

interface LoginProps {
  onLogin: () => void;
  switchToSignup: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, switchToSignup }) => {
  const { email, password, handleBlur, handleChange } = useFormValidation({
    emailInvalid: "이메일 형식이 아닙니다.",
    passwordInvalid: "비밀번호 형식이 아닙니다.",
  });

  const handleLogin = () => {
    // 로그인 완료 로직 추가
    onLogin();
  };

  return (
    <FormContainer>
      <Form>
        <InputContainer>  
          <Label>이메일 주소</Label>
          <StyledInput
            type="email"
            id="email"
            name="email"
            placeholder="memesphere@meme.com"
            value={email.value}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            $hasError={!!email.error}
          />
          {email.error && <ErrorMessage>{email.error}</ErrorMessage>}
        </InputContainer>
        <InputContainer>
          <Label>비밀번호</Label>
          <StyledInput
            type="password"
            id="password"
            name="password"
            placeholder="영문, 숫자, 특수문자 중 2가지 이상 조합"
            value={password.value}
            onChange={(e) => handleChange("password", e.target.value)}
            onBlur={() => handleBlur("password")}
            $hasError={!!password.error}
          />
          {password.error && <ErrorMessage>{password.error}</ErrorMessage>}
        </InputContainer>
        <Button onClick={handleLogin}>로그인</Button>
      </Form>
      <Separator src="../../../public/assets/common/autentication/Autentication Distinction.svg" />
      <SocialButtons>
        <SocialButton>
            <SocialImage src="../../../public/assets/common/autentication/kakaotalk icon.svg" />
            카카오로 로그인하기</SocialButton>
        <SocialButton>Google로 로그인하기</SocialButton>
      </SocialButtons>
      <Links>
        <Link href="#"
            onClick={(e) => {
                e.preventDefault();
                switchToSignup();
            }}
            >회원가입</Link>
        <Link href="/">비밀번호 찾기</Link>
      </Links>
    </FormContainer>
  );
};

export default Login;

const Links = styled.div`
  margin-top: 0.75rem;
  display: flex;
  justify-content: flex-end;
  gap: 1.313rem;
  width: 100%;
`;

const Link = styled(SmallCaptionTypo).attrs({as: "a"})`
  text-decoration: none; // 링크 기본 밑줄
  color: white;
  &:hover {
    text-decoration: underline;
  }
`;