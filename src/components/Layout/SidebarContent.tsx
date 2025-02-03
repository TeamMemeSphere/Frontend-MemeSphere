import styled from "styled-components";
import { SubTitle3Typo, SmallCaptionTypo } from "../../styles/Typography";
import NavLeftPage from "./NavLeftPage";
import { useLocation } from "react-router-dom";
import NavItem from "../Common/Navbar/NavItem";


interface SidebarProps {
    isSidebarOpen: boolean;
    setIsSidebarOpen: (isOpen: boolean) => void;
    setIsAlarmOpen: (isOpen: boolean) => void;
    setIsUserModalOpen: (isOpen: boolean) => void;
}

const SidebarContent: React.FC<SidebarProps> = ({isSidebarOpen, setIsSidebarOpen, setIsAlarmOpen, setIsUserModalOpen}) => {
    const location = useLocation();
    if (!isSidebarOpen) return null;

    // 알람 버튼 클릭 시 사이드바 닫힘
    const handleOpenAlarm = () => {
        setIsAlarmOpen(true);
        setIsSidebarOpen(false);
    };

    const handleOpenUserModal = () => {
        setIsUserModalOpen(true);
        setIsSidebarOpen(false);
    };

    const handleOpenSettingModal = () => {
        // setIsSettingModalOpen(true);
        setIsSidebarOpen(false);
    };

    return(
        <SidebarContentWrapper>
            <CloseButton src="../../../public/assets/common/navbar/close button.svg" onClick={() => setIsSidebarOpen(false)} />
            <SidebarWrapper>
                <Logo><LogoImg src="../../../public/assets/common/navbar/sidebar memesphere logo.svg" /><LogoTitle>MemeSphere</LogoTitle></Logo>
                
                <NavLeftContainer>
                    <NavLeftPageWrapper currentPath={location.pathname}>
                        <NavLeftPage />
                    </NavLeftPageWrapper>

                    <DivideBar />

                    <SectionTitle>개인</SectionTitle>
                    <NavItemsContainer>
                        <NavItem 
                            icon1={<img src="../../../public/assets/common/navbar/sidebar/sidebar alarm on.svg" alt="알림 on"/>}
                            icon2={<img src="../../../public/assets/common/navbar/sidebar/sidebar alarm off.svg" alt="알림 off" />}
                            label="알림"
                            onClick={handleOpenAlarm}
                            isSidebar={true}
                        />
                        <NavItem 
                            icon1={<img src="../../../public/assets/common/navbar/sidebar/sidebar user on.svg" alt="프로필 on"/>}
                            icon2={<img src="../../../public/assets/common/navbar/sidebar/sidebar user off.svg" alt="프로필 off" />}
                            label="프로필"
                            onClick={handleOpenUserModal}
                            isSidebar={true}
                        />
                        <NavItem 
                            icon1={<img src="../../../public/assets/common/navbar/sidebar/sidebar setting on.svg" alt="설정 on"/>}
                            icon2={<img src="../../../public/assets/common/navbar/sidebar/sidebar setting off.svg" alt="설정 off" />}
                            label="설정"
                            onClick={handleOpenSettingModal}
                            isSidebar={true}
                        />
                    </NavItemsContainer>
                </NavLeftContainer>
            </SidebarWrapper>
        </SidebarContentWrapper>
    );
};

export default SidebarContent;

const SectionTitle = styled(SmallCaptionTypo)`
    margin-top: 1.563rem;
    color: var(--white-60);
`;
const NavItemsContainer = styled.div`
    margin: 0.813rem 0px;
`;

const SidebarContentWrapper = styled.div`
    z-index: 999;
`;
const Logo = styled.div`
    color: var(--white-100);
    display: flex;
    align-items: center;
    margin-bottom: 1.563rem;
    margin-top: 3rem;
`;
const LogoImg = styled.img`
    width: 1.875rem;
    margin-left: 0.5rem;
`;
const LogoTitle = styled(SubTitle3Typo)`
    margin-left: 0.688rem;
`;

const NavLeftPageWrapper = styled.nav<{currentPath: string}>`
    display: flex;
    flex-direction: column;
    gap: 0.813rem;
    margin-bottom: 0.75rem;

    & > a {
        width: 100%;
        padding: 0.625rem 0.375rem;
        gap: 0.188rem;
        text-decoration: none;
    }
    & > a:hover {
        background-color: rgba(225, 225, 225, 0.1);
        border-radius: 0.625rem;
    }
    & > a.active {
        background-color:  rgba(225, 225, 225, 0.1);
        border-radius: 0.625rem;
    }
`;
const NavLeftContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0.625rem 1rem;
`;
const SidebarWrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    right: 0;
    width: 12.313rem;
    height: 100%;
    background-color: var(--grey-100);
`;
const CloseButton = styled.img`
    width: 2.563rem;
    position: fixed;
    top: 2.688rem;
    right: 13.563rem;
`;


const DivideBar = styled.div`
    width: 100%;
    border: 0.063rem solid var(--white-10);
`;