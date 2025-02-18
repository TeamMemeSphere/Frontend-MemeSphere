import styled from "styled-components";
import CoinRowSkeleton from "./CoinRowSkeleton";

const CoinRowListSkeleton = () => {
  return (
    <Container>
      {Array.from({ length: 20 }, (_, index) =>
        <CoinRowSkeleton key={index} />
      )}
    </Container>
  )
}

export default CoinRowListSkeleton;

const Container = styled.div`
  width: 100%;
`