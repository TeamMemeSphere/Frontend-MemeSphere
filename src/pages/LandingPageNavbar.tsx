import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BodyTypo, TitleTypo } from "../styles/Typography";

const LandingPageNavbar = () => {

  const navigate = useNavigate();
  const LandingButton = () => {
    navigate("/dashboard", {state: {showUserModal: true}});
  };

  return (
    <Wrapper>
        <Logo to="/">
            <LogoImg src="/assets/common/navbar/memesphere-main-logo.svg" />
            <LogoTypo>MemeSphere</LogoTypo>
        </Logo>
        <NavButton onClick={LandingButton}>MemeSphere 시작하기</NavButton>
    </Wrapper>
  );
};

export default LandingPageNavbar;

const Wrapper = styled.div`
  position: absolute;
  z-index: 1;
`;

const Logo = styled(NavLink)`
  position: fixed;
  top: 3.25rem;
  left: 3.875rem;
  text-decoration: none;
  display: flex;
  align-items: center;
`;
const LogoImg = styled.img`
  width: 1.813rem;
  margin-right: 0.3rem;
`;

const LogoTypo = styled(TitleTypo)`
  color: var(--white-100);
  z-index: 2;
`;

const NavButton = styled(BodyTypo)`
  width: 222px;
  height: 43px;
  border-radius: 15px;
  background-color: var(--blue);
  text-align: center;
  line-height: 43px;
  cursor: pointer;

  position: fixed;
  top: 3.25rem;
  right: 3.875rem; 
  z-index: 1;

  @media (max-width: 560px) {
    display: none;
  }
`;