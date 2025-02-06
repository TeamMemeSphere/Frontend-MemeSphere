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
  NewsFeed,
  SearchResults,
} from "./pages";
import Navbar from "./components/Layout/Navbar.tsx";
import Footer from "./components/Layout/Footer.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import KakaoRedirect from "./components/Modal/Auth/KakaoRedirect.tsx";

const queryClient = new QueryClient({ /* options */ });

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
            <Route path="/CoinDetailPage" element={<CoinDetailPage />}></Route>
            <Route path="/Community" element={<Community />}></Route>
            <Route path="/DashBoard" element={<DashBoard />}></Route>
            <Route path="/NewsFeed" element={<NewsFeed />}></Route>
            <Route path="/SearchResults" element={<SearchResults />}></Route>
            <Route path="/user/login/oauth2/kakao" element={<KakaoRedirect />}></Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
