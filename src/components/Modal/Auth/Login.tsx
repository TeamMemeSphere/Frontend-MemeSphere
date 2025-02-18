import React, { useState } from "react";
import styled from "styled-components";
import { SmallCaptionTypo } from "../../../styles/Typography";
import {
  StyledInput,
  ErrorMessage,
  FormContainer,
  Form,
  InputContainer,
  Label,
  Button,
  Separator,
  SocialButtons,
  SocialButton,
  SocialImage,
} from "./SharedAuthenticationStyles";
import { useFormValidation } from "./FormValidation";
import { API_ENDPOINTS } from "../../../api/api";
import { useAuth } from "../../../hooks/common/useAuth";
import { useSocialLogin } from "../../../hooks/common/useSocialLogin";

interface LoginProps {
  switchToForgotPassword: () => void;
  switchToSignup: () => void;
  onLogin?: () => void;
}

const Login: React.FC<LoginProps> = ({ switchToSignup, switchToForgotPassword, onLogin }) => {
  const { login } = useAuth();
  const { handleSocialLogin } = useSocialLogin();
  const { email, password, handleBlur, handleChange } = useFormValidation({
    emailInvalid: "이메일 형식이 아닙니다.",
    passwordInvalid: "비밀번호 형식이 아닙니다.",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();
    setIsSubmitted(true);

    if (!email.value || !password.value) {
      return;
    }

    try {
      const loginData = {
        email: email.value,
        password: password.value,
      };

      const response = await fetch(API_ENDPOINTS.USER_SIGNIN, {
        headers: {
          "Content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(loginData),
      });

      const data = await response.json();
      if (!response.ok) {
        alert(data?.message || `로그인 실패: ${response.status}`);
        console.error("로그인 실패:", response.status, data);
        return;
      }

      if (!data.isSuccess) {
        alert(data.message);
        return;
      }
      
      if (data.isSuccess && data.result) {
        login(data.result.accessToken, data.result.refreshToken, data.result.nickName);
        window.dispatchEvent(new Event("storage"));
        onLogin?.();
      } else {
        alert("로그인 실패:" + response.status);
      }
    } catch (error) {
      console.error("로그인 요청 오류:", error);
      alert("로그인 요청 중 문제가 발생했습니다. 다시 시도해주세요.");
    }
  }

  return (
    <FormContainer>
      <Form onSubmit={handleLogin}>
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
            $hasError={isSubmitted && (!!email.error || !email.value)}
            autoComplete="current-email"
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
            $hasError={isSubmitted && (!!password.error || !password.value)}
            autoComplete="current-password"
          />
          {password.error && <ErrorMessage>{password.error}</ErrorMessage>}
        </InputContainer>
        <Button type="submit">로그인</Button>
      </Form>
      <Separator src="/assets/common/autentication/Autentication Distinction.svg" />
      <SocialButtons>
        <SocialButton onClick={() => handleSocialLogin("kakao")}>
          <SocialImage src="/assets/common/autentication/kakaotalk icon.svg" />
          카카오로 로그인하기
        </SocialButton>

        <SocialButton onClick={() => handleSocialLogin("google")}>
          <SocialImage src="/assets/common/autentication/google icon.svg"/>
          Google로 로그인하기
          </SocialButton>

      </SocialButtons>
      <Links>
        <Link
          href="#"
          onClick={(e) => {
            e.preventDefault();
            switchToSignup();
          }}>
          회원가입
        </Link>
        <Link 
          href="/"
          onClick={(e) => {
            e.preventDefault();
            switchToForgotPassword();
          }}>
            비밀번호 찾기</Link>
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

const Link = styled(SmallCaptionTypo).attrs({ as: "a" })`
  text-decoration: none; // 링크 기본 밑줄
  color: white;
  &:hover {
    text-decoration: underline;
  }
`;
