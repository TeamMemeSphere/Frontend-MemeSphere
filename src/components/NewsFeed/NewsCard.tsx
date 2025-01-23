import cardImage from "../../../public/assets/NewsFeed/NewsCardImage.png";
import styled from "styled-components";
import { CaptionTypoRegular, SubTitle2Typo } from "../../styles/Typography";
import coinProfile from "../../../public/assets/NewsFeed/CoinCircle.svg";
import Dot from "../../../public/assets/NewsFeed/Dot.svg";

const NewsCard = () => {
  return (
    <Wrapper>
      <NewsImage src={cardImage} alt="뉴스 썸네일" />

      <ProfileContainer>
        <CoinImage src={coinProfile} alt="시바이누 프로필" />
        <CoinName>시바이누</CoinName>
        <Price>-20.3%</Price>
      </ProfileContainer>

      <SubTitle2Typo>
        시바이누(SHIB), 주요 지지선 이탈... 고래 매도세 속 추가 하락 경고
      </SubTitle2Typo>

      <BottomContainer>
        <CoinName>23분 전</CoinName>
        <img src={Dot} style={{ marginRight: "0.469rem" }} />
        <CoinName>코인리더스</CoinName>
      </BottomContainer>
    </Wrapper>
  );
};

export default NewsCard;

const Wrapper = styled.div`
  width: 21.375rem;
  height: 19.875rem;
`;

const NewsImage = styled.img`
  width: 100%;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.625rem;
  margin-bottom: 0.438rem;
`;

const CoinImage = styled.img`
  margin-right: 0.625rem;
`;

const CoinName = styled(CaptionTypoRegular)`
  color: var(--white-50);
  margin-right: 0.625rem;
`;

const Price = styled(CaptionTypoRegular)`
  color: var(--red);
`;

const BottomContainer = styled.div`
  color: var(--white-50);
  margin-bottom: 1.875rem;
  display: flex;
`;
