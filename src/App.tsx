//import "./App.css";
import GlobalStyle from "./styles/GlobalStyle.ts";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />}></Route>
            <Route path="/AlertDashBoard" element={<AlertDashBoard />}></Route>
            <Route path="/CoinCollection" element={<CoinCollection />}></Route>
            <Route path="/CoinDetailPage/:coinId" element={<CoinDetailPage />}/>
            <Route path="/Community" element={<Community />}></Route>
            <Route path="/DashBoard" element={<DashBoard />}></Route>
            <Route path="/SearchResults" element={<SearchResults />}></Route>
            <Route path="/user/login/oauth2/kakao" element={<KakaoRedirect />}></Route>
            <Route path="/user/login/oauth2/google" element={<GoogleRedirect />}></Route>
            <Route path="/game" element={<GamePage />}></Route>
          </Routes>
          <Footer />
          <ToastContainer></ToastContainer>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
