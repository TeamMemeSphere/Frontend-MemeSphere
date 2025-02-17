import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { EventSourcePolyfill } from "event-source-polyfill";
import { useAuth } from "./useAuth";
import { API_ENDPOINTS } from "../../api/api";
import { alertHistoryType } from "../../components/Notification/NotificationType";


const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  
  return `${year}.${month}.${day} ${hours}:${minutes}`;
};

const useSSEAlert = () => {
  const [alertHistory, setAlertHistory] = useState<alertHistoryType[]>([]);

  const {isAuthenticated} = useAuth();

  const authTokens = {
    accessToken: localStorage.getItem("accessToken") ?? "",
    refreshToken: localStorage.getItem("refreshToken") ?? "",
  };

  const eventSourceRef = useRef<EventSourcePolyfill | null>(null);

  // 푸시 알림 수신을 위한 SSE 연결
  useEffect(() => { 
    if (!isAuthenticated) {
      if (eventSourceRef.current) {
        console.log("로그아웃 감지: SSE 연결 해제");
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
      return;
    }

    const subscribeSSE = () => {
      if (!eventSourceRef.current && authTokens.accessToken) {
        console.log("SSE 구독 시작");

        eventSourceRef.current = new EventSourcePolyfill(
          API_ENDPOINTS.SUBSCRIBE_SSE,
          {
            headers: { Authorization: `Bearer ${authTokens.accessToken}` },
            withCredentials: true,
          }
        );

        eventSourceRef.current.onopen = () => {
          console.log("SSE 연결 성공");
        };

        eventSourceRef.current.onmessage = (event) => {
          try {
            console.log("event.data",event.data);
            const parsedData = JSON.parse(event.data);

            const notificationWithTimestamp = {
              ...parsedData,
              receivedAt: formatDate(new Date()), // 현재 시간 추가
            };
            setAlertHistory((prev)=>[...prev, notificationWithTimestamp]);

            toast(`🔥 ${parsedData.name}, 변동성 ${parsedData.volatility}% 도달!`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          } catch (error) {
            console.log("문자열 데이터 응답 : ", event.data);
            console.log("알림 푸시 메시지 처리 중 발생 :", error);
          }
        };

        eventSourceRef.current.onerror = (error) => {
          console.log("SSE 에러: ", error);
          eventSourceRef.current?.close();
          eventSourceRef.current = null;

          setTimeout(() => {
            if (isAuthenticated) {
              subscribeSSE();
            }
          }, 5000);
        };
      }
    };

    subscribeSSE();

    return () => {
      console.log("페이지 이동: SSE 유지됨");
    };
  }, [isAuthenticated, authTokens.accessToken]);

  const deleteHistory = (id : number) =>{
    setAlertHistory((prev)=>
        prev.filter((history)=> history.notificationId !== id)
    );
};
  return {alertHistory, deleteHistory};
};

export default useSSEAlert;