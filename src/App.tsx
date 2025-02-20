//import "./App.css";
import GlobalStyle from "./styles/GlobalStyle.ts";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import {
  AlertDashBoard,
  CoinCollection,
  CoinDetailPage,
  Community,
  DashBoard,
  LandingPage,
  SearchResults,
} from "./pages";
import Navbar from "./components/Layout/Navbar.tsx";
import Footer from "./components/Layout/Footer.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import KakaoRedirect from "./components/Modal/Auth/KakaoRedirect.tsx";
import GoogleRedirect from "./components/Modal/Auth/GoogleRedirect.tsx";
import GamePage from "./pages/Game.tsx";
import { ToastContainer } from "react-toastify";
import LandingPageNavbar from "./pages/LandingPageNavbar.tsx";

// QueryClient 설정
const queryClient = new QueryClient();

function App() {
  return (
    <>
    <GlobalStyle />
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <RoutesWithNavbarFooter />
      </BrowserRouter>
    </QueryClientProvider>
    </>
  );
}

function RoutesWithNavbarFooter() {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  return (
    <>
      {isLandingPage ? <LandingPageNavbar /> : <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/AlertDashBoard" element={<AlertDashBoard />} />
        <Route path="/CoinCollection" element={<CoinCollection />} />
        <Route path="/CoinDetailPage/:coinId" element={<CoinDetailPage />} />
        <Route path="/Community" element={<Community />} />
        <Route path="/DashBoard" element={<DashBoard />} />
        <Route path="/SearchResults" element={<SearchResults />} />
        <Route path="/user/login/oauth2/kakao" element={<KakaoRedirect />} />
        <Route path="/user/login/oauth2/google" element={<GoogleRedirect />} />
        <Route path="/game" element={<GamePage />} />
      </Routes>
      {!isLandingPage && <Footer />}
      <ToastContainer />
    </>
  );
}

export default App;
