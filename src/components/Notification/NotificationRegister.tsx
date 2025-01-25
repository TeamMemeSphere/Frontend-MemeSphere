import styled from "styled-components";
import * as S from "../../styles/Typography.ts";
import SelectDirection from "./SelectDirection.tsx";
import { useState } from "react";
import NotificationInput from "./NotificationInput.tsx";

const coinMap : Record<string, string>= {
    도지코인 : "DOGE",
    온도파이낸스 : "ONDO",
    도람프 : "TRUMP",
    페페 : "PEPE",
    페치 : "FET",
    봉크 : "BONK",
    폰케 : "PONKE",
};

const NotificationRegister : React.FC = () => {
    const [coinName, setCoinName] = useState("");
    const [coinSymbol, setCoinSymbol] = useState("");
    
    const handleNameChange = (e : React.ChangeEvent<HTMLInputElement>) : void => {
        const name = e.target.value;
        setCoinName(name);

        if (coinMap[name]) {
            setCoinSymbol(coinMap[name]);
        } else {
            setCoinSymbol("");
        }
};

    const handleSymbolChange = (e : React.ChangeEvent<HTMLInputElement>) : void => {
        const symbol = e.target.value.toUpperCase();
        setCoinSymbol(symbol);

        const name = Object.keys(coinMap).find((key) => coinMap[key] === symbol);
        if (name) {
            setCoinName(name);
        } else {
            
                setCoinName(""); // 매핑되지 않는 경우 초기화
        }
};

    return <Container>
        <S.SubTitle3Typo>알림 등록하기</S.SubTitle3Typo>
        <Content>
            <InputWrapper>
                <NotificationInput
                    label="코인 이름"
                    inputProps={{
                        type:"text",
                        placeholder:"이름을 입력해주세요"}}
                    gap="1.875rem"
                    labelWidth="4.563rem"
                    inputWidth="13.625rem"
                    align="left"
                />
                <NotificationInput
                    label="Symbol"
                    inputProps={{
                        type:"text",
                        placeholder:"symbol을 입력해주세요"}}
                    gap="1.875rem"
                    labelWidth="4.563rem"
                    inputWidth="13.625rem"
                    align="left"
                />
            </InputWrapper>
            <Setting>
                <Left>
                    <NotificationInput
                        label="변동성"
                        inputProps={{placeholder:"5"}}
                        gap="0.625rem"
                        caption="%"
                        labelWidth="3.75rem"
                        inputWidth="2.875rem"
                        align="right"
                    />
                    <NotificationInput
                        label="기준 시간"
                        inputProps={{placeholder:"2"}}
                        gap="0.625rem"
                        caption="분"
                        labelWidth="3.75rem"
                        inputWidth="2.875rem"
                        align="right"
                    />
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

const Setting = styled.div`
    display : flex;
    gap : 1.625rem;
`;

const Left = styled.div`
    display : inline-flex;
    flex-direction : column;
    gap : 0.625rem;
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