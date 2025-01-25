import styled from "styled-components";
import * as S from "../../styles/Typography.ts";
import { ReactNode } from "react";

type NotificationInputProps = {
  label: string;
  gap?: string;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  caption?: ReactNode;
  labelWidth?: string;
  inputWidth?: string;
  align?: "left" | "center" | "right";
};

const NotificationInput : React.FC<NotificationInputProps> = ({
    label,
    inputProps,
    gap,
    caption,
    labelWidth = "4.563rem",
    inputWidth = "13.625rem",
    align = "center",
}) => {
    return <Container $gap={gap}>
        <Name width={labelWidth}>{label}</Name>
        <Input 
          {...inputProps}
          width={inputWidth}
          $align={align}
        />
        {caption && <S.CaptionTypoBold>{caption}</S.CaptionTypoBold>}
    </Container>;
};

export default NotificationInput;

const Container = styled.div<{ $gap?: string }>`
  display : inline-flex;
    gap : ${({ $gap }) => $gap ||  "0.625rem"};
    align-items : center;
`;

const Name = styled(S.CaptionTypoRegular)<{ width?: string}>`
    width : ${({width})=> width || "4.563rem"};
`;

const Input = styled.input<{ width?: string , $align? : string, $isInvalid? :boolean}>`
    display: flex;
    width: ${({width})=> width || "14.438rem"};
    height: 1.625rem;
    padding: 0.188rem 0.625rem 0.188rem 0.625rem;
    justify-content: space-between;
    align-items: center;
    text-align : ${({$align})=> $align || "start"};
    border-radius: 0.313rem;
    border: 1px solid 
        ${({ $isInvalid }) =>
            $isInvalid 
            ? "var(--Secondary-red, #FB6571)" 
            : "var(--White-10, rgba(255, 255, 255, 0.10))"};
    background: var(--White-5, rgba(255, 255, 255, 0.05));
    outline: none;
    color: var(--white-100);

    &:focus {
    border: 1px solid ${({ $isInvalid }) => ($isInvalid ? "var(--Secondary-red, #FB6571)" : "var(--Primary-purple, #7061F0)")};
    }
`;