import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { SubTitle2Typo } from "../../styles/Typography";
import bellIcon from "../../../public/assets/Modal/notification-icon.svg";
import NotificationRegister from "../Notification/NotificationRegister";
import NotificationList from "../Notification/NotificationList";
import NotificationHistory from "../Notification/NotificationHistory";
import { notificationType, notificationWithoutId } from "../Notification/NotificationType";
import { useNotification } from "../../hooks/common/useNotification";

interface ModalProps {
  closeModal: () => void;
  accessToken : string;
  refreshToken : string;
}

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
  name:"봉크",
  symbol:"BONK",
  volatility:3,
  stTime:2,
  isRising:true,
  isOn: true,
  },
  {
  notificationId: 3,
  name:"페페",
  symbol:"PEPE",
  volatility:3,
  stTime:2,
  isRising:true,
  isOn: true,
  }
];


const AlarmModal: React.FC<ModalProps> = ({ closeModal, accessToken, refreshToken }) => {
  const [notifications, setNotifications] = useState(NotificationDummy);
  const [alertCount, setAlertCount] = useState(0);
  const {data: notificationList, addNotification} = useNotification(accessToken);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const createNotifcation = (newNotification : notificationWithoutId) => {
      console.log("createNotificaton",newNotification);
      addNotification(newNotification);
  
  
  };

  const toggleNotification = (id : number) => {
    setNotifications((prevNotifications)=>
        prevNotifications.map((notification)=>
            notification.notificationId === id
                ? {...notification, isOn: notification.isOn === true ? false : true }
                : notification
        )
    );
};

const deleteNotification = (id : number) => {
    setNotifications((prevNotifications)=>
            prevNotifications.filter((notification)=> notification.notificationId !== id)
    );
    setAlertCount((prev)=>prev-1);
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
            <NotificationList notifications={notificationList} toggleNotification={toggleNotification} deleteNotification={deleteNotification}/>
          </LeftSide>
          <DividerLine/>
          <RightSide>
            <NotificationHistory closeModal={closeModal}></NotificationHistory>
          </RightSide>
        </NotificationContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AlarmModal;

const ModalOverlay = styled.div`
  position: absolute;
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