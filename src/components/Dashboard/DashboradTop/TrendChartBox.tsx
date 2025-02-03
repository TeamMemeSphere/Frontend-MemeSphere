import React from "react";
import styled from "styled-components";
import {SubTitle3Typo, BodyTypo} from "../../../styles/Typography";

export interface TrendChartCoin {
    rank: number; // 좌측 순위 변동 수치
    rankChange: "RISE" | "LOW" | "EVEN"; // 순위 변동 화살표

    image: string; // 코인 사진
    name: string; // 코인 이름
    symbol: string;

    price: number; // 현재 거래 가격 (소수점 셋째에서 반올림)
    changeDirection: "up" | "down" | "zero";  // 우측 가격 변동 화살표. zero?
    changeAbsolute: number; // 전일 대비 가격 변동 절대값(소수점 넷째에서 반올림)
    changeRate: number| null; // 전일 대비 가격 변동 비율(%, 소수점 셋째에서 반올림)
}

type TrendChartCoinProps = {
    data: TrendChartCoin;
};

const TrendChart: React.FC<TrendChartCoinProps> = ({ data }) => {
    return (
        <TrendChartCoinBox>
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
        </TrendChartCoinBox>
    );
};

export default TrendChart;

const TrendChartCoinBox = styled.div`
    display: flex;
    align-items: center;
    padding-left: 0.3rem; //피그마는 26px, 1.625rem인데 너무 멂..
    color: white;
    margin-bottom: 1.313rem;
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

    width: 15px; //svg로 수정
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
    margin-bottom: 0rem;// 피그마0.375가 너무 멀어보임임
`;
const CoinSymbol = styled(BodyTypo)`

`;

const CoinPriceWrapper = styled.span`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding-right:
`;
const CurrentCoinPrice = styled(SubTitle3Typo)`
    margin-bottom: 0rem;
`;
interface PriceChangeProps {
    $change: "up" | "down" | "zero";
}
const PriceChange = styled(BodyTypo)<PriceChangeProps>`
    color: ${({ $change }) =>
        $change === "up" ? "red" : $change === "down" ? "var(--blue)" : "var(--white-100)"};
    margin-top: 5px;
`;