import styled from "styled-components";
import { useTrendList } from "./useTrendList";
import { SubTitle3Typo, BodyTypo, CaptionTypoMedium } from "../../../styles/Typography";

const TrendChartList: React.FC = () => {
    const { trendList, loading, error } = useTrendList();

    if (loading) return <p>트렌드 데이터 로딩 중...</p>;
    if (error) return <p>트렌드 데이터 {error}</p>;

    return (
        <TrendChartContainer>
            {trendList.map((data, index) => (
                <div key={data.coinId}>
                    <RankTrendChart>
                        <RankNumber>#{data.rank}</RankNumber>
                        <RankChange $change={data.rankChange}>
                            {data.rankChange === "EVEN" ? "-" : data.rankChange === "RISE" ? "▲" : "▼"}
                        </RankChange>
                        <CoinImage src={data.image} alt={`${data.name} logo`} />
                        <CoinDetails>
                            <CoinInfo>
                                <CoinName>{data.name}</CoinName>
                                <CoinSymbol>{data.symbol}</CoinSymbol>
                            </CoinInfo>
                            <CoinPriceWrapper>
                                <CurrentCoinPrice>${data.price.toFixed(2)}</CurrentCoinPrice>
                                <PriceChange $change={data.changeDirection}>
                                    {data.changeDirection === "zero" ? "-" : data.changeDirection === "up" ? "▲" : "▼"}
                                    &nbsp;{data.changeAbsolute.toFixed(3)} ({data.changeRate?.toFixed(2) ?? "0.00"}%)
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
`;

const TrendChartContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 1.625rem;
    margin-bottom: 2.5rem;
`;

const RankTrendChart = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 2rem; //원래 2.625
`;

const RankNumber = styled.div`
    font-size: 18px;
    font-weight: bold;
    color: var(--yellow);
    padding-left: 26px; 
    padding-right: 0.344rem;
`;

interface RankChangeProps {
    $change: "RISE" | "LOW" | "EVEN";
}

const RankChange = styled.div<RankChangeProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 15px;
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
  margin-bottom: 6px;
`;

const CoinSymbol = styled(CaptionTypoMedium)`

`;

const CoinPriceWrapper = styled.span`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;

const CurrentCoinPrice = styled(SubTitle3Typo)`
  margin-bottom: 6px;
`;

interface PriceChangeProps {
    $change: "up" | "down" | "zero";
}

const PriceChange = styled(BodyTypo)<PriceChangeProps>`
    color: ${({ $change }) =>
        $change === "up" ? "red" : $change === "down" ? "var(--blue)" : "var(--white-100)"};
    margin-top: 5px;
`;


