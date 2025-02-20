import styled from "styled-components";
import CoinCard from "./CoinCard";
import CoinRow from "./CoinRow";
import { Coin } from "./CoinCard";

const CoinList: React.FC<{ coins: Coin[], viewType: "GRID" | "LIST" }> = ({ coins, viewType }) => {
    return (
        <Container>
            {
                viewType === "GRID" ?
                    <CardList>
                        {
                            coins.map((coin, index) => {
                                return (
                                    <CoinCard
                                        key={index}
                                        coinId={coin.coinId}
                                        name={coin.name}
                                        image={coin.image}
                                        symbol={`${coin.symbol}`}
                                        currentPrice={coin.currentPrice}
                                        highPrice={coin.highPrice}
                                        lowPrice={coin.lowPrice}
                                        priceChange={coin.priceChange}
                                        priceChangeRate={coin.priceChangeRate}
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
                        {coins.length != 0 &&
                            <RowHeader>
                                <RowHeaderItem $width="12.5vw">Name (Symbols)</RowHeaderItem>
                                <RowHeaderItem $width="3.472vw">Price</RowHeaderItem>
                                <RowHeaderItem $width="7.292vw">Change (24h)</RowHeaderItem>
                                {/* <RowHeaderItem $width="6.25vw">Market Cap</RowHeaderItem> */}
                                <RowHeaderItem $width="6.25vw">Volume</RowHeaderItem>
                                <RowHeaderItem $width="3.75vw">Collect</RowHeaderItem>
                            </RowHeader>
                        }
                        {
                            coins.map((coin, index) => {
                                return (
                                    <CoinRow
                                        key={index}
                                        coinId={coin.coinId}
                                        name={coin.name}
                                        symbol={coin.symbol}
                                        currentPrice={coin.currentPrice}
                                        highPrice={coin.highPrice}
                                        lowPrice={coin.lowPrice}
                                        priceChange={coin.priceChange}
                                        priceChangeRate={coin.priceChangeRate}
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
    width: 100%;
    grid-template-columns: repeat(auto-fill, 21.25rem);
    height: fit-content;
    place-items: center;
    gap: 39px 1.875rem;
    justify-content: center;
`

const RowList = styled.div`
    width: 100%;
`

export const RowHeader = styled.div`
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
    width: 100%;
    justify-self: center;
    text-align: center;
`