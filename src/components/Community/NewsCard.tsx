import styled, { keyframes } from "styled-components";
import * as S from "./../../styles/Typography.ts";
import React from "react";
import NewsBG from "../../../public/assets/Community/NewsBackground.png";

type NewsCardProps = {
  sourceName?: string;
  time?: string;
  title?: string;
  link?: string;
  isLoading?: boolean;
};

const NewsCard: React.FC<NewsCardProps> = ({
  sourceName,
  time,
  title,
  link,
  isLoading,
}) => {
  if (isLoading) {
    return <SkeletonCard />;
  }

  return (
    <Card as="a" href={link} target="_blank" rel="noopener noreferrer">
      <BackGroundImg src={NewsBG}></BackGroundImg>
      <ContentWrapper>
        <NewsTitle>{title}</NewsTitle>
        <FooterContainer>
          <FooterContent>{sourceName}</FooterContent>
          <FooterContent>{time}</FooterContent>
        </FooterContainer>
      </ContentWrapper>
    </Card>
  );
};

export default NewsCard;

const Card = styled.div`
  width: 100%;
  height: 10.563rem;
  border-radius: 1.25rem;
  position: relative;
  &:hover {
    opacity: 0.5;
  }

  @media (max-width: 768px) {
    height: 5rem;
  }
`;

const BackGroundImg = styled.img`
  position: absolute;
  width: 100%;
  height: 10.563rem;
  object-fit: cover;
  border-radius: 1.25rem;
  z-index: 1;

  @media (max-width: 768px) {
    height: 5rem;
  }
`;

const ContentWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 10.563rem;
  gap: 4.625rem;
  border-radius: 1.25rem;
  z-index: 2;

  @media (max-width: 768px) {
    height: 5rem;
  }
`;

const NewsTitle = styled(S.SubTitle3Typo)`
  color: white;
  cursor: pointer;
  font-family: var(--font-family-base);
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-bold);
  margin: 1.25rem 1.375rem 0px 1.375rem;
`;

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0px 1.375rem 1.25rem 1.375rem;

  /* 태블릿, 모바일 환경에서 숨기기 */
  @media (max-width: 1024px) {
    display: none;
  }
`;

const FooterContent = styled(S.CaptionTypoRegular)`
  color: var(--white-50);
`;

/** Skeleton UI Styles **/

const loadingAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const SkeletonCard = styled.div`
  width: 19.375rem;
  height: 10.563rem;
  border-radius: 1.25rem;
  background: rgba(255, 255, 255, 0.01);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      -45deg,
      rgba(255, 255, 255, 0.08) 0%,
      rgba(255, 255, 255, 0.05) 50%,
      rgba(255, 255, 255, 0.08) 100%
    );
    background-size: 200% 200%;
    animation: ${loadingAnimation} 3s ease-in-out infinite;
  }

  @media (max-width: 768px) {
    height: 5rem;
  }
`;
