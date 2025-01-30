import styled from "styled-components";
import * as S from "../../styles/Typography.ts";
import { useState } from "react";
import NotificationCard from "./NotificationCard.tsx";
import { notificationType } from "./NotificationType.ts";

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

const NotificationList = () => {
    const [notifications, setNotifications] = useState(NotificationDummy);

    const toggleNotification = (id : number) => {
        setNotifications((prevNotifications)=>
            prevNotifications.map((notification)=>
                notification.id === id
                    ? {...notification, isAlertOn: notification.isAlertOn === "ON" ? "OFF" : "ON" }
                    : notification
            )
        );
    };

    const deleteNotification = (id : number) => {
        setNotifications((prevNotifications)=>
                prevNotifications.filter((notification)=> notification.id !== id)
        );
    };
    return <Container>
        <S.SubTitle3Typo>등록된 알림 목록</S.SubTitle3Typo>
        <Content>
            <NotifacationHeader>
                <Caption width="6.688rem">이름</Caption>
                <Caption>변동성</Caption>
                <Caption>기준 시간</Caption>
                <Caption>상승/하락</Caption>
            </NotifacationHeader>
            {notifications.map((notification)=> {
                return <NotificationCard key={notification.id} {...notification} toggleNotification={toggleNotification} deleteNotification={deleteNotification}/>;
            })}
        </Content>
    </Container>;
};

export default NotificationList;

const Container = styled.div`
    display : flex;
    flex-direction : column;
    gap : 0.5rem;
    width : 23.813rem;
    height : 27.188rem;
`;


const Content = styled.div`
    display : flex;
    flex-direction : column;
    width : 100%;
    height : 25.5rem; 
    flex-shrink: 0;
    border-radius: 10px;
    align-items: center;
    background: var(--dark-grey, #1E1E20); 
`;

const NotifacationHeader = styled.div`
    display: flex;
    width : 17.313rem;
    height : 2.125rem;
    padding: 0 4.5625rem 0 0.9375rem;
    align-items: center;
    text-align: center;
    gap :0.938rem;
    flex-shrink: 0;
    border-radius: 0.625rem;
    background: var(--white-5);
    margin-top : 0.438rem;
`;

const Caption = styled(S.SmallCaptionTypo)<{width? :string}>`;
    width : ${({width})=>width || "auto;"};
    color: var(--white-60);
`;