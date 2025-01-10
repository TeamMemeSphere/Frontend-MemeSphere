import styled from "styled-components";
import CoinCard from "./CoinCard";
import { Coin } from "./CoinCard";

const CoinList: React.FC<{ coins: Coin[] }> = ({ coins }) => {

    return (
        <Container>
            <List>
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
                            />
                        )
                    })
                }
            </List>
        </Container>
    );

}

export default CoinList;

const Container = styled.div`
    display: flex;
    justify-content: center;
`

const List = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 340px);
    width: fit-content;
    height: fit-content;
    place-items: center;
    gap: 39px 1.563vw;

    @media (max-width: 1339px) {
        grid-template-columns: repeat(2, 340px);
    }

    @media (max-width: 768px) {
        grid-template-columns: repeat(1, 340px);
    }
`