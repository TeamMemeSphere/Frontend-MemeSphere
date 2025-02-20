import React, { useState, useEffect } from "react";
import FilterSelect from "../components/Commons/FilterSelect";
import axios from "axios";
import styled, { keyframes } from "styled-components";
import { TitleTypo, SubTitle3Typo } from "../styles/Typography";
import ReactConfetti from "react-confetti";

const COIN_SYMBOL_MAP: Record<string, string> = {
  도지코인: "DOGEUSDT",
  페페: "PEPEUSDT",
  시바이누: "SHIBUSDT",
};

const formatPrice = (price: string) => {
  return parseFloat(price).toString(); // 불필요한 0 제거
};

const GamePage: React.FC = () => {
  const options = ["도지코인", "페페", "시바이누"];
  const [selectedCoin, setSelectedCoin] = useState<string>("도지코인");
  const [selectedOption, setSelectedOption] = useState<"홀수" | "짝수" | null>(
    null,
  );
  const [result, setResult] = useState<"none" | "success" | "fail">("none");
  const [isSpinning, setIsSpinning] = useState(false);
  const [resultTitle, setResultTitle] = useState<string>("");
  const [buttonText, setButtonText] = useState("결과 확인하기");
  const [displayedPrice, setDisplayedPrice] = useState<string>("");
  const [confettiTriggered, setConfettiTriggered] = useState<boolean>(false);
  const [isHandleRotated, setIsHandleRotated] = useState(false);

  useEffect(() => {
    setResult("none");
    setSelectedOption(null);
    setButtonText("결과 확인하기");
    setDisplayedPrice("");
  }, [selectedCoin]);

  const handleOptionChange = (value: string) => {
    setSelectedCoin(value);
  };

  const handleSelectOption = (option: "홀수" | "짝수") => {
    if (selectedOption === option) {
      setSelectedOption(null);
    } else {
      setSelectedOption(option);
    }
  };

  const animateSlotMachine = (finalPrice: number) => {
    let counter = 0;
    const finalPriceStr = finalPrice.toString();

    const interval = setInterval(() => {
      const randomDigits = Math.random().toFixed(6);
      setDisplayedPrice(randomDigits);
      counter++;

      if (counter > 20) {
        clearInterval(interval);
        setDisplayedPrice(finalPriceStr);
      }
    }, 100);
  };

  const checkResult = async () => {
    if (!selectedOption) return;
    setIsSpinning(true);
    setIsHandleRotated(true);

    setTimeout(() => {
      setIsHandleRotated(false);
    }, 300);

    try {
      const symbol = COIN_SYMBOL_MAP[selectedCoin];
      const response = await axios.get(
        `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`,
      );

      if (response.data && response.data.price) {
        const price = response.data.price;
        const formatPrice = (price: string) => {
          return parseFloat(price).toString();
        };
        const formattedPrice = formatPrice(price);

        animateSlotMachine(price);

        // 가격의 마지막 자리 확인
        const priceStr = formattedPrice.toString();
        const lastDigit = parseInt(priceStr[priceStr.length - 1]);
        const isOdd = lastDigit % 2 === 1;

        const correctAnswer = isOdd ? "홀수" : "짝수";

        // 결과 표시 전 지연시간
        setTimeout(() => {
          setButtonText("처음으로 돌아가기");

          if (
            (isOdd && selectedOption === "홀수") ||
            (!isOdd && selectedOption === "짝수")
          ) {
            setResult("success");
            setResultTitle(`정답은 ${correctAnswer}! 와, 정답이에요`);
            setConfettiTriggered(true);
            setTimeout(() => {
              setConfettiTriggered(false);
            }, 3000);
          } else {
            setResult("fail");
            setResultTitle(
              `정답은 ${correctAnswer}! 아쉽게 실패! 다시 도전해볼까요?`,
            );
          }

          setIsSpinning(false);
        }, 3000);
      }
    } catch (error) {
      console.error("바이낸스 가격 오류 발생:", error);
      setIsSpinning(false);
      setIsHandleRotated(false);
    }
  };

  const resetGame = () => {
    setSelectedOption(null);
    setResult("none");
    setButtonText("결과 확인하기");
    setDisplayedPrice("");
  };

  return (
    <>
      <TitleWrapper>
        {result === "none" ? (
          <Title>{selectedCoin} 가격의 홀짝을 맞춰라!</Title>
        ) : (
          <ResultMessage className={result === "success" ? "success" : "fail"}>
            <ResultTitle>{resultTitle.split("!")[0]}!</ResultTitle>
            <ResultSubtitle>{resultTitle.split("!")[1]}</ResultSubtitle>
          </ResultMessage>
        )}
        <SelectWrapper>
          <FilterSelect options={options} onChange={handleOptionChange} />
        </SelectWrapper>
      </TitleWrapper>

      <GameContainer>
        {confettiTriggered && (
          <ReactConfetti
            width={window.innerWidth}
            height={window.innerHeight}
            colors={[
              "#345DFD",
              "#7061F0",
              "#DE8DFA",
              "#4FFC91",
              "#D6F84C",
              "#FB6571",
            ]}
            numberOfPieces={100}
            gravity={0.5}
          />
        )}
        <RouletteImageContainer>
          <RouletteImage
            src="/assets/common/RouletteMachineWithoutHandler.svg"
            alt="Roulette Machine"
          />
          <RouletteHandle
            src="/assets/common/RouletteMachineHandler.svg"
            alt="Handle"
            $isRotated={isHandleRotated}
          />
        </RouletteImageContainer>
        <GameContent>
          <RouletteSection>
            <Roulette className={isSpinning ? "spinning" : ""}>
              {displayedPrice ? (
                <>
                  <PriceDisplayTitle>
                    {selectedCoin}의 현재 가격
                  </PriceDisplayTitle>
                  <PriceDisplay className={isSpinning ? "animating" : ""}>
                    $ {formatPrice(displayedPrice)}
                  </PriceDisplay>
                </>
              ) : (
                <RouletteInner className={isSpinning ? "spinning" : ""} />
              )}
            </Roulette>
          </RouletteSection>

          <ControlSection>
            <OptionButtons>
              <OptionButton
                $selected={selectedOption === "홀수"}
                onClick={() => handleSelectOption("홀수")}
                disabled={isSpinning || buttonText === "처음으로 돌아가기"}
                $hasSelection={!!selectedOption}
                $optionType="홀수"
                $buttonText={buttonText}
              >
                홀수
              </OptionButton>
              <OptionButton
                $selected={selectedOption === "짝수"}
                onClick={() => handleSelectOption("짝수")}
                disabled={isSpinning || buttonText === "처음으로 돌아가기"}
                $hasSelection={!!selectedOption}
                $optionType="짝수"
                $buttonText={buttonText}
              >
                짝수
              </OptionButton>
            </OptionButtons>

            <CheckButton
              onClick={buttonText === "결과 확인하기" ? checkResult : resetGame}
              disabled={
                (!selectedOption && buttonText === "결과 확인하기") ||
                isSpinning
              }
            >
              {buttonText}
            </CheckButton>
          </ControlSection>
        </GameContent>
      </GameContainer>
    </>
  );
};

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const blink = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
  100% {
    opacity: 1;
  }
`;

const numberChange = keyframes`
  0% {
    transform: translateY(0);
  }
  10% {
    transform: translateY(-20px);
  }
  20% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-15px);
  }
  40% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(0);
  }
  70% {
    transform: translateY(-5px);
  }
  80% {
    transform: translateY(0);
  }
  90% {
    transform: translateY(-2px);
  }
  100% {
    transform: translateY(0);
  }
`;

const TitleWrapper = styled.div`
  width: 100%;
  position: relative;
`;
const Title = styled(TitleTypo)`
  padding-top: 8rem;
  margin-bottom: 3rem;
  text-align: center;
`;
const ResultMessage = styled.div`
  margin-top: 5rem;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ResultTitle = styled(TitleTypo)`
  margin-bottom: 0.813rem;
  text-align: center;
`;
const ResultSubtitle = styled(SubTitle3Typo)``;
const SelectWrapper = styled.div`
  position: absolute;
  right: 4rem;
  top: 8rem;

  @media (min-width: 1300px) {
    right: 20rem;
  }

  @media (max-width: 1300px) {
    top: 11rem;
  }
`;

const GameContainer = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  padding-top: 7rem;
  padding-bottom: 12rem;

  display: flex;
  flex-direction: column;

  @media (max-width: 500px) {
    transform: scale(0.8);
  }
`;

const RouletteImageContainer = styled.div`
  position: absolute;
  z-index: 0;
  transform: translate(-47%, -21%);
  left: 50%;
`;
const RouletteImage = styled.img`
  width: 28.188rem;
  position: relative;
`;

const RouletteHandle = styled.img<{ $isRotated: boolean }>`
  width: 2rem;
  position: absolute;
  transition: all 0.3s ease-in-out;
  top: 29%;
  right: 2.1%;
  ${(props) =>
    props.$isRotated
      ? `
    transform: scaleY(-1);
    top: 50%;
  `
      : `
  `}
`;
// const RouletteHandle = styled.img`
//   width: 2rem;
//   position: absolute;
//   top: 29%;
//   right: 2%;
// `;
// const RouletteHandle = styled.img`
//   width: 2rem;
//   position: absolute;
//   left: 97%;
//   top: 29%;
//   transform: rotate(30deg);
// `;

const GameContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  z-index: 1;
`;

const RouletteSection = styled.div`
  margin-bottom: 2rem;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Roulette = styled.div`
  width: 17.7rem;
  height: 7.05rem;
  margin-left: 1.3px;
  margin-top: 2.95rem;
  margin-bottom: 2.4rem;

  background: var(--grey-100);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &.spinning {
    animation: ${blink} 0.5s ease-in-out infinite;
  }
`;

const RouletteInner = styled.div`
  width: 80%;
  height: 80%;
  border-radius: 50%;
  background: var(--white-50);
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20%;
    height: 20%;
    border-radius: 50%;
    background-color: var(--grey-80);
  }

  &.spinning {
    animation: ${spin} 0.5s linear infinite;
  }
`;

const PriceDisplayTitle = styled(SubTitle3Typo)`
  padding-bottom: 0.563rem;
`;

const PriceDisplay = styled(TitleTypo)`
  &.animating {
    animation: ${numberChange} 2s ease-out;
  }
`;

const ControlSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const OptionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  position: relative;
`;
type ButtonStyleProps = {
  $selected: boolean;
  $optionType: "홀수" | "짝수";
  $hasSelection: boolean;
  $buttonText: string;
};
const OptionButton = styled(SubTitle3Typo).attrs({
  as: "button",
})<ButtonStyleProps>`
  border: none;
  box-shadow: ${({ $selected }) =>
    $selected ? "0 0 0 2px white inset" : "none"};
  border-radius: 8px;
  padding: 10px 20px;
  width: 9.625rem;
  cursor: pointer;
  transition:
    background-color 0.3s,
    border 0.3s;

  background-color: ${({ $selected, $optionType, $hasSelection }) =>
    $hasSelection
      ? $selected
        ? $optionType === "홀수"
          ? "var(--green)"
          : "var(--red)"
        : "gray"
      : $optionType === "홀수"
        ? "var(--green)"
        : "var(--red)"};

  &:hover {
    box-shadow: 0 0 0 2px white inset;
  }

  &:disabled {
    background-color: ${({ $selected, $optionType, $hasSelection }) =>
      $hasSelection
        ? $selected
          ? $optionType === "홀수"
            ? "var(--green)"
            : "var(--red)"
          : "gray"
        : $optionType === "홀수"
          ? "var(--green)"
          : "var(--red)"};

    color: ${({ $buttonText }) =>
      $buttonText === "처음으로 돌아가기" ? "black" : "white"};
  }
`;

const CheckButton = styled(SubTitle3Typo).attrs({ as: "button" })`
  width: 20.063rem;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid white;
  background-color: var(--purple);
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default GamePage;
