import styled from "styled-components";
import * as S from "./../../styles/Typography.ts";
import { NavLink } from "react-router-dom";
import ChatContent from "./ChatContent.tsx";
import { coinInfo, chatInfo } from "./communityTypes.ts";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_ENDPOINTS } from "../Constants/api.ts";

const fetchChatData = async (id: number) : Promise<chatInfo | undefined> => {
    try{
        const chatResponse = await axios.get(API_ENDPOINTS.CHATTING(id));

        if(chatResponse.status === 200 && chatResponse.data){
            return chatResponse.data;
        } else if(chatResponse.status === 200 && !chatResponse.data){
            return chatResponse.data;
        }
    }catch (error) {
        if(axios.isAxiosError(error) && error.response){
            const {status, data} = error.response;
        
            if (status === 404) {
                console.warn(`No data found for ID ${id}`);
                return undefined;
            }
            console.error(`Error fetching data for ID ${id}:`, error);
            }
            return undefined;
        }
    };


const CoinTalk : React.FC<coinInfo> = ({id, name, symbol, image}) => {
    const { data, error, isLoading } = useQuery({
        queryKey: ["chatData"],
        queryFn: () => fetchChatData(id),
    });

    return <Card>
        <CoinHeader>
            <HeaderLeft>
                <CoinImgContainer>
                    <CoinImg src={image} alt="img"></CoinImg>
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
            {/* {isLoading ? <SkeletonChat></SkeletonChat>
                : data
                ? <ChatContent {...data}></ChatContent>
                : <NoContent><NoContentComment>아직 등록된 글이 없습니다.</NoContentComment></NoContent>} */}
                <ChatContent id={1} 
                nickname="페페맹신론자"
                message="페페가 시바이누를 추월할 것 같은 느낌
페페 0.0307 시바 0.0338 빗썸에서의 가격입니다. 조만간 역전할 것 같은 느낌입니다. 시바는 몇번 상승할 순간마다 번번히 좌절을 맛보았죠."  
                created_at="2025-02-03T01:18:14.756Z" 
                likes={24} 
                memeCoin="pepe"></ChatContent>
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

const SkeletonChat = styled.div`
    display : flex;
    width : 47.222vw;
    height : 9.625vh;
    gap : 0.5rem;
    border-radius : 0.938rem;

    @keyframes skeleton-gradient {
        0% {
        background-color: rgba(165, 165, 165, 0.1);
        }
        50% {
        background-color: rgba(165, 165, 165, 0.2);
        }
        100% {
        background-color: rgba(165, 165, 165, 0.1);
        }
    }

    &:before {
        content: '';
        width: 100%;
        height: 100%;
        animation: skeleton-gradient 2s infinite ease-in-out;
        border-radius : 0.938rem;
    }
`;