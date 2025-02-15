import React, { useEffect, useState, useRef } from "react";
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
import LoginRequiredModal from "../Modal/LoginRequiredModal";
import { EventSourcePolyfill } from "event-source-polyfill";
import { API_ENDPOINTS } from "../../api/api";
import { useAuth } from "../../hooks/common/useAuth";
import {toast} from "react-toastify";

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
  const eventSourceRef = useRef<EventSourcePolyfill | null>(null);

  useEffect(()=>{
    setTimeout(() => {
      const mockData = {
        coin: "Ethereum",
        volatility: 3,
      };

      console.log("toast 실행");
      toast(`🔥 ${mockData.coin}, 변동성 ${mockData.volatility}% 도달!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }, 3000); // 100ms 정도 딜레이 추가

  }, []);

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

// 푸시 알림 수신을 위한 SSE 연결
useEffect(() => { 
  if (!isAuthenticated) {
    if (eventSourceRef.current) {
      console.log("로그아웃 감지: SSE 연결 해제");
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
    return;
  }

  const subscribeSSE = () => {
    if (!eventSourceRef.current && authTokens.accessToken) {
      console.log("SSE 구독 시작");

      eventSourceRef.current = new EventSourcePolyfill(
        API_ENDPOINTS.SUBSCRIBE_SSE,
        {
          headers: { Authorization: `Bearer ${authTokens.accessToken}` },
          withCredentials: true,
        }
      );

      eventSourceRef.current.onopen = () => {
        console.log("SSE 연결 성공");
      };

      eventSourceRef.current.onmessage = (event) => {
        try {
          console.log("event.data",event.data);
          const parsedData = JSON.parse(event.data);
          toast(`🔥 ${parsedData.name}, 변동성 ${parsedData.volatility}% 도달!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } catch (error) {
          console.log("문자열 데이터 응답 : ", event.data);
          console.log("알림 푸시 메시지 처리 중 발생 :", error);
        }
      };

      eventSourceRef.current.onerror = (error) => {
        console.log("SSE 에러: ", error);
        eventSourceRef.current?.close();
        eventSourceRef.current = null;

        setTimeout(() => {
          if (isAuthenticated) {
            subscribeSSE();
          }
        }, 5000);
      };
    }
  };

  subscribeSSE();

  return () => {
    console.log("페이지 이동: SSE 유지됨");
  };
}, [isAuthenticated]);
  
  // 프로필 버튼 클릭 시 사이드바 닫힘
  const handleOpenUserModal = () => {
    setIsUserModalOpen(true);
    setIsSidebarOpen(false);
  };
  // 로그인 여부 확인
  const handleLogin = () =>  {
    setIsLoggedIn(true);
    setIsUserModalOpen(false);
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsUserModalOpen(false);
  };

  const closeAlarmModal = () => {
    setIsAlarmOpen(false);
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
      {isAlarmOpen && isLoggedIn && <AlarmModal closeModal={() => setIsAlarmOpen(false)} {...authTokens}/>}
      {isAlarmOpen && !isLoggedIn && <LoginRequiredModal onClose={closeAlarmModal} isReqLogin={true} toLogin={handleOpenUserModal}/>}
      
      {isUserModalOpen && !isLoggedIn && <UserModal closeModal={() => setIsUserModalOpen(false)} onLogin={handleLogin} />}
      {isUserModalOpen && isLoggedIn && <GreetingModal onLogout={handleLogout} closeModal={() => setIsUserModalOpen(false)} />}
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