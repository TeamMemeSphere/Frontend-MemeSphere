import styled from "styled-components";
import * as S from "../../styles/Typography.ts";
import NotificationCard from "./NotificationCard.tsx";
import { notificationType } from "./NotificationType.ts";

type NotificationListProps = {
    notifications : notificationType[];
    toggleNotification : (id : number)=>void;
    deleteNotification : (id : number)=> void;
}
const NotificationList : React.FC<NotificationListProps> = ({notifications, toggleNotification, deleteNotification}) => {
    
    return <Container>
        <S.SubTitle3Typo>등록된 알림 목록</S.SubTitle3Typo>
        <Content>
            <NotifacationHeader>
                <Caption width="6.688rem">이름</Caption>
                <Caption>변동성</Caption>
                <Caption>기준 시간</Caption>
                <Caption>상승/하락</Caption>
            </NotifacationHeader>
            {notifications && notifications.length > 0 
                ?notifications.map((notification)=> {
                return <NotificationCard key={notification.notificationId} {...notification} toggleNotification={toggleNotification} deleteNotification={deleteNotification}/>;
            })
                :(<NoAlart>
                    <NoAlartMessage>등록된 알림이 없습니다.</NoAlartMessage>
                </NoAlart>)
        }
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

const NoAlart = styled.div`
    width: 100%;
    height: 100%;
    display : flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const NoAlartMessage = styled(S.CaptionTypoLight)`
    margin-bottom : 85%;
`;