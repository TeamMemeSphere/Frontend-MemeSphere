import styled from "styled-components";

interface CoinCardProps {
    name: string;
    symbol: string;
    price: number;
    priceChange: number;
}

const CoinCard = ({ name, symbol, price, priceChange }: CoinCardProps) => {
    const changeStatus = priceChange > 0 ? "rise" : priceChange < 0 ? "fall" : "same";
    const priceChangePercent = priceChange / price * 100;
    const formattedPrice = price.toLocaleString();

    return (
        <Container>
            <HeaderSection>
                <ThumbnailWrapper>
                    <Thumbnail src="https://via.placeholder.com/200" alt="thumbnail"></Thumbnail>
                </ThumbnailWrapper>
                <NameWrapper>
                    {name} / {symbol}
                </NameWrapper>
                <StarIcon>
                    <img src="public\assets\common\star-2 1.svg" alt="star"></img>
                </StarIcon>
            </HeaderSection>
            <PriceInfoSection>
                <UpDownSection>
                    ▲ 4,844
                    ▼ 4,555
                </UpDownSection>
                <CurrentSection>
                    <CurrentPrice>
                        &#36; {formattedPrice}
                    </CurrentPrice>
                    <CurrentPriceChange change={changeStatus}>
                        {changeStatus === "same" ? "-" : changeStatus === "rise" ? "▲" : "▼"}
                        {priceChange}
                        ({priceChangePercent.toFixed(2)}%)
                    </CurrentPriceChange>
                </CurrentSection>
            </PriceInfoSection>
            <ChartSection>
                차트
            </ChartSection>
        </Container>
    );
}

const Container = styled.div`
    width: 340px;
    height: 473px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #26262A80;
    border-radius: 10px;
`

// 헤더
const HeaderSection = styled.div`
    box-sizing: border-box;
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 20px;
`

const ThumbnailWrapper = styled.div`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    overflow: hidden;
    margin-left: 20px;
`

const Thumbnail = styled.img`
    width: 100%;
    height: auto;
    padding-bottom:100%;
`

const NameWrapper = styled.div`
    margin-left: 17px;
    /* display: flex;
    flex-direction: column;
    justify-content: center; */
    color: #FFF;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`

const StarIcon = styled.div`
    color: white;
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    margin-left: auto;
    margin-right: 21px;
`

// 가격정보
const PriceInfoSection = styled.div`
    width: 306px;
    height: 79px;
    flex-shrink: 0;
    box-sizing: border-box;
    background-color: #FFFFFF0D;
    border-radius: 10px;
    margin: 18px 17px 0px 17px;
`

const UpDownSection = styled.div`
    display: flex;
    color: #B5B7C0;
    font-size: 0.8rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
`

const CurrentSection = styled.div`
    box-sizing: border-box;
    width: 100%;
    display: flex;
    align-items: baseline;
`

const CurrentPrice = styled.div`
    color: white;
    font-size: 1.2rem;
    font-weight: bold;
`

interface CurrentPriceChangeProps {
    change: "rise" | "fall" | "same";
}

const CurrentPriceChange = styled.div<CurrentPriceChangeProps>`
    color: ${props => props.change === "rise" ? "red" : props.change === "fall" ? "#345DFD" : "white"};
    margin-left: 1rem;
`

// 차트
const ChartSection = styled.div`
    width: 100%;
    height: 200px;
    background-color: #FFFFFF0D;
    border-radius: 10px;
    margin-top: 1rem;
`

export default CoinCard;