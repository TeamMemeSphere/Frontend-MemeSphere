// 모달 실행시 배경이 불투명해지는 효과
// ex 유저 모달(로그인, 회원가입), 사이드바 실행시
import styled from "styled-components";

interface OverlayProps {
  onClick?: () => void;
}

const Overlay: React.FC<OverlayProps> = ({ onClick }) => {
  return <StyledOverlay onClick={onClick} />;
};

export default Overlay;

const StyledOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(30, 30, 32, 0.8);
  z-index: 998;
  transition: all 0.3s ease;
`;
