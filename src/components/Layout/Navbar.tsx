import React from "react";
import styled from "styled-components";
import NavItem from "../Common/Navbar/NavItem";
import SearchBar from "../Common/Navbar/SearchBar";
import HeaderButton from "../Common/Navbar/HeaderButton";
import bell from "../../../public/assets/common/navbar/bell.svg";
import user from "../../../public/assets/common/navbar/user.svg";
import settings from "../../../public/assets/common/navbar/settings.svg";
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
        <HeaderButton icon={bell} color="var(--green)"></HeaderButton>
        <HeaderButton icon={user} color="var(--purple)"></HeaderButton>
        <HeaderButton icon={settings} color="var(--blue)"></HeaderButton>
      </NavRight>
    </Nav>
  );
};

export default Navbar;

// 폰트 사이즈, 색깔 추후 수정
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
