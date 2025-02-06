import React, { useEffect } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../../../api/api";
import { useNavigate } from "react-router-dom";

const KakaoRedirect: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    console.log("카카오 로그인 인가 코드:", code);

    if (!code) {
      console.error("카카오 로그인 인가코드 발급 오류:");
      return;
  }

  const sendCodeToBackend = async (code: string) => {
    try {
      console.log(`백엔드에 인가 코드 전송: ${API_ENDPOINTS.USER_KAKAO}?code=${code}`);

      const response = await axios.post(`${API_ENDPOINTS.USER_KAKAO}?code=${code}`);
      console.log("카카오 로그인 응답:", response.data);
      console.log("result 객체:", response.data.result);

      if (response.data.isSuccess) {
        const { accessToken, refreshToken } = response.data.result;
        if (!accessToken) throw new Error("토큰 없음");

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("isLoginSuccess", "true");

        const previousPath = sessionStorage.getItem("previousPath") || "/";
        sessionStorage.removeItem("previousPath");
        navigate(previousPath, {replace: true});

        setTimeout(() => {
          window.dispatchEvent(new Event("openGreetingModal"));
        }, 300);
      } else {
      console.error("카카오 로그인 실패", response.data.message);
    }
  } catch(error) {
    console.error("카카오 로그인 실패:", error);

    if (axios.isAxiosError(error)) {
      console.error("⚠️ 상태 코드:", error.response?.status);
      console.error("⚠️ 응답 데이터:", error.response?.data);
      console.error("⚠️ 전체 에러 객체:", error);
    } else {
      console.error("⚠️ 알 수 없는 오류:", error);
  }
}
  };
  sendCodeToBackend(code);
}, [navigate]);

  return (
    <>
      <div>카카오 로그인 처리 중...</div>
    </>
  );
};

export default KakaoRedirect;
