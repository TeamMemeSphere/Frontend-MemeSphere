import React from "react";
import styled from "styled-components";
import * as S from "./HeaderButtonStyle";
import game from "../../../../public/assets/common/navbar/sidebar/game-on.svg";
import { useNavigate } from "react-router-dom";

const GameButton: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/game");
  };

  return (
    <StyledHeaderButton onClick={handleClick}>
      <S.Icon src={game} style={{ width: "1.418rem" }}/>
    </StyledHeaderButton>
  );
};

export default GameButton;

const StyledHeaderButton = styled(S.HeaderButtonWrapper)`
  background: var(--blue);
`;
