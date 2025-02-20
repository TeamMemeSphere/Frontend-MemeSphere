import styled from "styled-components";
import { Icon } from "./Icon";
import axios from "axios";
import { API_ENDPOINTS } from "../../api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../hooks/common/useAuth";
import { useEffect, useState } from "react";
import LoginRequiredModal from "../Modal/LoginRequiredModal";
import UserModal from "../Modal/Auth/UserModal";


interface ToggleCollectionButtonProps {
  coinId: number;
  isCollected: boolean;
}

const ToggleCollectionButton = ({ coinId, isCollected }: ToggleCollectionButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { COLLECTION } = API_ENDPOINTS

  const myStorage = window.localStorage;
  const accessToken = myStorage.getItem("accessToken")

  const { isAuthenticated } = useAuth();

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

  const toggleCollect = async () => {
    if (!isAuthenticated) {
      setIsModalOpen(true);
      return;
    }

    try {
      if (isCollected) {
        const response = await axios.delete(`${COLLECTION}/${coinId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        )
        console.log(response.data);
        return response.data;
      } else {
        const response = await axios.post(`${COLLECTION}/${coinId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );
        console.log(response.data);
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      await toggleCollect();
    },
    onMutate() {
    },
    onSuccess(data) {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: ["DashBoard"]
      });
      queryClient.invalidateQueries({
        queryKey: ["CoinCollection"]
      });
      queryClient.invalidateQueries({
        queryKey: ["SearchResults"]
      });
    },
    onError(error) {
      console.log(error);
    }
  });

  const onToggle = (e: React.MouseEvent) => {
    mutation.mutate();
  };

  return (
    <>
      {
        isCollected ?
          <StarIcon src="assets/common/collect-star-fill.svg" alt="star-fill" onClick={onToggle} />
          :
          <StarIcon src="assets/common/collect-star.svg" alt="star" onClick={onToggle} />
      }
      {isModalOpen &&
        (!accessToken && <LoginRequiredModal onClose={closeModal} isReqLogin={true} toLogin={openUserModal} />)}
      {isUserModalOpen && <UserModal closeModal={() => closeUserModal()}></UserModal>}
    </>
  )
}

export default ToggleCollectionButton;

const StarIcon = styled(Icon)`
  cursor: pointer;
`;

