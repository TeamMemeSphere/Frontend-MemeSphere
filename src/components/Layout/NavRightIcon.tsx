import styled from "styled-components";
import AlarmButton from "../Common/Navbar/AlarmButton";
import SettingButton from "../Common/Navbar/SettingButton";
import UserButton from "../Common/Navbar/UserButton";

const NavRightModal: React.FC = () => {
    return (
      <NavRightModals>
        <AlarmButton></AlarmButton>
        <UserButton></UserButton>
        <SettingButton></SettingButton>
      </NavRightModals>
    );
};

export default NavRightModal;

const NavRightModals = styled.div`
    display: flex;
    align-items: center;
    gap: 0.438rem;
`;