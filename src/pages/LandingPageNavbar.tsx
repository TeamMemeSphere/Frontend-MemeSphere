import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BodyTypo, TitleTypo } from "../styles/Typography";

const LandingPageNavbar = () => {
  const navigate = useNavigate();
  
  // const LandingButton = () => {
  //   navigate("/dashboard", {state: {showUserModal: true}});
  // };

  return (
    <Wrapper>
        <Logo to="/">
            <LogoImg src="/assets/common/navbar/memesphere-main-logo.svg" />
            <LogoTypo>MemeSphere</LogoTypo>
        </Logo>
        <NavButtonOne onClick={()=>navigate("/dashboard")}>Memesphere 시작하기</NavButtonOne> 
        <NavButtonTwo onClick={()=>navigate("/dashboard")}>시작하기</NavButtonTwo>
    </Wrapper>
  );
};

export default LandingPageNavbar;

const Wrapper = styled.div`
  position: absolute;
  z-index: 999;
`;

const Logo = styled(NavLink)`
  position: fixed;
  top: 3.25rem;
  left: 3.875rem;
  text-decoration: none;
  display: flex;
  align-items: center;

  @media (max-width: 480px) {
    display: none;
  }
`;
const LogoImg = styled.img`
  width: 1.813rem;
  margin-right: 0.3rem;
`;

const LogoTypo = styled(TitleTypo)`
  color: var(--white-100);
  z-index: 2;
`;

const NavButtonOne = styled(BodyTypo)`
  width: 13.875rem;
  height: 2.688rem;
  border-radius: 15px;
  background-color: var(--blue);
  text-align: center;
  line-height: 2.688rem;
  cursor: pointer;

  position: fixed;
  top: 3.25rem;
  right: 3.875rem; 
  z-index: 1;

  @media (max-width: 480px) {
    display: none;
  }
`;

const NavButtonTwo = styled(BodyTypo)`
  width: 13.875rem;
  height: 2.688rem;
  border-radius: 15px;
  background-color: var(--blue);
  text-align: center;
  line-height: 2.688rem;
  cursor: pointer;

  position: fixed;
  top: 3.25rem;
  right: 3.875rem; 
  z-index: 1;

  @media (max-width: 480px) {
    width: 8rem;
    right: 1rem;
    top: 2.5rem;
  }
  @media (min-width: 480px) {
    display: none;
  }
`;