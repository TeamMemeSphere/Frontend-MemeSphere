import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import { API_ENDPOINTS } from "../../api/api";

const fetchNotificationList = async (token : string) => {
  const response = await fetch(API_ENDPOINTS.ALARM_LIST, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if(!response.ok){
    throw new Error("Failed to fetch notification List");
  }

  const data = await response.json();
  return data.result.notificationList;
};

export const useNotification = (token : string) => {
  const queryClient = useQueryClient();
  const {data, isLoading, error} = useQuery({
    queryKey: ["notifications"],
    queryFn: () => fetchNotificationList(token),
    enabled: !!token,
  });

  return {
    data,
    isLoading,
    error,
  };
};