import { useEffect, useState } from "react";

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem("accessToken"));

    useEffect(() => {
        const checkAuth = () => {
            console.log("storage 변경 감지! 로그인 상태 업데이트");
            const token = localStorage.getItem("accessToken");
            setIsAuthenticated(!!token);
        };
        checkAuth();
        window.addEventListener("storage", checkAuth);
        return () => {
            window.removeEventListener("storage", checkAuth);
        };
    }, []);

    const login = (accessToken: string, refreshToken: string, nickname: string) => {
        console.log("로그인 성공");
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("nickname", nickname);
        setIsAuthenticated(true);
        window.dispatchEvent(new Event("stroage"));
    };

    const logout = () => {
        console.log("로그아웃 성공, 토큰 삭제 및 상태 변경");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("nickname");
        setIsAuthenticated(false);
        window.dispatchEvent(new Event("storage"));
    };
    
    return { isAuthenticated, login, logout };
};