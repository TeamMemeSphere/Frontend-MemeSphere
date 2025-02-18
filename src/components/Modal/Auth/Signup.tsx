import React, { useState } from "react";
import { StyledInput, ErrorMessage, Label, InputContainer, FormContainer, Form, Button, Separator, SocialButtons, SocialButton, SocialImage } from "./SharedAuthenticationStyles";
import { useFormValidation } from "./FormValidation";
import { useSocialLogin } from "../../../hooks/common/useSocialLogin";

interface SignupProps {
  onSignup: (email: string, password: string) => void;
}

const Signup: React.FC<SignupProps> = ({ onSignup }) => {
  const { email, password, passwordConfirm, handleBlur, handleChange } = useFormValidation({
    emailInvalid: "이메일 주소가 유효하지 않습니다.",
    passwordInvalid: "비밀번호는 최소 7자 이상이며 영문/숫자/특수문자 중 두 가지 이상의 조합이어야 합니다.",
    passwordConfirmInvalid: "비밀번호가 일치하지 않습니다",
  });
  const emailValue = email.value;
  const passwordValue = password.value;

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (!emailValue || !passwordValue || !passwordConfirm.value) {
      return;
    }

    // 회원가입 완료 로직
    if(!email.error && !password.error && !passwordConfirm.error) {
      onSignup(email.value, password.value);
    }
  };

  const {handleSocialLogin} = useSocialLogin();

  return (
    <>
    <FormContainer>
      <Form onSubmit={handleSignup}>
        <InputContainer>
          <Label>아이디</Label>
          <StyledInput
            type="email"
            id="email"
            name="email"
            placeholder="이메일 주소를 입력해주세요"
            value={email.value}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            $hasError={isSubmitted && (!!email.error || !email.value)}
            autoComplete="new-email"
          />
          {email.error && <ErrorMessage>{email.error}</ErrorMessage>}
        </InputContainer>
        <InputContainer>
          <Label>비밀번호</Label>
          <StyledInput
            type="password"
            id="password"
            name="password"
            placeholder="비밀번호를 입력해주세요"
            value={password.value}
            onChange={(e) => handleChange("password", e.target.value)}
            onBlur={() => handleBlur("password")}
            $hasError={isSubmitted && (!!password.error || !password.value)}
            autoComplete="new-password"
          />
          {password.error && <ErrorMessage>{password.error}</ErrorMessage>}
        </InputContainer>
        <InputContainer>
          <Label>비밀번호 확인</Label>
          <StyledInput
            type="password"
            id="passwordConfirm"
            name="passwordConfirm"
            placeholder="비밀번호를 다시 입력해주세요"
            value={passwordConfirm.value}
            onChange={(e) => handleChange("passwordConfirm", e.target.value)}
            onBlur={() => handleBlur("passwordConfirm")}
            $hasError={isSubmitted && (!!passwordConfirm.error || !passwordConfirm.value)}
            autoComplete="new-password"
          />
          {passwordConfirm.error && <ErrorMessage>{passwordConfirm.error}</ErrorMessage>}
        </InputContainer>
        <Button type="submit">회원가입</Button>
      </Form>
      <Separator src="/assets/common/autentication/Autentication Distinction.svg" />
      <SocialButtons>
        <SocialButton onClick={() => handleSocialLogin("kakao")}>
          <SocialImage src="/assets/common/autentication/kakaotalk icon.svg" />
            카카오로 시작하기
        </SocialButton>
        <SocialButton onClick={() => handleSocialLogin("google")}>
          <SocialImage src="/assets/common/autentication/google icon.svg"/>
          Google로 시작하기
          </SocialButton>
      </SocialButtons>
    </FormContainer>
  </>
  );
};

export default Signup;