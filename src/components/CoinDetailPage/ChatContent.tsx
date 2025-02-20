import styled from "styled-components";
import * as S from "../../styles/Typography";
import { API_ENDPOINTS } from "../../api/api";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/common/useAuth";
import LoginRequiredModal from "../Modal/LoginRequiredModal";
import UserModal from "../Modal/Auth/UserModal";

interface ChatContentProps {
  id: number;
  message: string;
  nickname: string;
  likes: number;
  liked: string;
  createdAt: string;
}

const ChatContent = ({
  id,
  message,
  nickname,
  likes,
  liked,
  createdAt,
}: ChatContentProps) => {
  const createdDate = new Date(createdAt);
  const currentDate = new Date();
  const createdTime = createdDate.getTime();
  const currentTime = currentDate.getTime();
  const createdDateStr = createdDate.toLocaleDateString();
  const currentDateStr = currentDate.toLocaleDateString();
  const isToday = createdDateStr === currentDateStr;
  const isSameTime = currentTime - createdTime < 60000; // less than 1 minute
  const time = isToday
    ? isSameTime
      ? "방금"
      : currentTime - createdTime < 3600000
        ? `${Math.floor((currentTime - createdTime) / 60000)}분`
        : `${createdDate.getHours() < 10
          ? `0${createdDate.getHours()}`
          : createdDate.getHours()
        }:${createdDate.getMinutes() < 10
          ? `0${createdDate.getMinutes()}`
          : createdDate.getMinutes()
        }`
    : createdDateStr;

  const storageNickname = localStorage.getItem("nickName");
  const isSentByMe = nickname === storageNickname;

  const { coinId } = useParams<{ coinId: string }>();

  const { CHAT_LIKE } = API_ENDPOINTS;

  const handleLike = async () => {
    try {
      const res = await fetch(`${CHAT_LIKE(Number(coinId))}?chat_id=${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      await handleLike();
    },
    onMutate() { },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["LiveChatCard"],
      });
    },
    onError(error) {
      console.log(error);
    },
  });

  const accessToken = window.localStorage.getItem("accessToken");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isAuthenticated = useAuth();

  useEffect(() => {
    if (isModalOpen && !isAuthenticated) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openUserModal = () => {
    setIsUserModalOpen(true);
  };

  const closeUserModal = () => {
    setIsUserModalOpen(false);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setIsUserModalOpen(false);
  };

  const toggleLike = async () => {
    if (!accessToken) {
      setIsModalOpen(true);
      return;
    }
    mutation.mutate();
  }

  return (
    <Container>
      <ChatContentWrapper $isSentByMe={isSentByMe}>
        <ProfileWrapper>
          <ProfileImage
            src="/assets/DetailPage/default-profile.svg"
            alt="profile image"
          />
        </ProfileWrapper>
        <ChatMessage $isSentByMe={isSentByMe}>{message}</ChatMessage>
      </ChatContentWrapper>
      <ChatInfoWrapper $isSentByMe={isSentByMe}>
        {isSentByMe ? (
          <>
            <S.SmallCaptionTypo>{time}</S.SmallCaptionTypo>
            <LikeWrapper onClick={() => { }}>
              <img src="/assets/DetailPage/like-heart.svg" alt="좋아요" />
              {likes}
            </LikeWrapper>
          </>
        ) : (
          <>
            <NicknameWrapper>{nickname}</NicknameWrapper>
            <LikeWrapper onClick={toggleLike}>
              {
                liked ?
                  <img src="/assets/DetailPage/like-heart-fill.svg" alt="좋아요" />
                  :
                  <img src="/assets/DetailPage/like-heart.svg" alt="좋아요" />
              }
              {likes}
            </LikeWrapper>
            <S.SmallCaptionTypo>{time}</S.SmallCaptionTypo>
          </>
        )}
      </ChatInfoWrapper>
      {isModalOpen &&
        (!accessToken && <LoginRequiredModal onClose={closeModal} isReqLogin={true} toLogin={openUserModal} />)}
      {isUserModalOpen && <UserModal closeModal={() => closeUserModal()}></UserModal>}
    </Container>
  );
};

export default ChatContent;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.344rem;
`;

const ProfileWrapper = styled.div`
  /* width: 1.75rem;
    height: 1.75rem; */
  padding: 0.438rem;
  display: flex;
  align-self: flex-end;
  border-radius: 50%;
  background-color: var(--light-grey, #9095a0);
  justify-content: center;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 0.875rem;
  height: 0.875rem;
`;

interface ChatContentWrapperProps {
  $isSentByMe: boolean;
}

const ChatContentWrapper = styled.div<ChatContentWrapperProps>`
  display: flex;
  gap: 0.5rem;
  flex-direction: ${(props) => (props.$isSentByMe ? "row-reverse" : "row")};
`;

const ChatMessage = styled(S.ChatTextTypo) <ChatContentWrapperProps>`
  width: 100%;
  height: fit-content;
  padding: 0.75rem;
  border-radius: ${(props) =>
    props.$isSentByMe
      ? "0.938rem 0.938rem 0 0.938rem"
      : "0.938rem 0.938rem 0.938rem 0"};
  background-color: var(--white-10);
`;

const ChatInfoWrapper = styled.div<ChatContentWrapperProps>`
  display: flex;
  gap: 1rem;
  justify-content: ${(props) =>
    props.$isSentByMe ? "flex-end" : "flex-start"};
  margin-left: ${(props) => (props.$isSentByMe ? 0 : "2.25rem")};
  margin-right: ${(props) => (props.$isSentByMe ? "2.25rem" : 0)};
`;

const LikeWrapper = styled(S.SmallCaptionTypo)`
  display: flex;
  gap: 0.313rem;
  align-items: center;
  cursor: pointer;
`;

const NicknameWrapper = styled(S.SmallCaptionTypo)`
  margin-right: 1rem;
`;
