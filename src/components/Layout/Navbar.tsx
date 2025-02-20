import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { TitleTypo } from "../../styles/Typography";
import NavLeftPage from "./NavLeftPage";
import SearchBar from "../Commons/Navbar/SearchBar";
import NavRightModal from "./NavRightIcon";
import SidebarContent from "./SidebarContent";
import Overlay from "../Commons/Overlay";
import AlarmModal from "../Modal/AlarmModal";
import UserModal from "../Modal/Auth/UserModal";
import { NavLink } from "react-router-dom";
import LoginRequiredModal from "../Modal/LoginRequiredModal";
import useSSEAlert from "../../hooks/common/useSSEAlert";
import { useAuth } from "../../hooks/common/useAuth";
import ReqPCModal from "../Modal/ReqPCModal";

const Navbar: React.FC = () => {
  const [isCompact, setIsCompact] = useState(window.innerWidth <= 1234);
  const [isSibebarOpen, setIsSidebarOpen] = useState(false);
  const [isAlarmOpen, setIsAlarmOpen] = useState(false);

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const {isAuthenticated} = useAuth();

  const authTokens = {
    accessToken: localStorage.getItem("accessToken") ?? "",
    refreshToken: localStorage.getItem("refreshToken") ?? "",
  };
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useSSEAlert();

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
  // 로그인 여부 확인
  const handleLogin = () => {
    setIsLoggedIn(true);
    setIsUserModalOpen(false);
  };

  const closeAlarmModal = () => {
    setIsAlarmOpen(false);
  };

  const handleNavItemClick = () => {};

  return (
    <>
    <Nav>
      <NavLeft>
        <Logo to="/">
          <LogoImg src= "/assets/common/navbar/memesphere-main-logo.svg" />
          <LogoTypo>MemeSphere</LogoTypo>
        </Logo>
        {!isCompact && (
          <NavLeftPageWrapper>
            <NavLeftPage onNavItemClick={handleNavItemClick} />
          </NavLeftPageWrapper>
        )}
      </NavLeft>

      <NavRight>
        <SearchBar></SearchBar>
        {isCompact ? (
          <MenuIcon
            src="/assets/common/navbar/menu button.svg"
            onClick={() => setIsSidebarOpen(!isSibebarOpen)}
          />
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
          setIsUserModalOpen={handleOpenUserModal}
        />
      )}

      {isAlarmOpen
      ? localStorage.getItem("accessToken") 
      ? isMobile 
      ? <ReqPCModal onClose={closeAlarmModal}></ReqPCModal>
      : <AlarmModal closeModal={closeAlarmModal} accessToken={authTokens.accessToken}
      ></AlarmModal>
      :
      <LoginRequiredModal
      onClose={closeAlarmModal}
      isReqLogin={true}
      toLogin={handleOpenUserModal}
    />
    :
    undefined
    }
      {isUserModalOpen && !isLoggedIn && (
        <UserModal
          closeModal={() => setIsUserModalOpen(false)}
        />
      )}
    </Nav>
    </>
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
  display: flex;
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
