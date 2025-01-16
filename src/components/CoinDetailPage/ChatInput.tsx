import styled from "styled-components";
import { useRef } from "react";

const ChatInput = () => {

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleResize = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = textarea.scrollHeight + "px";
        }
    }

    return (
        <Container>
            <InputWrapper>
                <TextArea
                    ref={textareaRef}
                    rows={1}
                    onChange={handleResize}
                    placeholder="의견을 적어주세요." />
            </InputWrapper>
            <SendButton>
            </SendButton>
        </Container>
    )
}

export default ChatInput;

const Container = styled.div`
    box-sizing: border-box;
    width: 100%;
    min-height: 4.563rem;
    height: auto;
    display: flex;
    padding: 1.063rem 1.25rem;
    position: absolute;
    bottom: 0;
    background-color: var(--grey-100);
    align-items: end;
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
    background-color: var(--blue);
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
    transition: all 0.5s ease;
    border: 1px solid transparent;

    &:hover {
        border: 1px solid var(--white-100);
    }
`