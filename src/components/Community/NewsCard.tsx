import styled from "styled-components";
import * as S from "./../../styles/Typography.ts";
import React from "react";
import NewsBG from "../../../public/assets/DetailPage/BackgroundPng.png";

type NewsCardProps = {
  sourceName?: string;
  time?: string;
  title?: string;
  link?: string;
};

const NewsCard: React.FC<NewsCardProps> = ({
  sourceName,
  time,
  title,
  link,
}) => {
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
  width: 19.375rem;
  height: 10.563rem;
  border-radius: 1.25rem;
  &:hover {
    opacity: 0.5;
  }
`;

const BackGroundImg = styled.img`
  position: absolute;
  width: 19.375rem;
  height: 10.563rem;
  object-fit: cover;
  border-radius: 1.25rem;
  z-index: 1;
`;

const ContentWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 19.375rem;
  height: 10.563rem;
  gap: 4.625rem;
  border-radius: 1.25rem;
  z-index: 2;
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
`;

const FooterContent = styled(S.CaptionTypoRegular)`
  color: var(--white-50);
`;
