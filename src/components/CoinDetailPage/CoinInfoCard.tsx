import styled, { keyframes } from "styled-components";
import { CommonCard } from "./CommonCardStyle";
import { SubTitle2Typo, SmallCaptionTypo } from "../../styles/Typography";
import CoinCircleImg from "../../../public/assets/DetailPage/CoinProfile.png";
import FireIcon from "../../../public/assets/DetailPage/FireIcon.png";
import { CaptionTypoMedium } from "../../styles/Typography";

interface CoinInfoCardProps {
  name: string;
  symbol: string;
  keywords: string[];
  description: string;
  image: string;
  rank?: number;
}

const CoinInfoCard = ({
  name,
  symbol,
  keywords,
  description,
  image,
  rank,
}: CoinInfoCardProps) => {
  return (
    <CardLayout>
      <MarginFlexContainer>
        <CircleImageWrapper>
          <RotatingKeywords>
            {keywords.map((keyword, index) => (
              <Keyword
                key={index}
                $angle={(index / keywords.length) * 360 + 45}
                $isHighlighted={index === 0 || index === 1}
              >
                #{keyword}
              </Keyword>
            ))}
          </RotatingKeywords>
          <Image src={image || CoinCircleImg} alt={`${name} 프로필`} />
          {rank !== null && <Rank>#{rank}</Rank>}
          <IconImg src={FireIcon} />
        </CircleImageWrapper>
      </MarginFlexContainer>

      <FlexContainer>
        <StyledSubTitle2>{name}</StyledSubTitle2>
        <StyledSmallCaption>{symbol.toUpperCase()}</StyledSmallCaption>
      </FlexContainer>

      <FlexContainer>
        <StyledCaption>{description}</StyledCaption>
      </FlexContainer>
    </CardLayout>
  );
};

export default CoinInfoCard;

// Styled-Components
const CardLayout = styled(CommonCard)`
  width: 100%;
  height: auto;
  margin-top: 0.813rem;
  margin-bottom: 26px;
  padding-top: 5px;
`;

const StyledSubTitle2 = styled(SubTitle2Typo)`
  text-align: center;
`;

const StyledSmallCaption = styled(SmallCaptionTypo)`
  text-align: center;
  color: var(--white-50);
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.375rem;
`;

const MarginFlexContainer = styled(FlexContainer)`
  margin-top: 6.296vh;
  margin-bottom: 2.382rem;
`;

/** ✅ 키워드들을 감싸는 부모 컨테이너 (회전 효과 적용) */
const RotatingKeywords = styled.div`
  position: absolute;
  width: 9rem;
  height: 9rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: rotateAnimation 10s linear infinite;
`;

const rotateAnimation = keyframes`
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
`;

const CircleImageWrapper = styled.div`
  position: relative;
  width: 6.875rem;
  height: 6.875rem;
  border-radius: 50%;
  background: var(--yellow);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 6.337rem;
  height: 6.337rem;
  border-radius: 50%;
  object-fit: cover;
  aspect-ratio: 1 / 1;
`;

const StyledCaption = styled(CaptionTypoMedium)`
  text-align: left;
  width: 85%;
  margin-bottom: 3.704vh;
  margin-top: 0.926vh;
  min-height: 2.4rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

/** ✅ 키워드 개별 요소 (회전하는 부모 안에서 개별적으로 배치) */
const Keyword = styled.span<{ $isHighlighted: boolean; $angle: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(${(props) => props.$angle}deg)
    translate(4.5rem) rotate(-${(props) => props.$angle}deg);

  display: inline-flex;
  white-space: nowrap;
  justify-content: center;
  align-items: center;

  background-color: ${(props) =>
    props.$isHighlighted ? "#49DF82" : "#DE8DFA"};
  color: white;
  border-radius: 16.5px;
  font-size: 0.85rem;
  height: 33px;
  min-width: 33px;
  padding: 0px 15px;
`;

const Rank = styled.div`
  position: absolute;
  bottom: -27px;
  left: -45px;

  background-color: var(--purple);
  color: #fff;
  border-radius: 20px;
  display: inline-flex;
  height: 33px;
  min-width: 33px;
  padding: 4px 10px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;

/** ✅ 회전의 중심 역할을 하는 아이콘 */
const IconImg = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  width: 2rem;
  transform: translate(20%, -20%);
  height: auto;
`;
