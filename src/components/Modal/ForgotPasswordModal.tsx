import React, { useState } from "react";
import styled from "styled-components";
import { Form, FormContainer, InputContainer, Label, StyledInput, Button, ErrorMessage } from "./Auth/SharedAuthenticationStyles";
import { useFormValidation } from "./Auth/FormValidation";
import { API_ENDPOINTS } from "../../api/api";

const ForgotPasswordModal: React.FC = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const {email, handleBlur, handleChange} = useFormValidation({
        emailInvalid: "이메일 형식이 아닙니다."
    });

    async function handleLogin(event: React.FormEvent) {
        event.preventDefault();
        setIsSubmitted(true);

        if (!email.value) {
            return;
        }

        try {
            const emailValue = encodeURIComponent(email.value); // URL 인코딩 (필수)
    const url = `${API_ENDPOINTS.FORGET_PASSWORD}?email=${emailValue}`;

    // console.log("📌 요청 URL:", url); // 디버깅용

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
        
            const data = await response.json();
            // console.log("📌 응답 데이터:", data);
        } catch (error) {
            // console.error("📌 요청 중 오류 발생:", error);
            
        }
    }

    return (
        <Container>
        <FormContainer>
            <Form onSubmit={handleLogin}>
            <InputContainer>
                <Label htmlFor="email">이메일 주소</Label>
                <StyledInput
                    type="email"
                    id="email"
                    name="email"
                    placeholder="memesphere@meme.com"
                    value={email.value}
                    onChange={(e) => handleChange("email", e.target.value)}
                    onBlur={() => handleBlur("email")}
                    $hasError={isSubmitted && (!!email.error || !email.value)}
                />
                {email.error && <ErrorMessage>{email.error}</ErrorMessage>}
            </InputContainer>
            <Button type="submit">비밀번호 메일로 발송하기</Button>
            </Form>
        </FormContainer>
        </Container>
        );
    };

export default ForgotPasswordModal;

const Container = styled.div`
    margin-top: 2rem;
`;