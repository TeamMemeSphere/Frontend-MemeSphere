import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { TitleTypo } from "../../styles/Typography";
import NavLeftPage from "./NavLeftPage";
import SearchBar from "../Common/Navbar/SearchBar";
import NavRightModal from "./NavRightIcon";
import SidebarContent from "./SidebarContent";
import Overlay from "../Common/Overlay";
import AlarmModal from "../Modal/AlarmModal";
import UserModal from "../Modal/Auth/UserModal";
import { NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isCompact, setIsCompact] = useState(window.innerWidth <= 1234);
  const [isSibebarOpen, setIsSidebarOpen] = useState(false);
  const [isAlarmOpen, setIsAlarmOpen] = useState(false);

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  // 사이드바가 열리면 스크롤이 비활성화
  useEffect(() => {
    if (isSibebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isSibebarOpen]);

  useEffect(() => {
    const handleResize = () => {
      setIsCompact(window.innerWidth <= 1234);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 프로필 버튼 클릭 시 사이드바 닫힘
  const handleOpenUserModal = () => {
    setIsUserModalOpen(true);
    setIsSidebarOpen(false);
  };

  return (
    <Nav>
      <NavLeft>
        <Logo to="/">
            <LogoImg src="../../../public/assets/common/navbar/memesphere main logo.svg" />
            <LogoTypo>MemeSphere</LogoTypo>
        </Logo>
        {!isCompact && <NavLeftPageWrapper><NavLeftPage /></NavLeftPageWrapper>}
      </NavLeft>

      <NavRight>
        <SearchBar></SearchBar>
        {isCompact ? (
          <MenuIcon src="../../../public/assets/common/navbar/menu button.svg" onClick={() => setIsSidebarOpen(!isSibebarOpen)} />
          ) : (
            <NavRightModal />
          )}
      </NavRight>
      
      {isSibebarOpen && <Overlay onClick={() => setIsSidebarOpen(false)} />}
      {isSibebarOpen && (
        <SidebarContent 
          isSidebarOpen={isSibebarOpen} 
          setIsSidebarOpen={setIsSidebarOpen} 
          setIsAlarmOpen={setIsAlarmOpen}
          setIsUserModalOpen={handleOpenUserModal}/>
      )}
      {isAlarmOpen && <AlarmModal closeModal={() => setIsAlarmOpen(false)} />}
      {isUserModalOpen && <UserModal closeModal={() => setIsUserModalOpen(false)} />}
    </Nav>
  );
};

export default Navbar;

const MenuIcon = styled.img`
  width: 2.563rem;
`;
const Logo = styled(NavLink)`
  text-decoration: none;
  display: flex;
  margin-left: 4.306vw;
`;
const LogoImg = styled.img`
  width: 1.813rem;
  margin-right: 0.188rem;
`;

const LogoTypo = styled(TitleTypo)`
  
  color: var(--white-100);
  display: flex;
`;

const NavLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 2.778vw;
`;

const NavLeftPageWrapper = styled.div`
  display:flex;
  align-items: center;
  gap: 1.875rem;

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