import styled from "styled-components";
import TrendChart, {TrendChartCoin} from "./TrendChartBox";

const TrendChartListExample: TrendChartCoin[] = [
    {
        rank: 1,
        rankChange: "RISE",
        image: "../../../../public/assets/common/dashboard-top/Doji Icon.svg",
        name: "Bitcoin",
        symbol: "Cryptocurrency",
        price: 43567.83843536,
        changeDirection: "up",
        changeAbsolute: 12.5289573773,
        changeRate: 10.159589,
    },
    {
        rank: 2,
        rankChange: "RISE",
        image: "../../../../public/assets/common/dashboard-top/Doji Icon.svg",
        name: "Ethereum",
        symbol: "Cryptocurrency",
        price: 3124.56,
        changeDirection: "down",
        changeAbsolute: 14,
        changeRate: 5.27,
    },
    {
        rank: 3,
        rankChange: "LOW",
        image:  "../../../../public/assets/common/dashboard-top/Doji Icon.svg",
        name: "Dogecoin",
        symbol: "Meme Coin",
        price: 8.766, //셋째자리에서 반올림되어 표시
        changeDirection: "zero",
        changeAbsolute: 0,
        changeRate: 0,
    },
    {
        rank: 4,
        rankChange: "EVEN",
        image: "../../../../public/assets/common/dashboard-top/Doji Icon.svg",
        name: "Shiba Inu",
        symbol: "Meme Coin",
        price: 150,
        changeDirection: "down",
        changeAbsolute: 15,
        changeRate: 10,
    },
    {   
        rank: 5,
        rankChange: "LOW",
        image:  "../../../../public/assets/common/dashboard-top/Doji Icon.svg",
        name: "Litecoin",
        symbol: "Cryptocurrency",
        price: 139.45,
        changeDirection: "down",
        changeAbsolute: 13.945,
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