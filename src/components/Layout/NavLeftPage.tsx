import { useEffect, useState } from "react";
import NavItem from "../Commons/Navbar/NavItem";
import { useAuth } from "../../hooks/common/useAuth";
import LoginRequiredModal from "../Modal/LoginRequiredModal";
import UserModal from "../Modal/Auth/UserModal";
import { useLocation } from "react-router-dom";

interface NavLeftPageProps {
  onNavItemClick: (link: string) => void;
}

const NavLeftPage: React.FC<NavLeftPageProps> = ({ onNavItemClick }) => {

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { isAuthenticated } = useAuth();

  const location = useLocation();

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openUserModal = () => {
    setIsUserModalOpen(true);
  };

  const closeUserModal = () => {
    setIsUserModalOpen(false);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setIsUserModalOpen(false);
  };

  useEffect(() => {
    if (isModalOpen && !isAuthenticated) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  const handleCollect = () => {
    if (!isAuthenticated) {
      setIsModalOpen(true);
      return;
    }; 
  };

  return (
    <>
      <NavItem
        icon1={
          <img
            src="/assets/common/navbar/CollectionIcon-On.svg"
            alt="Collection Icon"
            style={{ paddingTop: "6px" }}
          />
        }
        icon2={
          <img
            src="/assets/common/navbar/CollectionIcon-Off.svg"
            alt="Collection Icon"
            style={{ paddingTop: "6px" }}
          />
        }
        label="컬렉션"
        // link={isAuthenticated ? "/CoinCollection" : `${location.pathname}`}
        link="/CoinCollection"
        onClick={handleCollect}
      />
      {isModalOpen &&
        (!isAuthenticated && <LoginRequiredModal onClose={closeModal} isReqLogin={true} toLogin={openUserModal} />)}
      {isUserModalOpen && <UserModal closeModal={() => closeUserModal()}></UserModal>}
      <NavItem
        icon1={
          <img
            src="/assets/common/navbar/DashboradIcon-On.svg"
            alt="DashBoard Icon"
            style={{ paddingTop: "6px" }}
          />
        }
        icon2={
          <img
            src="/assets/common/navbar/DashboradIcon-Off.svg"
            alt="DashBoard Icon"
            style={{ paddingTop: "6px" }}
          />
        }
        label="대시보드"
        link="/DashBoard"
        onClick={() => onNavItemClick("/DashBoard")}
      />
      <NavItem
        icon1={
          <img
            src="/assets/common/navbar/CommunityIcon-On.svg"
            alt="Community Icon"
            style={{ paddingTop: "6px" }}
          />
        }
        icon2={
          <img
            src="/assets/common/navbar/CommunityIcon-Off.svg"
            alt="Community Icon"
            style={{ paddingTop: "6px" }}
          />
        }
        label="커뮤니티"
        link="/Community"
        onClick={() => onNavItemClick("/Community")}
      />
    </>
  );
};

export default NavLeftPage;
