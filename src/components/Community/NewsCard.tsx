import styled from "styled-components";
import * as S from "./../../styles/Typography.ts";


type NewsCardProps = {
    article : string,
    sourceName : string,
    time : string,
};

const NewsCard : React.FC<NewsCardProps> = ({article,sourceName, time}) => {
    return <Card>
        <BackGroundImg src="https://s3-alpha-sig.figma.com/img/7a1f/5c0d/3b2b121f091cf5e2e2175aa7132e4b20?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=E5NNFN6mIQAnTS~8AIAmDHqwTcwPt1oknQwFPR1LRp4iIYu2D3J7JN2amUR8Uvhrn40akxkIWMfRr8romGVBMcdTV3i0L694wSsyVMPVHGeJ-Ld55ubPxU0VJ0JYeeUM4jGJFXSGxxq9FQsXyUa92YOxJb2RA0JAgtbYpp8c9KRV7i54nB~oqL9TOrrT1spoG9PmzoRbUaVjtHRDmFBSWuHRH0hBuCYXN2t5lBP4ivA0raM9P-0rQaz28OdNjm-etwqHJO-0O6bxesY6Y8rUSu-m1D21W48eupqDK5WxFWdrSN70-4cPN9aQBc0HjNUTSV4gzsZu-CBpD~9vFDaidw__"></BackGroundImg>
        <ContentWrapper>
            <NewsTitle>{article}</NewsTitle>
            <FooterContainer>
                <FooterContent>{sourceName}</FooterContent>
                <FooterContent>{time}</FooterContent>
            </FooterContainer>
        </ContentWrapper>
    </Card>;
};

export default NewsCard;

const Card = styled.div`
    width : 19.375rem;
    height : 10.563rem;
    border-radius: 1.25rem;
    &:hover {
    opacity: 0.5;
}
`;

const BackGroundImg = styled.img`
    position : absolute;
    width : 19.375rem;
    height : 10.563rem;
    object-fit : cover;
    border-radius : 1.25rem;
    opacity : 0.3;
    z-index : 1;
`;

const ContentWrapper = styled.div`
    position : absolute;
    display : flex;
    flex-direction : column;
    justify-content: center;
    width : 19.375rem;
    height : 10.563rem;
    gap : 4.625rem;
    border-radius: 1.25rem;
    z-index : 2;
`;

const NewsTitle = styled(S.SubTitle3Typo)`
    font-family: var(--font-family-base);
    font-size: var(--font-size-body);
    font-weight: var(--font-weight-bold);
    margin : 1.25rem 1.375rem 0px 1.375rem;
`;

const FooterContainer = styled.div` 
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin : 0px 1.375rem 1.25rem 1.375rem;
`;

const FooterContent = styled(S.CaptionTypoRegular)`
    color : var(--white-50);
`;