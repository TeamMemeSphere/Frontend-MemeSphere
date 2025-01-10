import React from "react";
import styled from "styled-components";
import NavItem from "../Common/Navbar/NavItem";

const Navbar: React.FC = () => {
    return (
        <Nav>
        <NavbarLeft>
            <Logo>MemeSphere</Logo>
            <NavItemWrapper>
                <NavItem 
                    icon1={<img src="../../../public/assets/common/CollectionIcon-On.svg" alt="Collection Icon"/>} 
                    icon2={<img src="../../../public/assets/common/CollectionIcon-Off.svg" alt="Collection Icon"/>}
                    label="컬렉션" 
                    link="/CoinCollection" />
                <NavItem 
                    icon1={<img src="../../../public/assets/common/DashboradIcon-On.svg" alt="DashBoard Icon" />}
                    icon2={<img src="../../../public/assets/common/DashboradIcon-Off.svg" alt="DashBoard Icon" />} 
                    label="대시보드" 
                    link="/DashBoard" />
                <NavItem 
                    icon1={<img src="../../../public/assets/common/CommunityIcon-On.svg" alt="Community Icon" />} 
                    icon2={<img src="../../../public/assets/common/CommunityIcon-Off.svg" alt="Community Icon" />} 
                    label="커뮤니티" 
                    link="/Community" />
            </NavItemWrapper>
        </NavbarLeft>
        </Nav>
    );
};

export default Navbar;

// 폰트 사이즈, 색깔 추후 수정
const NavbarLeft = styled.div`
    display: flex;
    padding-left: 62px;
    padding-top: 53px;
`;

const Logo = styled.a`
    font-size: var(--font-size-md); {/*28px*/} 
    font-weight: bold;
    margin-right: 43px; 
    color: white;
`;

const NavItemWrapper = styled.nav`
    display: flex;
    align-items: center;
`;

const Nav = styled.div`
    width: 100%;
    background-color: black;
`;