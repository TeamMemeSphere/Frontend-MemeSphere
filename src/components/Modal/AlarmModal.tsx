import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { SubTitle2Typo } from "../../styles/Typography";
import bellIcon from "../../../public/assets/Modal/notification-icon.svg";
import NotificationRegister from "../Notification/NotificationRegister";
import NotificationList from "../Notification/NotificationList";
import NotificationHistory from "../Notification/NotificationHistory";
import { notificationType } from "../Notification/NotificationType";


interface ModalProps {
  closeModal: () => void;
}

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


const AlarmModal: React.FC<ModalProps> = ({ closeModal }) => {
  const [notifications, setNotifications] = useState(NotificationDummy);
  const [nextId, setNextId] = useState(4);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const createNotifcation = (newNotification : Omit<notificationType, "id">) => {
    const notificationWithId = {...newNotification, id : nextId};
    setNextId((prevId) => prevId + 1); // 다음 id값 증가
    setNotifications((prevNotifications)=>[...prevNotifications, notificationWithId]);
  };

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

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent>
        <FlexContainer>
          <StyledImg src={bellIcon} />
          <SubTitle2Typo>알림</SubTitle2Typo>
        </FlexContainer>
        <NotificationContainer>
          <LeftSide>
            <NotificationRegister createNotification={createNotifcation}/>
            <NotificationList notifications={notifications} toggleNotification={toggleNotification} deleteNotification={deleteNotification}/>
          </LeftSide>
          <DividerLine/>
          <RightSide>
            <NotificationHistory></NotificationHistory>
          </RightSide>
        </NotificationContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AlarmModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  z-index: 10;
`;
const StyledImg = styled.img`
  display: flex;
  width: 2.563rem;
  height: 2.563rem;
`;
const ModalContent = styled.div`
  width: 49.313rem;
  height: 53.864rem;
  background: #2A2A2F;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  margin-top : 6.761rem;
  margin-right : 3.875rem;
  border-radius: 1.25rem;
`;

const FlexContainer = styled.div`
  display: flex;
  margin-top: 1.239rem;
  margin-left: 1.375rem;
  gap: 0.938rem;
  align-items: center;
`;

const NotificationContainer = styled.div`
  display : flex;
  gap : 0.906rem;
  align-items: center;
  justify-content : center;
  margin : 1.125rem 1.375rem 1.375rem 1.375rem;
`;

const LeftSide = styled.div`
  display : flex;
  flex-direction : column;
  gap : 1.625rem;
  width : 23.813rem;
  height : 47.563rem;
`;

const RightSide = styled.div`
  display : flex;
  flex-direction : column;
  width : 20.875rem;
`;

const DividerLine = styled.div`
  width: 0.063rem;
  height: 47.813rem;
  background: var(--white-10, rgba(255, 255, 255, 0.10));
`;