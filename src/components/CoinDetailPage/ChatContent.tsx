import styled from "styled-components";
import * as S from "../../styles/Typography";
import { API_ENDPOINTS } from "../../api/api";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ChatContentProps {
  id: number;
  message: string;
  nickname: string;
  likes: number;
  createdAt: string;
}

const ChatContent = ({ id, message, nickname, likes, createdAt }: ChatContentProps) => {
  const createdDate = new Date(createdAt);
  const currentDate = new Date();
  const createdTime = createdDate.getTime();
  const currentTime = currentDate.getTime();
  const createdDateStr = createdDate.toLocaleDateString();
  const currentDateStr = currentDate.toLocaleDateString();
  const isToday = createdDateStr === currentDateStr;
  const isSameTime = (currentTime - createdTime) < 60000; // less than 1 minute
  const time = isToday ?
    (isSameTime ?
      "방금"
      :
      currentTime - createdTime < 3600000 ?
        `${Math.floor((currentTime - createdTime) / 60000)}분`
        :
        `${createdDate.getHours() < 10 ?
          `0${createdDate.getHours()}`
          :
          createdDate.getHours()
        }:${createdDate.getMinutes() < 10 ?
          `0${createdDate.getMinutes()}`
          :
          createdDate.getMinutes()
        }`
    )
    :
    createdDateStr;
  
  const storageNickname = localStorage.getItem("nickName");
  const isSentByMe = nickname === storageNickname;

  const { coinId } = useParams<{ coinId: string }>();

  const { CHAT_LIKE } = API_ENDPOINTS;

  const handleLike = async () => {
    try {
      const res = await fetch(`${CHAT_LIKE(coinId)}?chat_id=${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  }

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      await handleLike()
    },
    onMutate() {
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["LiveChatCard"]
      })
    },
    onError(error) {
      console.log(error)
    }
  })

  return (
    <Container>
      <ChatContentWrapper $isSentByMe={isSentByMe}>
        <ProfileWrapper>
          <ProfileImage src="/assets/DetailPage/default-profile.svg" alt="profile image" />
        </ProfileWrapper>
        <ChatMessage $isSentByMe={isSentByMe}>
          {message}
        </ChatMessage>
      </ChatContentWrapper>
      <ChatInfoWrapper $isSentByMe={isSentByMe}>
        {isSentByMe ?
          <>
            <S.SmallCaptionTypo>{time}</S.SmallCaptionTypo>
            <LikeWrapper onClick={() => {}}>
              <img src="/assets/DetailPage/like-heart.svg" alt="좋아요" />
              {likes}
            </LikeWrapper>
          </>
          :
          <>
            <LikeWrapper onClick={() => mutation.mutate()}>
              <img src="/assets/DetailPage/like-heart.svg" alt="좋아요" />
              {likes}
            </LikeWrapper>
            <S.SmallCaptionTypo>{time}</S.SmallCaptionTypo>
          </>
        }
      </ChatInfoWrapper>
    </Container>
  );
}

export default ChatContent;

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.344rem;
`

const ProfileWrapper = styled.div`
    /* width: 1.75rem;
    height: 1.75rem; */
    padding: 0.438rem;
    display: flex;
    align-self: flex-end;
    border-radius: 50%;
    background-color: var(--light-grey, #9095A0);
    justify-content: center;
    align-items: center;
`

const ProfileImage = styled.img`
    width: 0.875rem;
    height: 0.875rem;
`

interface ChatContentWrapperProps {
  $isSentByMe: boolean;
}

const ChatContentWrapper = styled.div<ChatContentWrapperProps>`
    display: flex;
    gap: 0.5rem;
    flex-direction: ${(props) => props.$isSentByMe ? 'row-reverse' : 'row'};
`

const ChatMessage = styled(S.ChatTextTypo) <ChatContentWrapperProps>`
    width: 100%;
    height: fit-content;
    padding: 0.75rem;
    border-radius: ${(props) => props.$isSentByMe ? '0.938rem 0.938rem 0 0.938rem' : '0.938rem 0.938rem 0.938rem 0'};
    background-color: var(--white-10);
`

const ChatInfoWrapper = styled.div<ChatContentWrapperProps>`
    display: flex;
    gap: 1rem;
    justify-content: ${(props) => props.$isSentByMe ? 'flex-end' : 'flex-start'};
    margin-left: ${(props) => props.$isSentByMe ? 0 : '2.25rem'};
    margin-right: ${(props) => props.$isSentByMe ? '2.25rem' : 0};
`

const LikeWrapper = styled(S.SmallCaptionTypo)`
    display: flex;
    gap: 0.313rem;
    align-items: center;
    cursor: pointer;
`