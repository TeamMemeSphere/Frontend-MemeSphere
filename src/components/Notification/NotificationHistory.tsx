import styled from "styled-components";
import * as S from "./../../styles/Typography.ts";
import AlertHistoryBox from "./AlertHistoryBox.tsx";
import useSSEAlert from "../../hooks/common/useSSEAlert.ts";

type NotificationHistoryProps = {
    closeModal : () => void;
}

const NotificationHistory : React.FC<NotificationHistoryProps> = ({closeModal}) => {
    const {alertHistory, deleteHistory} = useSSEAlert();

    // console.log("notificationHistory.tsx: ",alertHistory);
    // console.log("notificationHistory에서 로컬스토리지 값:",localStorage.getItem("alertHistory"));
    return <Container>
        <S.SubTitle3Typo>알림 내역</S.SubTitle3Typo>
        {alertHistory.length > 0
        ? alertHistory.map((notificiation)=>
            <AlertHistoryBox key={notificiation.notificationId} deleteHistory={deleteHistory}
            closeModal={closeModal}
            {...notificiation}/>
        )
        : <S.CaptionTypoRegular>알림 내역이 없습니다.</S.CaptionTypoRegular>
        }
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