import React, { useState } from "react";
import styled from "styled-components";
import { Form, FormContainer, InputContainer, Label, StyledInput, Button, ErrorMessage } from "./Auth/SharedAuthenticationStyles";
import { useFormValidation } from "./Auth/FormValidation";
import { API_ENDPOINTS } from "../../api/api";



const ForgotPasswordModal: React.FC<{onClose: () => void}> = ({onClose}) => {
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
            const url = `${API_ENDPOINTS.USER_PASSWORD_SEND}?email=${encodeURIComponent(email.value)}`;

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-type" : "application/json"
                },
            });

            const data = await response.json();
            console.log("비밀번호 찾기 api 응답:", data);

            if (!response.ok) {
                alert (data?.message || `비밀번호 찾기 실패: ${response.status}`);
                console.error("비밀번호 찾기 실패:", response.status, data);
                return;
            }

            if(!data.isSuccess) {
                alert(data.message);
                return;
            }

            alert("임시 비밀번호가 이메일 주소로 전송되었습니다.");
            onClose();
        } catch (error) {
            console.error("비밀번호 찾기 요청 오류:", error);
            alert("비밀번호 찾기 중 문제가 발생했습니다. 다시 시도해주세요.");
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