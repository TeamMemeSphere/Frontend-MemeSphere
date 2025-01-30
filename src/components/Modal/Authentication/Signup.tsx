import React from "react";
import { StyledInput, ErrorMessage, Label, InputContainer, FormContainer, Form, Button, Separator, SocialButtons, SocialButton, SocialImage } from "./SharedAuthenticationStyles";
import { useFormValidation } from "./FormValidation";

const Signup: React.FC = () => {
  const { email, password, handleBlur, handleChange } = useFormValidation({
    emailInvalid: "이메일 주소가 유효하지 않습니다.",
    passwordInvalid: "비밀번호는 최소 8자 이상이며 영문/숫자/특수문자 중 두 가지 이상의 조합이어야 합니다.",
  });

  return (
    <>
    <FormContainer>
      <Form>
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
            hasError={!!email.error}
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
            hasError={!!password.error}
          />
          {password.error && <ErrorMessage>{password.error}</ErrorMessage>}
        </InputContainer>
        <Button type="submit">회원가입</Button>
      </Form>
      <Separator src="../../../public/assets/common/autentication/Autentication Distinction.svg" />
      <SocialButtons>
        <SocialButton>
        <SocialImage src="../../../public/assets/common/autentication/kakaotalk icon.svg" />
          카카오로 시작하기</SocialButton>
        <SocialButton>Google로 시작하기</SocialButton>
      </SocialButtons>
    </FormContainer>
  </>
  );
};

export default Signup;

