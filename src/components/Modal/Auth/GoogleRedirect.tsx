import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../../api/api";
import { useEffect } from "react";

const GoogleRedirect: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const code = new URL(window.location.href).searchParams.get("code");

        if(!code) {
            console.error("구글 로그인 인가코드 발급 오류:");
            return;
        }

        const sendCodeToBackend = async(code: string) => {
            try {
                const response = await axios.post(`${API_ENDPOINTS.USER_GOOGLE}?code=${code}`);

                if (response.data.isSuccess) {
                    const { accessToken, refreshToken, nickName } = response.data.result;
                    if (!accessToken) throw new Error("토큰 없음");

                    localStorage.setItem("accessToken", accessToken);
                    localStorage.setItem("refreshToken", refreshToken);
                    if (nickName) {
                        localStorage.setItem("nickName", nickName);
                    }
                    localStorage.setItem("isLoginSuccess", "true");

                    const previousPath = sessionStorage.getItem("previousPath") || "/";
                    sessionStorage.removeItem("previousPath");
                    navigate(previousPath, {replace: true, state: {showUserModal: true}});

                    window.dispatchEvent(new Event ("openGreetingModal"));
                } else {
                console.error("구글 로그인 실패", response.data.message);
                }
            } catch(error) {
                console.error("구글 로그인 실패:", error);

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
                    <div>구글 로그인 처리 중...</div>
                </>
            );
            };

export default GoogleRedirect;