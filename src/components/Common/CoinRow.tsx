import styled from "styled-components";
import { Coin } from "./CoinCard";

const CoinRow = ({
    name,
    symbol,
    currentPrice,
    highPrice,
    lowPrice,
    priceChange,
    priceChangeRate,
    isCollected,
    marketCap,
    volume
}: Coin) => {
    return (
        <Container>
            <Text $width="12.5vw">{name} ({symbol})</Text>
            <Text $width="3.472vw">&#36;{currentPrice.toLocaleString()}</Text>
            <Text $width="7.292vw">{priceChangeRate}%</Text> 
            <Text $width="6.25vw">&#36;{marketCap?.toLocaleString()}</Text>
            <Text $width="6.25vw">&#36;{volume?.toLocaleString()}</Text>
            <Text $width="3.75vw">
                {
                    isCollected ? 
                    <img src="/assets/common/collect-star-fill.svg" alt="" />
                    :
                    <img src="/assets/common/collect-star.svg" alt="" />
                }
            </Text>
        </Container>
    )
}

export default CoinRow;

const Container = styled.div`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    width: 100%;
    height: 64px;
    top: 54px;
    padding: 0 2.778vw;
    border: 0px 0px 1px 0px;
    justify-content: space-between;
    border-bottom: 1px solid var(--grey-100);
`;

interface TextProps {
    $width?: string;
}

const Text = styled.div<TextProps>`
    /* width: ${(props) => props.$width}; */
    width: 100%;
    text-align: center;
`;
