import styled from "styled-components";
import * as S from "./../../styles/Typography.ts";
import AlertHistoryBox from "./AlertHistoryBox.tsx";
import { notificationType } from "./NotificationType.ts";
import { useState } from "react";

const NotificationDummy : notificationType[]= [
    {
    id: 1,
    name:"도지코인",
    symbol:"DOGE",
    volatility:30,
    period:2,
    direction:"RISE",
    isAlertOn: "ON",
    },
    {
    id: 2,
    name:"봉크",
    symbol:"BONK",
    volatility:3,
    period:60,
    direction:"RISE",
    isAlertOn: "ON",
    },
    {
    id: 3,
    name:"페페",
    symbol:"PEPE",
    volatility:3,
    period:2,
    direction:"FALL",
    isAlertOn: "ON",
    }
];

const NotificationHistory : React.FC = () => {
    const [historyList, setHistoryList] = useState(NotificationDummy);

    const deleteHistory = (id : number) =>{
        setHistoryList((prevList)=>
            prevList.filter((history)=> history.id !== id)
        );
    };

    return <Container>
        <S.SubTitle3Typo>알림 내역</S.SubTitle3Typo>
        {historyList.map((notificiation)=>
            <AlertHistoryBox key={notificiation.id} deleteHistory={deleteHistory}
            {...notificiation}/>
        )}
    </Container>;
};

export default NotificationHistory;

const Container = styled.div`
    display : flex;
    flex-direction : column;
    justify-content: flex-start;
    width : 20.875rem;
    height : 47.75rem;
    gap : 0.688rem;
    align-items: flex-start;
`;