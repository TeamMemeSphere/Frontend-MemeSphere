import styled from "styled-components";
import * as S from "../../styles/Typography.ts";
import { notificationType } from "./NotificationType.ts";

type NotificationCardProps = notificationType & {
    toggleNotification : (id:number) => void,
    deleteNotification : (id : number)=>void,

}
const NotificationCard : React.FC<NotificationCardProps> = ({notificationId, name, symbol, volatility, stTime, isRising, isOn, toggleNotification, deleteNotification}) => {
    
    return <Card>
        <Typo width="6.688rem">{name}
            ({symbol})</Typo>
        <Typo width="2rem">{volatility}%</Typo>
        <Typo width="2.813rem">{stTime}분</Typo>
        <Typo width="2.875rem">{isRising ? "상승" : "하락"}</Typo>
        <Buttons>
            {isOn 
            ? <ActiveBellIcon src="/assets/Notification/Greenbell.svg" onClick={()=>toggleNotification(notificationId)}/> 
            : <InactiveBellIcon src="/assets/Notification/InactvieBell.svg"onClick={()=>toggleNotification(notificationId)}/>}
            <TrashIcon src="/assets/Notification/trash.svg" onClick={()=>deleteNotification(notificationId)}/>
        </Buttons>
    </Card>;
};

export default NotificationCard;

const Card = styled.div`
    display : flex;
    width : 20.938rem;
    height : 1.5rem; 
    gap : 0.938rem;
    align-items: center;
    border-bottom: 1px solid var(--White-10, rgba(255, 255, 255, 0.10));
    padding : 0.625rem 0.938rem;
`;

const Typo = styled(S.CaptionTypoRegular)<{width?:string}>`
    color: var(--white-100);
    text-align: center;
    width: ${({width})=>width};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const Buttons = styled.div`
    display : flex;
    gap: 0.25rem;
    align-items: center;
`;

const Button = styled.img`
    display : flex;
    width : 0.75rem;
    height : 0.75rem;
    padding : 0.375rem;
    justify-content: center;
    align-items: center;
    border-radius: 0.313rem;
    cursor: pointer;
`;

const ActiveBellIcon = styled(Button)`
    border: 1px solid var(--green, #4FFC91);
`;

const InactiveBellIcon = styled(Button)`
    border: 1px solid var(--white-60, rgba(255, 255, 255, 0.6));
`;

const TrashIcon = styled(Button)`
    border: 1px solid var(--red, #FB6571);
`;