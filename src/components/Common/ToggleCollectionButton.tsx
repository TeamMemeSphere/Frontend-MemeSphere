import styled from "styled-components";
import { Icon } from "./Icon";
import axios from "axios";
import { API_ENDPOINTS } from "../../api/api";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";



interface ToggleCollectionButtonProps {
  coinId: number;
  isCollected: boolean;
}

const ToggleCollectionButton = ({ coinId, isCollected }: ToggleCollectionButtonProps) => {
  const { COLLECTION } = API_ENDPOINTS

  const myStorage = window.localStorage;
  const accessToken = myStorage.getItem("accessToken")

  const toggleCollect = async () => {
    try {
      if (isCollected) {
        const response = await axios.delete(`${COLLECTION}/${coinId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        )
        return response.data;
      } else {
        const response = await axios.post(`${COLLECTION}/${coinId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        )
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      await toggleCollect()
    },
    onMutate() {
    },
    onSuccess(data) {
      console.log(data)
      queryClient.invalidateQueries({
        queryKey: ["DashBoard"]
      })
      queryClient.invalidateQueries({
        queryKey: ["CoinCollection"]
      })
      queryClient.invalidateQueries({
        queryKey: ["SearchResults"]
      })
    },
    onError(error) {
      console.log(error)
    }
  })

  const mutate = () => {
    mutation.mutate()
  }

  const onToggle = (e: any) => {
    e.preventDefault()
    mutate()
  }

  return (
    isCollected ?
      <Icon src="assets/common/collect-star-fill.svg" alt="star-fill" onClick={onToggle} /> 
      :
      <Icon src="assets/common/collect-star.svg" alt="star" onClick={onToggle}/>
  )
}

export default ToggleCollectionButton;

