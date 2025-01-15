import React from "react";
import styled from "styled-components";
import * as S from "./HeaderButtonStyle";
import settings from "../../../../public/assets/common/navbar/settings.svg";

const SettingButton: React.FC = () => {
  return (
    <StyledHeaderButton>
      <S.Icon src={settings} />
    </StyledHeaderButton>
  );
};

export default SettingButton;

const StyledHeaderButton = styled(S.HeaderButtonWrapper)`
  background: var(--blue);
`;
