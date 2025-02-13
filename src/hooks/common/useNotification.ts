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
  const data = await res.json();
  return data.result;
  };

const deleteNotificationAPI = async({token, notificationId}:{token:string; notificationId: number}) => {
  const res = await fetch(API_ENDPOINTS.ALARM_MODIFY(notificationId), {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }
  });
  if (!res.ok) {
    throw new Error("Failed to add notification");
  }
  const data = await res.json();

  return data.result.notificationList;
};

const toggleNotificationAPI = async({token, notificationId}:
  {token:string; notificationId: number}) => {
    const res = await fetch(API_ENDPOINTS.ALARM_MODIFY(notificationId), {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    });
    if (!res.ok) {
      throw new Error("Failed to toggle notification");
    }
    const data = await res.json();

    return data.result;
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
    onSuccess: (newNotification) => {
      queryClient.setQueryData(["notifications", token], (oldData: notificationType[] | undefined) => {
        return oldData ? [...oldData, newNotification] : newNotification;
      });
    }
  });

  const deleteNotification = useMutation({
    mutationFn:(notificationId: number) => deleteNotificationAPI({token, notificationId}),
    onSuccess: (remainingNotifications) => queryClient.setQueryData(["notifications", token],remainingNotifications)
  });

  const toggleNotification = useMutation({
    mutationFn:(notificationId : number) => toggleNotificationAPI({token, notificationId}),
    onSuccess: (result, notificationId) => {
      queryClient.setQueryData<notificationType[]>(["notifications", token], (prevData) => {
        if(!prevData) return prevData;
        return prevData.map((notification)=>
          notification.notificationId === notificationId
            ? {...notification, isOn: result === "알림을 켰습니다."}
            : notification
        );
      });
    },
  });

  return {
    data,
    isLoading,
    error,
    addNotification : addNotification.mutate,
    deleteNotification : deleteNotification.mutate,
    toggleNotification : toggleNotification.mutate
  };
};