import styled from "styled-components";
import { Coin } from "./CoinCard";
import ToggleCollectionButton from "./ToggleCollectionButton";
import { useNavigate } from "react-router-dom";

const CoinRow = ({
    coinId,
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
    const navigate = useNavigate();

    return (
        <Container>
            <Text $width="12.5vw" onClick={(e) => navigate(`/CoinDetailPage/${coinId}`)}
                style={{ cursor: "pointer" }}>
                {name} ({symbol})
            </Text>
            <Text $width="3.472vw">&#36;{parseFloat(currentPrice)}</Text>
            <Text $width="7.292vw">{parseFloat(priceChangeRate)}%</Text>
            <Text $width="6.25vw">&#36;{volume?.toLocaleString()}</Text>
            <Text $width="3.75vw">
                <ToggleCollectionButton coinId={coinId} isCollected={isCollected != null ? isCollected : true} />
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
    width: 100%;
    text-align: center;
`;
