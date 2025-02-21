import styled, { keyframes } from "styled-components";
import { useTrendList } from "./useTrendList";
import { SubTitle3Typo, BodyTypo, CaptionTypoMedium } from "../../../styles/Typography";
import { useNavigate } from "react-router-dom";

const TrendChartList: React.FC = () => {
    const navigate = useNavigate();
    const { trendList, loading, error } = useTrendList();

    if (loading || error) {
        return (
            <TrendChartContainer>
                <SkeletonLoader itemCount={5}/>
            </TrendChartContainer>
        );
    };

    return (
        <TrendChartContainer>
            {trendList.map((data, index) => (
                <div key={data.coinId}>
                    <RankTrendChart onClick={() => navigate(`/CoinDetailPage/${data.coinId}`)}>
                        <RankNumber>#{data.rank}</RankNumber>
                        <RankChange>
                            {data.rankChangeDirection === "up" ? "▲" : "▼"}
                        </RankChange>
                        <CoinImage src={data.image} alt={`${data.name} logo`} />
                        <CoinDetails>
                            <CoinInfo>
                                <CoinName>{data.name}</CoinName>
                                <CoinSymbol>{data.symbol}</CoinSymbol>
                            </CoinInfo>
                            <CoinPriceWrapper>
                                <CurrentCoinPrice>${parseFloat(data.price).toString()}</CurrentCoinPrice>
                                <PriceChange $change={data?.priceChangeDirection}>
                                    {data?.priceChangeDirection === "up" ? "▲" : "▼"}
                                    &nbsp;
                                    {(Number(data?.priceChangeAbsolute) || 0)} 
                                    ({(Number(data?.priceChangeRate) || 0)}%)
                                </PriceChange>
                            </CoinPriceWrapper>
                        </CoinDetails>
                    </RankTrendChart>

                    {index < trendList.length - 1 && (
                        <Line src="/assets/common/dashboard-top/Trend Chart Line.svg" alt="distinction" />
                    )}
                </div>
            ))}
        </TrendChartContainer>
    );
};

export default TrendChartList;

const SkeletonLoader = ({ itemCount }: { itemCount: number }) => {
    return (
        <>
        <SkeletonTrendChartContainer>
            {Array.from({ length: itemCount }).map((_, index) => (
                <div key={index}>
                    <SkeletonRankTrendChart>
                        <SkeletonRankNumber />
                        <SkeletonCoinImage />
                        <SkeletonCoinName />
                        <SkeletonCoinPrice />
                    </SkeletonRankTrendChart>
                    {index < itemCount - 1 && (
                        <Line src="/assets/common/dashboard-top/Trend Chart Line.svg" alt="distinction" />
                    )}
                </div>
            ))}
        </SkeletonTrendChartContainer>
        </>
    );
};

const SkeletonGradient = keyframes`
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
`;
const SkeletonTrendChartContainer = styled.div`
    margin-top: 0.5Srem;
`;

const SkeletonRankTrendChart = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 2.5rem;
`;

const SkeletonRankNumber = styled.div`
    width: 39px;
    height: 21px;
    border-radius: 0.5rem;
    background-color: rgba(165, 165, 165, 0.1);
    animation: ${SkeletonGradient} 2s infinite ease-in-out;
    margin-left: 26px;
`;

const SkeletonCoinImage = styled.div`
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background-color: rgba(165, 165, 165, 0.1);
    animation: ${SkeletonGradient} 2s infinite ease-in-out;
    margin-left: 21px;
`;

const SkeletonCoinName = styled.div`
    width: 10rem;
    height: 1.2rem;
    background-color: rgba(165, 165, 165, 0.1);
    border-radius: 0.5rem;
    animation: ${SkeletonGradient} 2s infinite ease-in-out;
    margin-left: 0.875rem;

    @media (max-width: 480px) {
        display: none;
    }
`;
const SkeletonCoinPrice = styled.div`
    width: 5rem;
    height: 1.2rem;
    background-color: rgba(165, 165, 165, 0.1);
    border-radius: 0.5rem;
    animation: ${SkeletonGradient} 2s infinite ease-in-out;
    margin-left: 6rem;

    @media (max-width: 480px) {
        display: none;
    }
`;

const Line = styled.img`
    position: absolute;
    margin: -1rem 1.625rem;

    @media (max-width: 480px) {
        margin: -1rem 1rem;
        width: 87vw;
    }
`;

const TrendChartContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 1.8rem;

    @media (max-width: 480px) {
        margin-top: 2.5rem;
        margin-bottom: 2.5rem;
    }
`;

const RankTrendChart = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 2.1rem; //원래 2.625
    cursor: pointer;
`;

const RankNumber = styled.div`
    font-size: 1.125rem;
    font-weight: bold;
    color: var(--yellow);
    padding-left: 1.625rem; 
    padding-right: 0.344rem;

    @media (max-width: 480px) {
        font-size: 1rem;
    }
`;

const RankChange = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 0.938rem;
    color: var(--yellow);
    padding-right: 1.125rem;
`;

const CoinImage = styled.img`
    border-radius: 30px;
    width: 3rem;
    height: 3rem;
    margin-right: 0.875rem;
    border: 1px solid gray;
    object-fit: cover;
`;

const CoinDetails = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 21.063rem;
`;

const CoinInfo = styled.span`
    margin-top: 0.188rem;
`;

const CoinName = styled(SubTitle3Typo)`
    margin-bottom: 0.375rem;

    @media (max-width: 480px) {
        font-size: 0.8rem;
    }
`;

const CoinSymbol = styled(CaptionTypoMedium)`
    @media (max-width: 480px) {
        font-size: 0.75rem;
    }
`;

const CoinPriceWrapper = styled.span`
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    @media (max-width: 480px) {
        margin-right: 1rem;
    }
`;

const CurrentCoinPrice = styled(SubTitle3Typo)`
    margin-bottom: 0.375rem;

    @media (max-width: 480px) {
        font-size: 0.8rem;
    }
`;

interface PriceChangeProps {
    $change: "up" | "down" | "zero";
}

const PriceChange = styled(BodyTypo)<PriceChangeProps>`
    color: ${({ $change }) =>
        $change === "up" ? "red" : $change === "down" ? "var(--blue)" : "var(--white-100)"};

    @media (max-width: 480px) {
        font-size: 0.8rem;
    }
`;


