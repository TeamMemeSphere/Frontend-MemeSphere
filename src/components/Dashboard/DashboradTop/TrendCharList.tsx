import styled from "styled-components";
import TrendChart, {TrendChartCoin} from "./TrendChartBox";

const TrendChartListExample: TrendChartCoin[] = [
    {
        rank: 1,
        rankChange: "up",
        image: "../../../../public/assets/common/dashboard-top/Doji Icon.svg",
        name: "Bitcoin",
        symbol: "Cryptocurrency",
        tradePrice: 43567.83843536,
        change: "RISE",
        changePrice: 12.5289573773,
        changeRate: 10.159589,
    },
    {
        rank: 2,
        rankChange: "up",
        image: "../../../../public/assets/common/dashboard-top/Doji Icon.svg",
        name: "Ethereum",
        symbol: "Cryptocurrency",
        tradePrice: 3124.56,
        change: "FALL",
        changePrice: 14,
        changeRate: 5.27,
    },
    {
        rank: 3,
        rankChange: "down",
        image:  "../../../../public/assets/common/dashboard-top/Doji Icon.svg",
        name: "Dogecoin",
        symbol: "Meme Coin",
        tradePrice: 8.766, //셋째자리에서 반올림되어 표시
        change: "EVEN",
        changePrice: 0,
        changeRate: 0,
    },
    {
        rank: 4,
        rankChange: "even",
        image: "../../../../public/assets/common/dashboard-top/Doji Icon.svg",
        name: "Shiba Inu",
        symbol: "Meme Coin",
        tradePrice: 150,
        change: "FALL",
        changePrice: 15,
        changeRate: 10,
    },
    {   
        rank: 5,
        rankChange: "down",
        image:  "../../../../public/assets/common/dashboard-top/Doji Icon.svg",
        name: "Litecoin",
        symbol: "Cryptocurrency",
        tradePrice: 139.45,
        change: "FALL",
        changePrice: 13.945,
        changeRate: 10,
    },
];

const TrendChartList: React.FC = () => {
    return (
        <TrendCharListContainer>
            {TrendChartListExample.map((coin: TrendChartCoin, index: number) => (
                <div key={index}>
                <RankTrendChart key={index}>
                    <TrendChart data={coin} />
                </RankTrendChart>
                {index < TrendChartListExample.length -1 && (
                    <Line src="../../../../public/assets/common/dashboard-top/Trend Chart Line.svg" alt="distiction" />
                )}
                </div>
            ))}
        </TrendCharListContainer>
    );
};

export default TrendChartList;

const TrendCharListContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 1.625rem;
`;

const RankTrendChart = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 1.313rem;
`;

const Line = styled.img`
    position: absolute;
    margin: -1.313rem 1.625rem;
`;