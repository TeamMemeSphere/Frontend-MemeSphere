import styled from "styled-components";
import * as S from "../../styles/Typography.ts";
import { ReactNode } from "react";
import { FieldError } from "react-hook-form";

type NotificationInputProps = {
  label: string;
  gap?: string;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  caption?: ReactNode;
  labelWidth?: string;
  inputWidth?: string;
  align?: "left" | "center" | "right";
  error?: FieldError | undefined;
};

const NotificationInput : React.FC<NotificationInputProps> = ({
    label,
    inputProps,
    gap,
    caption,
    labelWidth = "4.563rem",
    inputWidth = "13.625rem",
    align = "center",
    error,
}) => {

    return <Container $gap={gap}>
        <Name width={labelWidth}>{label}</Name>
        <Input 
            {...inputProps}
            width={inputWidth}
            $align={align}
            $error={error}
            autoComplete="off"
        />
        {caption && <S.CaptionTypoBold>{caption}</S.CaptionTypoBold>}
    </Container>;
};

export default NotificationInput;

const Container = styled.div<{ $gap?: string }>`
    display : inline-flex;
    position : relative;
    gap : ${({ $gap }) => $gap ||  "0.625rem"};
    align-items : center;
`;

const Name = styled(S.CaptionTypoRegular)<{ width?: string}>`
    width : ${({width})=> width || "4.563rem"};
`;

const Input = styled.input<{ width?: string , $align? : string, $error? : FieldError | undefined}>`
    display: flex;
    width: ${({width})=> width || "14.438rem"};
    height: 1.625rem;
    padding: 0.188rem 0.625rem 0.188rem 0.625rem;
    justify-content: space-between;
    align-items: center;
    text-align : ${({$align})=> $align || "left"};
    border-radius: 0.313rem;
    border: 1px solid 
        ${({ $error }) =>
            $error
            ? "var(--red, #FB6571)" 
            : "var(--white-10, rgba(255, 255, 255, 0.10))"};
    background: var(--white-5, rgba(255, 255, 255, 0.05));
    outline: none;
    color: var(--white-100);


    &:focus {
    border: 1px solid ${({ $error }) => ($error 
        ? "var(--red, #FB6571)" 
        : "var(--purple, #7061F0)")};
    }
`;