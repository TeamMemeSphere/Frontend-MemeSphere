import styled from "styled-components";
import * as S from "./../../styles/Typography.ts";
import { NavLink } from "react-router-dom";
import ChatContent from "./ChatContent.tsx";
import { chatInfo } from "./chatInfo.ts";

type CoinTalkProps = {
    id : number,
    name : string,
    symbol : string,
    chatInfo? : chatInfo
}


const CoinTalk : React.FC<CoinTalkProps> = ({id, name, symbol, chatInfo}) => {


    return <Card>
        <CoinHeader>
            <HeaderLeft>
                <CoinImgContainer>
                    <CoinImg src="https://newsimg.sedaily.com/2024/04/25/2D81TKWA1A_1.jpg" alt="img"></CoinImg>
                </CoinImgContainer>
                <CoinName>{name}</CoinName>
                <CoinSymbol>{`/${symbol}`}</CoinSymbol>
            </HeaderLeft>
            <ViewMore to={"/CoinDetailPage"}>
                <GoMore>자세히 보러가기</GoMore>
                <MoreIcon src="./../../../public/assets/Community/ChatChevron.svg"></MoreIcon>
            </ViewMore>
        </CoinHeader>
        <TalkContent>
            {chatInfo 
                ? <ChatContent {...chatInfo}>

                </ChatContent>
                : <NoContent><NoContentComment>아직 등록된 글이 없습니다.</NoContentComment></NoContent>}
        </TalkContent>
    </Card>;
};

export default CoinTalk;

const Card = styled.div`
    display: flex;
    width: 47.153vw;
    padding : 1.25rem;
    flex-direction: column;
    align-items: center;
    gap: 0.781vh;
    border-radius : 1.25rem;
    background-color : var(--grey-100);
`;

const CoinHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
`;

const CoinImgContainer = styled.div`
    width : 2.188rem;
    height : 2.188rem;
    border-radius : 50%;
    overflow: hidden;
`;
const CoinImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const HeaderLeft = styled.div`
    display : flex;
    align-items: center;
`;
const CoinName = styled(S.SubTitle2Typo)`
    margin-left : 0.903vw;
    margin-right : 0.417vw;
`;

const CoinSymbol = styled(S.CaptionTypoRegular)`
    color : var(--white-60);
`;

const NoContentComment = styled(S.CaptionTypoRegular)`
    color : var(--white-100);
`;

const ViewMore = styled(NavLink)`
    display : flex;
    width : 7.625rem;
    height : 1.875rem;
    text-decoration: none;
    border-radius: 0.625rem;
    align-items : center;
    justify-content: center;
    background-color : var(--Primary-purple, #7061F0);
    gap : 0.694vw;
`;

const GoMore = styled(S.SmallCaptionTypo)`
    color : var(--white-100);
`;

const MoreIcon = styled.img`
    width : 0.375rem;
    height : 0.625rem; 
`;
const TalkContent = styled.div`
    display: flex;
    width: 47.153vw;
    padding: 0 1.042vw;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
`;

const NoContent = styled.div`
    display : flex;
    width : 41.597vw;
    height : auto;
    background : var(--white-10);
    padding : 1.758vh 2.778vw;
    gap : 0.5rem;
    border-radius : 0.938rem;
`;