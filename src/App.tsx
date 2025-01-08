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
  SignUp,
} from "./pages";
import Navbar from "./components/Layout/Navbar.tsx";
import Footer from "./components/Layout/Footer.tsx";

function App() {
  return (
    <>
      <GlobalStyle />
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
          <Route path="/SignUp" element={<SignUp />}></Route>
        </Routes>
      <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
