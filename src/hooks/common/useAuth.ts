import { useEffect, useState } from "react";

export const useAuth = () => {
    // localStorage에 accessToken 여부에 따라 로그인 상태 확인
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [nickName, setNickname] = useState<string>("밈스피어");

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

    const logout = () => {
        console.log("로그아웃 성공, 토큰 삭제 및 상태 변경");
        localStorage.clear();
        setIsAuthenticated(false);
        window.dispatchEvent(new Event("storage"));
    };
    
    return { isAuthenticated, nickName, login, logout };
};