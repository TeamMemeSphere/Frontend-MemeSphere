import styled from "styled-components";
import * as S from "../../styles/Typography.ts";
import SelectDirection from "./SelectDirection.tsx";

const NotificationRegister : React.FC = () => {
    return <Container>
        <S.SubTitle3Typo>알림 등록하기</S.SubTitle3Typo>
        <Content>
            <InputWrapper>
                <InputBox>
                    <Name width="4.563rem">코인 이름</Name>
                    <Input placeholder="이름을 입력해주세요" width="13.625rem"/>
                </InputBox>
                <InputBox>
                    <Name width="4.563rem">Symbol</Name>
                    <Input placeholder="symbol을 입력해주세요" width="13.625rem"/>
                </InputBox>
            </InputWrapper>
            <Setting>
                <Left>
                    <ValueInput>
                        <Name width="3.75rem">변동성</Name>
                        <Input placeholder="5" width="2.875rem" $align="right"/>
                        <S.CaptionTypoBold>%</S.CaptionTypoBold>
                    </ValueInput>
                    <ValueInput>
                        <Name width="3.75rem">기준 시간</Name>
                        <Input placeholder="2" width="2.875rem" $align="right"/>
                        <S.CaptionTypoBold>분</S.CaptionTypoBold>
                    </ValueInput>
                </Left>
                <SelectDirection>
                </SelectDirection>
            </Setting>
            <RegisterButton>저장하기</RegisterButton>
        </Content>
    </Container>;
};

export default NotificationRegister;

const Container = styled.div`
    display : flex;
    flex-direction : column;
    gap : 0.438rem;
    width : 23.813rem;
    height : 18.75rem;
`;


const Content = styled.div`
    display : flex;
    flex-direction : column;
    align-items : center;
    justify-content: center;
    width : 23.813rem;
    height : 17.125rem;
    gap: 1.406rem;
    flex-shrink: 0;
    border-radius: 10px;
    background: var(--dark-grey, #1E1E20); 
`;

const InputWrapper = styled.div`
    display : flex;
    flex-direction : column;
    gap : 0.625rem;
`;

const InputBox = styled.div`
    display : inline-flex;
    align-items : center;
    gap : 1.875rem;
`;

const Name = styled(S.CaptionTypoRegular)<{ width?: string}>`
    width : ${({width})=> width || "4.563rem"};
`;

const Input = styled.input<{ width?: string , $align? : string}>`
    display: flex;
    width: ${({width})=> width || "14.438rem"};
    height: 1.625rem;
    padding: 0.188rem 0.625rem 0.188rem 0.625rem;
    justify-content: space-between;
    align-items: center;
    text-align : ${({$align})=> $align || "start"};
    border-radius: 0.313rem;
    border: 1px solid var(--White-10, rgba(255, 255, 255, 0.10));
    background: var(--White-5, rgba(255, 255, 255, 0.05));
    outline: none;
    color: var(--white-100);

    &:focus {
    border: 1px solid var(--Primary-purple, #7061F0);
    }
`;

const Setting = styled.div`
    display : flex;
    gap : 1.625rem;
`;

const Left = styled.div`
    display : inline-flex;
    flex-direction : column;
    gap : 0.625rem;
`;

const ValueInput = styled.div`
    display : inline-flex;
    gap : 0.625rem;
    align-items : center;
`;

const RegisterButton = styled.button`
    all : unset;
    cursor : pointer;

    display: flex;

    width: 10.375rem;
    height: 2.5rem;
    justify-content: center;
    align-items: center;
    gap: 0.625rem;
    flex-shrink: 0;
    margin-bottom: 0.3rem;

    border-radius: 3.125rem;
    background: var(--Primary-purple, #7061F0); 
`;