import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { SubTitle2Typo } from "../../styles/Typography";
import bellIcon from "../../../public/assets/Modal/notification-icon.svg";
import NotificationRegister from "../Notification/NotificationRegister";
import NotificationList from "../Notification/NotificationList";
import NotificationHistory from "../Notification/NotificationHistory";
import { notificationWithoutId } from "../Notification/NotificationType";
import { useNotification } from "../../hooks/common/useNotification";

interface ModalProps {
  closeModal: () => void;
  accessToken : string;
  refreshToken? : string;
}


const AlarmModal: React.FC<ModalProps> = ({ closeModal, accessToken }) => {
  const [alertCount, setAlertCount] = useState(0);
  
  const {
    data: notificationList, 
    addNotification, 
    deleteNotification,
    toggleNotification
  } = useNotification(accessToken);

  useEffect(() => {
    const newCount = notificationList?.length ?? 0;
  
    setAlertCount(prev => {
      if (prev !== newCount) {
        return newCount;
      }
      return prev;
    });
  }, [notificationList]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const createNotifcation = (newNotification : notificationWithoutId) => {
    if(alertCount >= 8){
      alert("알림은 최대 8개까지 등록할 수 있습니다.");
      return;
    }
    addNotification(newNotification);
  };

  const callDeleteNotification = (id : number) => {
    deleteNotification(id);
  };

  const callToggleNotification = (id : number) => {
    toggleNotification(id);
};


  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent>
        <FlexContainer>
          <StyledImg src={bellIcon} />
          <SubTitle2Typo>알림</SubTitle2Typo>
          <CloseButton src="/assets/Notification/closeButton.svg" onClick={closeModal}/>
        </FlexContainer>
        <NotificationContainer>
          <LeftSide>
            <NotificationRegister createNotification={createNotifcation}/>
            <NotificationList notifications={notificationList} toggleNotification={callToggleNotification} deleteNotification={callDeleteNotification}/>
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

const CloseButton = styled.img`
  width : 1.5rem;
  height : 1.5rem;
  flex-shrink: 0;
  margin-left : 38.4rem;
  cursor: pointer;
`;