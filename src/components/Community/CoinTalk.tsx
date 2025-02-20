import styled from "styled-components";
import * as S from "./../../styles/Typography.ts";
import { NavLink } from "react-router-dom";
import ChatContent from "./ChatContent.tsx";
import { coinInfo } from "./communityTypes.ts";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_ENDPOINTS } from "../../api/api.ts";
import { useState, useEffect } from "react";

const fetchChatData = async (id: number) => {
    try {
        const chatResponse = await axios.get(API_ENDPOINTS.CHATTING(id));
        if (chatResponse.status === 200) {
            return chatResponse.data; 
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                const { status } = error.response;

                if (status === 404) {
                    console.warn(`No data found for ID ${id}`);
                }
            } else {
                console.error(`Axios error occurred while fetching data for ID ${id}:`, error.message);
            }
        } else {
            console.error(`Unexpected error fetching data for ID ${id}:`, error);
        }
    }
};

const CoinTalk : React.FC<coinInfo> = ({id, name, symbol, image}) => {
    const { data, error, isLoading } = useQuery({
        queryKey: ["chatData",id],
        queryFn: () => fetchChatData(id),
    });
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
    
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    const hasChat = data && typeof data === "object" && "result" in data;
    

    return ( isMobile
        ? 
        <CardMobile>
            <CoinHeaderMobile>
                    <CoinImgContainer>
                        <CoinImg src={image} alt="img" />
                    </CoinImgContainer>
                    <CoinNameMobile>{name}</CoinNameMobile>
                    <CoinSymbolMobile>{`/${symbol}`}</CoinSymbolMobile>
            </CoinHeaderMobile>
            <TalkContentMobile>
                {isLoading ? (
                    <SkeletonChatMobile />
                ) : error ? (
                    <NoContentMobile>
                        <NoContentComment>데이터를 불러오는 중 오류가 발생했습니다.</NoContentComment>
                    </NoContentMobile>
                ) : hasChat ? (
                    <ChatContent {...data.result} />
                ) : (
                    <NoContentMobile>
                        <NoContentComment>아직 등록된 글이 없습니다.</NoContentComment>
                    </NoContentMobile>
                )}
            </TalkContentMobile>
            <ViewMoreMobile to={`/CoinDetailPage/${id}`}>
                <GoMore>자세히 보러가기</GoMore>
                <MoreIconMobile src="/assets/Community/ChatChevron.svg" />
            </ViewMoreMobile>
        </CardMobile>
        : 
    <Card>
        <CoinHeader>
            <HeaderLeft>
                <CoinImgContainer>
                    <CoinImg src={image} alt="img"></CoinImg>
                </CoinImgContainer>
                <CoinName>{name}</CoinName>
                <CoinSymbol>{`/${symbol}`}</CoinSymbol>
            </HeaderLeft>
            <ViewMore to={`/CoinDetailPage/${id}`}>
                <GoMore>자세히 보러가기</GoMore>
                <MoreIcon src="/assets/Community/ChatChevron.svg"></MoreIcon>
            </ViewMore>
        </CoinHeader>
        <TalkContent>
            {isLoading ? (
                    <SkeletonChat />
                ) : error ? (
                    <NoContent>
                        <NoContentComment>데이터를 불러오는 중 오류가 발생했습니다.</NoContentComment>
                    </NoContent>
                ) : hasChat ? (
                    <ChatContent {...data.result} />
                ) : (
                    <NoContent>
                        <NoContentComment>아직 등록된 글이 없습니다.</NoContentComment>
                    </NoContent>
                )}
        </TalkContent>
    </Card>
    );
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

const CardMobile = styled.div`
    display: flex;
    width: 90%;
    padding: 1rem;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    border-radius: 1rem;
    background-color: var(--grey-100);
    @media (max-width: 768px) {
        width: 95%;
        padding: 0.75rem;
        gap: 0.4rem;
    }
`;

const CoinHeaderMobile = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    gap: 0.5rem;
`;

const CoinNameMobile = styled(S.SubTitle2Typo)`
    margin-left: 0.9vw;
    margin-right: 0.4vw;
    font-size: 1rem;

    @media (max-width: 768px) {
        font-size: 0.9rem;
    }
`;

const CoinSymbolMobile = styled(S.CaptionTypoRegular)`
    color: var(--white-60);
    font-size: 0.9rem;

    @media (max-width: 768px) {
        font-size: 0.8rem;
    }
`;

const ViewMoreMobile = styled(NavLink)`
    display: flex;
    width: 6rem;
    height: 1.5rem;
    text-decoration: none;
    border-radius: 0.5rem;
    align-items: center;
    justify-content: center;
    background-color: var(--Primary-purple, #7061F0);
    gap: 0.5vw;
    margin-left: auto;
`;

const MoreIconMobile = styled.img`
    width: 0.3rem;
    height: 0.5rem;
`;

const TalkContentMobile = styled.div`
    display: flex;
    width: 100%;
    padding: 0 1vw;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
`;

const NoContentMobile = styled.div`
    display: flex;
    width: 90%;
    height: auto;
    background: var(--white-10);
    padding: 1.5vh 4vw;
    gap: 0.4rem;
    border-radius: 0.8rem;
`;

const SkeletonChatMobile = styled.div`
    display: flex;
    width: 90%;
    height: 8vh;
    gap: 0.4rem;
    border-radius: 0.8rem;

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
        border-radius: 0.8rem;
    }
`;