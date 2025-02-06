import styled from "styled-components";
import CoinCardSkelton from "./CoinCardSkelton";

const CoinCardListSkeleton = () => {

  return (
    <Container>
      <CardList>
        {Array.from({ length: 9 }, (_, index) =>
          <CoinCardSkelton key={index} />
        )}
      </CardList>
    </Container>
  );
}

export default CoinCardListSkeleton;

const Container = styled.div`
  display: flex;
  justify-content: center;
`

const CardList = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(340px, 17.708vw));
  height: fit-content;
  place-items: center;
  gap: 39px 1.875rem;
  justify-content: center;
`