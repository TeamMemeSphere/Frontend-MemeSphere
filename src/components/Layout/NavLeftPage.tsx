import NavItem from "../Common/Navbar/NavItem";

const NavLeftPage: React.FC = () => {
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
            />
        </>
    );
};

export default NavLeftPage;
