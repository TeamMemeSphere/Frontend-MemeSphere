import styled from "styled-components";
import AlarmButton from "../Commons/Navbar/AlarmButton";
import GameButton from "../Commons/Navbar/GameButton";
import UserButton from "../Commons/Navbar/UserButton";

const NavRightModal: React.FC = () => {
  return (
    <NavRightModals>
      <AlarmButton></AlarmButton>
      <UserButton></UserButton>
      <GameButton></GameButton>
    </NavRightModals>
  );
};

export default NavRightModal;

const NavRightModals = styled.div`
  display: flex;
  align-items: center;
  gap: 0.438rem;
`;
