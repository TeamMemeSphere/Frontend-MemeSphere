import styled from "styled-components";
import CoinCard from "./CoinCard";
import CoinRow from "./CoinRow";
import { Coin } from "./CoinCard";

const CoinList: React.FC<{ coins: Coin[], viewType: "card" | "list" }> = ({ coins, viewType }) => {

    return (
        <Container>
            {
                viewType === "card" ?
                    <CardList>
                        {
                            coins.map((coin, index) => {
                                return (
                                    <CoinCard
                                        key={index}
                                        name={coin.name}
                                        symbol={coin.symbol}
                                        tradePrice={coin.tradePrice}
                                        highPrice={coin.highPrice}
                                        lowPrice={coin.lowPrice}
                                        change={coin.change}
                                        changePrice={coin.changePrice}
                                        changeRate={coin.changeRate}
                                        isCollected={coin.isCollected}
                                        marketCap={coin.marketCap}
                                        volume={coin.volume}
                                    />
                                )
                            })
                        }
                    </CardList>
                    :
                    <RowList>
                        <RowHeader>
                            <RowHeaderItem $width="12.5vw">Name (Symbols)</RowHeaderItem>
                            <RowHeaderItem $width="3.472vw">Price</RowHeaderItem>
                            <RowHeaderItem $width="7.292vw">Change (24h)</RowHeaderItem>
                            <RowHeaderItem $width="6.25vw">Market Cap</RowHeaderItem>
                            <RowHeaderItem $width="6.25vw">Volume</RowHeaderItem>
                            <RowHeaderItem $width="7.153vw">Open Interest</RowHeaderItem>
                            <RowHeaderItem $width="3.75vw">Collect</RowHeaderItem>
                        </RowHeader>
                        {
                            coins.map((coin, index) => {
                                return (
                                    <CoinRow
                                        key={index}
                                        name={coin.name}
                                        symbol={coin.symbol}
                                        tradePrice={coin.tradePrice}
                                        highPrice={coin.highPrice}
                                        lowPrice={coin.lowPrice}
                                        change={coin.change}
                                        changePrice={coin.changePrice}
                                        changeRate={coin.changeRate}
                                        isCollected={coin.isCollected}
                                        marketCap={coin.marketCap}
                                        volume={coin.volume}
                                    />
                                )
                            })
                        }
                    </RowList>
            }
        </Container>
    );

}

export default CoinList;

const Container = styled.div`
    display: flex;
    justify-content: center;
`

const CardList = styled.div`
    display: grid;
    /* grid-template-columns: repeat(3, 340px); */
    /* grid-template-columns: repeat(3, max(340px, 23.611vw)); */
    grid-template-columns: repeat(3, minmax(23.611vw, 340px));
    width: fit-content;
    height: fit-content;
    place-items: center;
    /* gap: 39px 1.563vw; */
    gap: 39px 2.083vw;

    @media (max-width: 1339px) {
        grid-template-columns: repeat(2, max(340px, 23.611vw));
    }

    @media (max-width: 768px) {
        grid-template-columns: repeat(1, max(340px, 23.611vw));
    }
`

const RowList = styled.div`
    width: 100%;
`

const RowHeader = styled.div`
    box-sizing: border-box;
    padding: 15px 2.778vw;
    border-radius: 20px;
    width: 100%;
    height: 52px;
    background-color: #26262A80;
    gap: 0px;
    display: flex;
    justify-content: space-between;
`

interface RowHeaderItemProps {
    $width?: string;
}

const RowHeaderItem = styled.span<RowHeaderItemProps>`
    font-size: var(--font-size-body);
    font-weight: var(--font-weight-bold);
    width: ${(props) => props.$width};
    justify-self: center;
    text-align: center;
`