import NavItem from "../Commons/Navbar/NavItem";

interface NavLeftPageProps {
  onNavItemClick: (link: string) => void;
}

const NavLeftPage: React.FC<NavLeftPageProps> = ({ onNavItemClick }) => {
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
        link="/CoinCollection"
        onClick={() => onNavItemClick("/CoinCollection")}
      />
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
