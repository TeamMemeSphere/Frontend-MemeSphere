import styled from "styled-components";
import { forwardRef, useRef, useState } from "react";
import { useAuth } from "../../hooks/common/useAuth";

interface ChatInputProps {
    onSend: (inputMessage: string) => void;
}

const ChatInput = forwardRef<HTMLDivElement, ChatInputProps>(({ onSend }, containerRef) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [inputMessage, setInputMessage] = useState<string>("");

    const sendMessage = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            setInputMessage("");
            onSend(inputMessage);
            textarea.style.height = "auto";
        }
    }
    
    const handleChange = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            setInputMessage(textarea.value);
            textarea.style.height = "auto";
            textarea.style.height = textarea.scrollHeight + "px";
            textarea.style.maxHeight = "10rem";
        }
    }

    const { isAuthenticated } = useAuth();

    return (
        <Container ref={containerRef}>
            <InputWrapper>
                <TextArea
                    ref={textareaRef}
                    rows={1}
                    onChange={handleChange}
                    value={inputMessage}
                    placeholder={isAuthenticated ? "의견을 적어주세요." : "로그인 후 이용 가능합니다."} 
                    disabled={!isAuthenticated}/>
            </InputWrapper>
            <SendButton onClick={isAuthenticated ? sendMessage : () => {}} disabled={!isAuthenticated}>
            </SendButton>
        </Container>
    )
})

export default ChatInput;

const Container = styled.div`
    box-sizing: border-box;
    width: 100%;
    min-height: 4.563rem;
    max-height: 50%;
    height: auto;
    display: flex;
    padding: 1.063rem 1.25rem;
    flex-shrink: 0;
    background-color: var(--grey-100);
    align-items: end;
    border-radius: 0 0 1.25rem 1.25rem;
`;

const InputWrapper = styled.div`
    box-sizing: border-box;
    min-height: 100%;
    width: 100%;
    border-radius: 1.219rem;
    background-color: var(--white-5);
    padding: 0.5rem 1.313rem;
    display: flex;
    align-items: center;
    align-self: center;
`

const TextArea = styled.textarea`
    color: var(--white-100);
    box-sizing: border-box;
    background-color: transparent;
    border: none;
    width: 100%;
    height: 100%;
    padding: 0;

    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 23px;

    &:focus {
        outline: none;
    }

    &::placeholder {
        color: var(--white-50);
        font-family: Pretendard;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 23px;
    }

    &::-webkit-scrollbar {
        display: none;
    }

    resize: none;

`

const SendButton = styled.button`
    box-sizing: border-box;
    background: url("/assets/DetailPage/send.svg");
    background-repeat: no-repeat;
    background-position: center;
    background-color: ${({ disabled }) => disabled ? "var(--white-10)" : "var(--blue)"};
    width: 1.313rem;
    height: 1.313rem;
    margin-left: 0.688rem;

    padding: 1.219rem;
    border-radius: 1.219rem;
    border: none;

    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 1px solid transparent;

    &:hover {
        background-color: ${({ disabled }) => disabled ? "var(--white-10)" : "var(--blue)"};
    }
`