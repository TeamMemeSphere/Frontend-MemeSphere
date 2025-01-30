import styled from "styled-components";
import * as S from "./../../styles/Typography.ts";
import { notificationType } from "./NotificationType.ts";
import { NavLink } from "react-router-dom";
import React from "react";

type AlertHistoryBoxProps = notificationType & {
    deleteHistory : (id:number)=>void;
    closeModal : () => void;
}

const AlertHistoryBox : React.FC<AlertHistoryBoxProps> = ({id, name, symbol, volatility, period, direction, isAlertOn, deleteHistory, closeModal}) => {


    return <Container>
        <Header>
            <HeaderLeft>
                <Img src="public/assets/Notification/Greenbell.svg" size="1.125rem"/>
                <Timestamp>2025.01.23 16:35</Timestamp>
            </HeaderLeft>
            <Button src="public/assets/Notification/Delete.svg" size="0.875rem"
            onClick={()=>deleteHistory(id)}
            />
        </Header>
        <Content>
            <ContentLeft>
                <Typo width="6.688rem">{name}
                    ({symbol})</Typo>
                <Typo width="2rem">{volatility}%</Typo>
                <Typo width="2.813rem">{period}분</Typo>
                <Typo width="1.563rem">{direction === "RISE" ? "상승" : "하락"}</Typo>
            </ContentLeft>
            <MoreButton to={"/CoinDetailPage"} onClick={()=>closeModal()}>
                <Button src="public/assets/Notification/chevron-right 1.svg" size="1.188rem"/>
            </MoreButton>
        </Content>
    </Container>;

};

export default AlertHistoryBox;

const Container = styled.div`
    display : flex;
    flex-direction : column;
    width : 20.875rem;
    height : 4.563rem;
    flex-shirink : 0;
    border-radius : 0.625rem;
    background : var(--white-10, rgba(255, 255, 255, 0.10));
`;

const Header = styled.div`
    display : flex;
    padding : 0.625rem 0.625rem 0.813rem 0.625rem;
    align-items: center;
    justify-content: space-between;
`;

const HeaderLeft = styled.div`
    display : flex;
    align-items: center;
`;

const Img = styled.img<{size? : string}>`
    width : ${({size})=>size};
    height : ${({size})=>size};
`;

const Timestamp = styled(S.SmallCaptionTypo)`
    color : var(--white-60, rgba(255, 255, 255, 0.60));
    margin-left: 0.313rem;
`;

const Button = styled(Img)`
    cursor : pointer;
`;
const Content = styled.div`
    display : flex;
    align-items: center;
    justify-content: space-between;
    padding : 0 0.875rem 0.875rem 0.813rem;
`;

const ContentLeft = styled.div`
    display : flex;
    justify-content: space-between;
    width : auto;
    gap : 1rem;
`;

const Typo = styled(S.CaptionTypoRegular)<{width?:string}>`
    color: var(--white-100);
    text-align: center;
    display: inline-block;      
    width: fit-content;
    max-width: ${({width})=>width};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;  
`;

const MoreButton = styled(NavLink)`
    text-decoration: none;
`;