import styled from "styled-components";
import * as S from "./../../styles/Typography.ts";
import AlertHistoryBox from "./AlertHistoryBox.tsx";
import { notificationType } from "./NotificationType.ts";
import { useState } from "react";

const NotificationDummy : notificationType[]= [
    {
    notificationId: 1,
    name:"도지코인",
    symbol:"DOGE",
    volatility:30,
    stTime:2,
    isRising:true,
    isOn: true,
    },
    {
    notificationId: 2,
    name:"도지코인",
    symbol:"DOGE",
    volatility:30,
    stTime:2,
    isRising:true,
    isOn: true,
    },
    {
    notificationId: 3,
    name:"도지코인",
    symbol:"DOGE",
    volatility:30,
    stTime:2,
    isRising:true,
    isOn: true,
    }
];

type NotificationHistoryProps = {
    closeModal : () => void;
}

const NotificationHistory : React.FC<NotificationHistoryProps> = ({closeModal}) => {
    const [historyList, setHistoryList] = useState(NotificationDummy);

    const deleteHistory = (id : number) =>{
        setHistoryList((prevList)=>
            prevList.filter((history)=> history.notificationId !== id)
        );
    };

    return <Container>
        <S.SubTitle3Typo>알림 내역</S.SubTitle3Typo>
        {historyList.map((notificiation)=>
            <AlertHistoryBox key={notificiation.notificationId} deleteHistory={deleteHistory}
            closeModal={closeModal}
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