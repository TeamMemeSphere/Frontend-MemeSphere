import React from "react";
import styled from "styled-components";
import NavItem from "../Common/Navbar/NavItem";
import SearchBar from "../Common/Navbar/SearchBar";
import AlarmButton from "../../components/Common/Navbar/AlarmButton";
import SettingButton from "../../components/Common/Navbar/SettingButton";
import UserButton from "../../components/Common/Navbar/UserButton";
import { TitleTypo } from "../../styles/Typography";

const Navbar: React.FC = () => {
  return (
    <Nav>
      <NavLeft>
        <Logo>MemeSphere</Logo>
        <NavItemWrapper>
          <NavItem
            icon1={
              <img
                src="../../../public/assets/common/CollectionIcon-On.svg"
                alt="Collection Icon"
              />
            }
            icon2={
              <img
                src="../../../public/assets/common/CollectionIcon-Off.svg"
                alt="Collection Icon"
              />
            }
            label="컬렉션"
            link="/CoinCollection"
          />
          <NavItem
            icon1={
              <img
                src="../../../public/assets/common/DashboradIcon-On.svg"
                alt="DashBoard Icon"
              />
            }
            icon2={
              <img
                src="../../../public/assets/common/DashboradIcon-Off.svg"
                alt="DashBoard Icon"
              />
            }
            label="대시보드"
            link="/DashBoard"
          />
          <NavItem
            icon1={
              <img
                src="../../../public/assets/common/CommunityIcon-On.svg"
                alt="Community Icon"
              />
            }
            icon2={
              <img
                src="../../../public/assets/common/CommunityIcon-Off.svg"
                alt="Community Icon"
              />
            }
            label="커뮤니티"
            link="/Community"
          />
        </NavItemWrapper>
      </NavLeft>

      <NavRight>
        <SearchBar></SearchBar>
        <AlarmButton></AlarmButton>
        <UserButton></UserButton>
        <SettingButton></SettingButton>
      </NavRight>
    </Nav>
  );
};

export default Navbar;

const Logo = styled(TitleTypo)`
  margin-left: 4.306vw;
  color: var(--white-100);
`;

const NavItemWrapper = styled.nav`
  display: flex;
  align-items: center;
`;

const NavLeft = styled.div`
  display: flex;
  algin-items: center;
  gap: 2.778vw;
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 0.438rem;
  margin-right: 4.306vw;
`;

const Nav = styled.div`
  width: 100%;
  background-color: var(--background-black);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 3.981vh;
  margin-bottom: 2.593vh;
`;
