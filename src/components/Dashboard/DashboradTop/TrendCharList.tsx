import styled from "styled-components";
import { useTrendList } from "./useTrendList";
import { SubTitle3Typo, BodyTypo, CaptionTypoMedium } from "../../../styles/Typography";
import { useNavigate } from "react-router-dom";

const TrendChartList: React.FC = () => {
    const navigate = useNavigate();
    const { trendList, loading, error } = useTrendList();

    if (loading) return <p>트렌드 데이터 로딩 중...</p>;
    if (error) return <p>트렌드 데이터 {error}</p>;

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
                                <CurrentCoinPrice>${data.price.toFixed(2)}</CurrentCoinPrice>
                                <PriceChange $change={data?.priceChangeDirection}>
                                    {data?.priceChangeDirection === "up" ? "▲" : "▼"}
                                    &nbsp;
                                    {(Number(data?.priceChangeAbsolute) || 0).toFixed(3)} 
                                    ({(Number(data?.priceChangeRate) || 0).toFixed(2)}%)
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

const Line = styled.img`
    position: absolute;
    margin: -1rem 1.625rem;

    @media (max-width: 480px) {
        margin: -1rem 1rem;
        width: 80%;
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


