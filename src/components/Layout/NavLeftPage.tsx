import NavItem from "../Common/Navbar/NavItem";

interface NavLeftPageProps {
    onNavItemClick: (link: string) => void;
}

const NavLeftPage: React.FC<NavLeftPageProps> = ({onNavItemClick}) => {
    return(
        <>
            <NavItem
                icon1={
                    <img
                    src="../../../public/assets/common/navbar/CollectionIcon-On.svg"
                    alt="Collection Icon"
                    />
                }
                icon2={
                    <img
                    src="../../../public/assets/common/navbar/CollectionIcon-Off.svg"
                    alt="Collection Icon"
                    />
                }
                label="컬렉션"
                link="/CoinCollection"
                onClick={() => onNavItemClick("/CoinCollection")}
            />
            <NavItem
                icon1={
                    <img
                    src="../../../public/assets/common/navbar/DashboradIcon-On.svg"
                    alt="DashBoard Icon"
                    />
                }
                icon2={
                    <img
                    src="../../../public/assets/common/navbar/DashboradIcon-Off.svg"
                    alt="DashBoard Icon"
                    />
                }
                label="대시보드"
                link="/DashBoard"
                onClick={() => onNavItemClick("/DashBoard")}
            />
            <NavItem
            icon1={
                <img
                src="../../../public/assets/common/navbar/CommunityIcon-On.svg"
                alt="Community Icon"
                />
            }
            icon2={
                <img
                src="../../../public/assets/common/navbar/CommunityIcon-Off.svg"
                alt="Community Icon"
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
