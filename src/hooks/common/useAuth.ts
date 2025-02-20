import { useEffect, useState } from "react";
import { API_ENDPOINTS } from "../../api/api";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
    // localStorage에 accessToken 여부에 따라 로그인 상태 확인
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [nickName, setNickname] = useState<string>("밈스피어");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        const storedNickName = localStorage.getItem("nickName");

        setIsAuthenticated(!!token);
        setNickname(storedNickName || "밈스피어");

        const checkAuth = () => {
            console.log("storage 변경 감지! 로그인 상태 업데이트");
            const newtoken = localStorage.getItem("accessToken");
            const newNickNmae = localStorage.getItem("nickName");
            setIsAuthenticated(!!newtoken);
            setNickname(newNickNmae || "밈스피어");
        };
        window.addEventListener("storage", checkAuth);
        return () => {
            window.removeEventListener("storage", checkAuth);
        };
    }, []);

    const login = (accessToken: string, refreshToken: string, nickName: string) => {
        console.log("로그인 성공");
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("nickName", nickName);
        setIsAuthenticated(true);
        setNickname(nickName);
        window.dispatchEvent(new Event("storage"));
    };

    const logout = async () => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            alert ("로그아웃에 실패했습니다. 다시 시도해 주세요.");
            console.warn("로그아웃 api 요청을 보낼 토큰이 없음");
            return;
        }
        try {
            const response = await fetch(API_ENDPOINTS.USER_SIGNOUT, {
                method: "POST", 
                headers: {
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = errorData?.message || "로그아웃에 실패했습니다. 다시 시도해 주세요.";
                throw new Error(errorMessage);
            }
            console.log("로그아웃 성공, 토큰 삭제 및 상태 변경");
            localStorage.clear();
            setIsAuthenticated(false);
            window.dispatchEvent(new Event("storage"));
            window.location.reload();
            
            const previousPath = sessionStorage.getItem("previousPath") || "/";
            navigate(previousPath, {replace: true, state: {showUserModal: true}});
        } catch (error) {
            console.error("로그아웃 요청 중 오류 발생:", error);
            const errorMessage = error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.";
            alert(errorMessage);
        }
    };

    const refreshToken = async (): Promise<boolean> => {
        console.log("액세스 토큰 갱신 요청");
        const refreshToken = localStorage.getItem("refreshToken");
    
        if (!refreshToken) {
            console.warn("리프레시 토큰이 없어 액세스 토큰 갱신 실패");
            return false;
        }
    
        try {
            const response = await fetch(API_ENDPOINTS.USER_REISSUE, {
                method: "POST",
                headers: {"Content-Type" : "application/json",
                    Authorization: `Bearer ${refreshToken}`,
                },
            });
    
            if(!response.ok) {
                throw new Error("토큰 갱신 실패");
            }
    
            const data = await response.json();
            console.log("새 엑세스 토큰 발급 완료:", data);
            
            if (data?.result?.accessToken) {
                localStorage.setItem("accessToken", data.result.accessToken);
                localStorage.setItem("refreshToken", data.result.refreshToken);
                localStorage.setItem("nickName", data.result.nickName);
                setIsAuthenticated(true);
                setNickname(data.result.nickName);
                window.dispatchEvent(new Event("storage"));
                return true;
            }
        } catch (error) {
            console.error("액세스 토큰 갱신 실패:", error);
            alert("세션이 만료되었습니다. 다시 로그인해주세요");
            return false;
        }
        return false;
    };

    return { isAuthenticated, nickName, login, logout, refreshToken };
};