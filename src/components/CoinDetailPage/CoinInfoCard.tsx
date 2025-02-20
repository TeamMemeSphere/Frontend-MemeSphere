import styled from "styled-components";
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
  //const coin = coinDummy[0];

  return (
    <CardLayout>
      <MarginFlexContainer>
        <CircleImageWrapper>
          <Image src={image || CoinCircleImg} alt={`${name} 프로필`} />
          {keywords.map((keyword, index) => (
            <Keyword
              key={index}
              $angle={(index / keywords.length) * 360 + 45}
              $isHighlighted={index === 0 || index === 1}
            >
              #{keyword}
            </Keyword>
          ))}
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
`;

const StyledCaption = styled(CaptionTypoMedium)`
  text-align: left;
  width: 21.25vw;
  margin-bottom: 3.704vh;
  margin-top: 0.926vh;
`;

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

const IconImg = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  width: 2rem; /* 아이콘 크기 조절 */
  transform: translate(20%, -20%); /* 살짝 밖으로 빼서 상단에 부착 */
  height: auto;
`;
