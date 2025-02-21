import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ChatTextTypo } from "../../styles/Typography";
import { useLocation } from "react-router-dom";
import UserModal from "../Modal/Auth/UserModal";

const Footer: React.FC = () => {
  // const [showUserModal, setShowUserModal] = useState(false);
  // const location = useLocation();
  // useEffect(() => {
  //   if (location.state?.showUserModal) {
  //     window.scrollTo(0, 0);
  //       setShowUserModal(true);
  //   }
  // }, [location]);
  
  // const closeModal = () => {
  //   setShowUserModal(false);
  // };

  return (
    <>
    {/* {showUserModal && <UserModal closeModal={closeModal}/>} */}
    <FooterWrapper>
      <Content>
        <div>© MemeSphere All rights reserved.</div>
        <Links>
          <a href="/about-us">회사소개</a>
          <span>|</span>
          <a href="/notices">공지사항</a>
          <span>|</span>
          <a href="/privacy-policy">개인정보보호정책</a>
          <span>|</span>
          <a href="/terms-of-service">이용약관</a>
          <span>|</span>
          <a href="/contact">Contact Us</a>
        </Links>
      </Content>
    </FooterWrapper>
    </>
  );
};

export default Footer;

const FooterWrapper = styled.footer`
  background-color: var(--grey-50);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 11.25rem;
  position: relative;
  transform: translateY(0%);
`;

const Content = styled(ChatTextTypo).attrs({ as: "span" })`
    color: #CCCCCC;
    text-align: center;
`;

const Links = styled.div`
    padding-top: 0.938rem;
  a {
    color: #CCCCCC;
    text-decoration: none;
    margin: 0 0.313rem;
  }
  a:hover {
    text-decoration: underline;
  }
  span {
    margin: 0 0.313rem;
  }
`;
