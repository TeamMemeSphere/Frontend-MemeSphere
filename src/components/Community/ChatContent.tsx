import styled from "styled-components";
import { chatInfo } from "./chatInfo";
import DefaultProfile from "./DefaultProfile";
import * as S from "./../../styles/Typography.ts";

type ChatContentProps = {
    author : string,
    time : string,
    content : string,
    like : number,
    profileImgSrc : string
};
const ChatContent : React.FC<ChatContentProps> = ({author, time, content, like, profileImgSrc}) => (
    <CommentContainer>
        {profileImgSrc
            ?<ProfileImg></ProfileImg>
            :<DefaultProfile></DefaultProfile>}
        <TextContainer>
            <Header>
                <Author>{author}</Author>
                <Time>{time}</Time>
            </Header>
            <Content>{content}</Content>
            <LikeButton>
                <LikeImg src="public/assets/Community/LikeIcon.svg"></LikeImg>
                <LikeText>{like}</LikeText>
            </LikeButton>
        </TextContainer>
    </CommentContainer>
);

export default ChatContent;

const CommentContainer = styled.div`
    display: flex;
    padding: 1.125rem 2.083vw;
    justify-content: center;
    align-items: flex-start;
    gap: 0.833vw;
    align-self: stretch;

    border-radius: 1.25rem;
    border: 1px solid var(--White-10, rgba(255, 255, 255, 0.10));
`;

const ProfileImg = styled.img`
    width: 1.75rem;
    height: 1.75rem;
    border-radius: 50%;
    margin-right: 1rem;
    border-radius: 0.875rem;
    background: var(--light-grey, #9095A0)
`;

const TextContainer = styled.div`
    flex: 1;
    display : flex;
    flex-direction : column;
    gap : 0.625rem;
`;

const Header = styled.div`
    display : flex;
    gap : 0.875rem;
`;
const Author = styled(S.CaptionTypoBold)`
    color : var(--white-100);
`;

const Time = styled(S.CaptionTypoLight)`
    color : var(--white-100);
`;

const Content = styled(S.ChatTextTypo)`
    white-space: pre-line;
`;

const LikeButton = styled.div`
    display: flex;
    align-items: center;
    gap : 0.375rem;
    background : transparent;
`;

const LikeImg = styled.img`
    width : 0.938rem;
    height : 0.938rem;
`;

const LikeText = styled(S.CaptionTypoRegular)`
    color : var(--white-50);
`;