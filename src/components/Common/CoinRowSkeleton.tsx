import styled, { keyframes } from "styled-components";

const CoinRowSkeleton = () => {
return (
  <Container>
    <Text $width="12.5vw"></Text>
    <Text $width="3.472vw"></Text>
    <Text $width="7.292vw"></Text>
    <Text $width="6.25vw"></Text>
    <Text $width="6.25vw"></Text>
    <Text $width="3.75vw"></Text>
  </Container>
)
}

export default CoinRowSkeleton;

const animate = keyframes`
  to {
    background-position-x: -200%;
  }
`;

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
  align-items: center;
  border-bottom: 1px solid var(--grey-100);
`;

interface TextProps {
  $width?: string;
}

const Text = styled.div<TextProps>`
  width: ${(props) => props.$width};
  height: 50%;
  text-align: center;
  border-radius: 0.625rem;
  background-color: var(--white-5);
  background: linear-gradient(110deg, var(--white-5) 8%, var(--white-10) 18%, var(--white-5) 33%);
  background-size: 200% 100%;
  animation: ${animate} 1.5s linear infinite;
  background-attachment: fixed;
`;