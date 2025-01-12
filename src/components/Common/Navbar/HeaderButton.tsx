import React from "react";
import styled from "styled-components";

interface HeaderButtonProps {
  icon: string;
  color: string;
}

const HeaderButton: React.FC<HeaderButtonProps> = ({ icon, color }) => {
  return (
    <HeaderButtonWrapper color={color}>
      <Icon src={icon} />
    </HeaderButtonWrapper>
  );
};

export default HeaderButton;

const HeaderButtonWrapper = styled.div<{ color?: string }>`
  display: flex;
  width: 2.563rem;
  height: 2.563rem;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid var(--white-10, rgba(255, 255, 255, 0.1));
  background: ${({ color }) => color};
`;

const Icon = styled.img`
  width: 1.188rem;
  height: 1.188rem;
`;
