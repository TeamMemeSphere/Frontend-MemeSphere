import React from "react";
import styled from "styled-components";

const Footer: React.FC = () => {
  return (
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
  );
};

export default Footer;

// 폰트 사이즈, 색깔 추후 수정
const FooterWrapper = styled.footer`
  background-color: #1E1E20;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 180px;

  position: absolute;
  bottom: 0;
`;

const Content = styled.div`
    color: #CCCCCC;
    font-size: 14px;
    text-align: center;
`;

const Links = styled.div`
    padding-top: 15px;
  a {
    color: #CCCCCC;
    text-decoration: none;
    margin: 0 5px;
  }
  a:hover {
    text-decoration: underline;
  }
  span {
    margin: 0 5px;
  }
`;
