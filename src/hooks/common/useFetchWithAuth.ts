export const fetchWithAuth = async (
    url: string, 
    options: RequestInit = {},
    auth: {refreshToken: () => Promise<boolean>; logout: () => void}
) => {
    let token = localStorage.getItem("accessToken");

    if (!token) {
        console.log("액세스 토큰이 없어 로그아웃 진행");
        auth.logout();
        return null;
    }

    const response = await fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${token}`,
        },
    });

    if (response.status === 401) {
        console.warn("토큰 만료 감지, 갱신 시도");
        const success = await auth.refreshToken();
        if (!success) {
            console.error("토큰 갱신 실패, 로그아웃 진행");
            auth.logout();
            return null; 
        }

        token = localStorage.getItem("accessToken");

        const retryResponse = await fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                Authorization: `Bearer ${token}`,
            },
        });

        if (!retryResponse.ok) {
            console.error("토큰 갱신 후에도 요청 실패:", retryResponse.status);
            return null;
        }
    }

    return response;
};
