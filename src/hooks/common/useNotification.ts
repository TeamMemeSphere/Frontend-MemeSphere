import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import { API_ENDPOINTS } from "../../api/api";
import { notificationType, notificationWithoutId } from "../../components/Notification/NotificationType";

const fetchNotificationList = async (token : string) => {
  const res = await fetch(API_ENDPOINTS.ALARM_LIST, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if(!res.ok){
    throw new Error("Failed to fetch notification List");
  }

  const data = await res.json();
  return data.result.notificationList;
};


const addNotificationAPI = async ({token, notification}: {token:string; notification: notificationWithoutId}) => {
  const res = await fetch(API_ENDPOINTS.ALARM_ENROLL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(notification),
  });
  if (!res.ok) {
    throw new Error("Failed to add notification");
  }

  return res.json();
};

export const useNotification = (token : string) => {
  const queryClient = useQueryClient();

  const {data, isLoading, error} = useQuery({
    queryKey: ["notifications",token],
    queryFn: () => fetchNotificationList(token),
    enabled: !!token,
  });

  const addNotification = useMutation({
    mutationFn: (notification: notificationWithoutId) => addNotificationAPI({ token, notification }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notifications", token] })
  }).mutate;

  return {
    data,
    isLoading,
    error,
    addNotification
  };
};