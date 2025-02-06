import styled from "styled-components";
// 아이콘
interface IconProps {
  $margin?: string;
}

export const Icon = styled.img<IconProps>`
  margin: ${(props) => props.$margin};
`;
