import styled from "styled-components";
import { Coin } from "./CoinCard";

const CoinRow = ({
    name,
    symbol,
    tradePrice,
    highPrice,
    lowPrice,
    change,
    changePrice,
    changeRate,
    isCollected,
    marketCap,
    volume
}: Coin) => {
    return (
        <Container>
            <Text $width="12.5vw">{name} ({symbol})</Text>
            <Text $width="3.472vw">&#36;{tradePrice.toLocaleString()}</Text>
            <Text $width="7.292vw">{changeRate}%</Text> 
            <Text $width="6.25vw">{marketCap.toLocaleString()}</Text>
            <Text $width="6.25vw">{volume.toLocaleString()}</Text>
            <Text $width="7.153vw">∙∙∙</Text>
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
`

interface TextProps {
    $width?: string;
}

const Text = styled.div<TextProps>`
    width: ${(props) => props.$width};
    text-align: center;
`
