import styled from "styled-components";
import * as S from "./../../styles/Typography.ts";
import NewsCard from "./NewsCard.tsx";
import { NavLink } from "react-router-dom";

// type NewsCardsProps = {
//     news : string
// }

export type news = {
    id : number;
    article : string;
    sourceName : string;
    time : string;
}
const NewsCards : React.FC = ()=>{
    const newsList :  news[] = [
        {
            id : 1,
            article : "도지코인, 2025년 급등 기대감... 장미빛 전망 잇따라",
            sourceName : "코인리더스",
            time : "6시간 전"
        },
        {
            id : 2,
            article : "도지코인, 2025년 급등 기대감... 장미빛 전망 잇따라",
            sourceName : "코인리더스",
            time : "6시간 전"
        },
        {
            id : 3,
            article : "도지코인, 2025년 급등 기대감... 장미빛 전망 잇따라",
            sourceName : "코인리더스",
            time : "6시간 전"
        },
        {
            id : 4,
            article : "도지코인, 2025년 급등 기대감... 장미빛 전망 잇따라",
            sourceName : "코인리더스",
            time : "6시간 전"
        }
    ];
    
    return <News>
        <Header>
            <NewsTitle>뉴스</NewsTitle>
            <MoreInfo to={"/NewsFeed"}>
                <About>더보기</About>
                <MoreIcon src="assets/Community/chevronRight.svg" alt=" >"></MoreIcon>
            </MoreInfo>
        </Header>
        <Content>
        {newsList.map((news)=> {
            return <NewsCard key = {news.id} article={news.article} sourceName={news.sourceName} time={news.time}></NewsCard>;
        })}
        </Content>
    </News>;
};

export default NewsCards;

const News = styled.div`
    display : flex;
    flex-direction: column;
    width: 19.375rem;
    height: 777px;
    flex-shrink: 0;
    margin-bottom : 25.488vh;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin : 0;
    margin-bottom : 1.172vh;
`;

const NewsTitle = styled(S.SubTitle1Typo)`
    
`;

const Content = styled.div`
    display : flex;
    flex-direction : column;
    gap : 1.25rem;
`;

const MoreInfo = styled(NavLink)`
    display: inline-flex;
    padding: 0 0.313rem;
    align-items: center;
    background : transparent;
    text-decoration : none;
`;

const About = styled(S.CaptionTypoRegular)`
    color: var(--White-60, rgba(255, 255, 255, 0.60));
`;

const MoreIcon = styled.img`
    width : 0.938rem;
    height : 0.938rem;
`;