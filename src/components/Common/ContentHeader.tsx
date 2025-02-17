import styled from "styled-components";
import * as S from "../../styles/Typography.ts";

type ContentHeaderProps = {
  title: string;
  description: string;
};
const ContentHeader: React.FC<ContentHeaderProps> = ({
  title,
  description,
}) => {
  return (
    <Header>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Header>
  );
};

export default ContentHeader;

const Header = styled.div`
  display: flex;
  flex-direction: column;
`;

const Description = styled(S.BodyTypo)`
  color: var(--White-60, rgba(255, 255, 255, 0.6));
  margin: 0;
  font-family: var(--font-family-base);
  font-style: normal;
  line-height: normal;
  margin-bottom: 1.855vh;
`;

const Title = styled(S.TitleTypo)`
  color: var(--White-100, #fff);
  font-family: var(--font-family-base);
  font-style: normal;
  line-height: normal;
  margin-bottom: 0.586vh;
`;
