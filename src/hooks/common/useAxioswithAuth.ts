import axios, { AxiosHeaders } from "axios";
import { API_ENDPOINTS } from "../../api/api";

const authAxios = axios.create();

authAxios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");

        if (!config.headers) {
            config.headers = new AxiosHeaders();
        }

        if (token) {
            config.headers.set("Authorization", `Bearer ${token}`);
    }
        return config;
    },
    (error) => Promise.reject(error)
);

authAxios.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401 && error.response?.data?.code === "EXPIRED TOKEN") {
            console.warn("401 오류 발생, 토큰 갱신 시도");

            const refreshToken = localStorage.getItem("refreshToken");
            if (!refreshToken) {
                console.log("리프레시 토큰이 없어 갱신 실패, 로그아웃");
                alert("세션이 만료되었습니다. 다시 로그인해주세요.");
                localStorage.clear();
                window.dispatchEvent(new Event("storage"));
                return Promise.reject(error);
            }

            try {
                const res = await axios.post(API_ENDPOINTS.USER_REISSUE, {}, {
                    headers: { Authorization: `Bearer ${refreshToken}` },
                });

                if (res.data?.result?.accessToken) {
                    console.log("새로운 액세스 토큰 발급 완료");
                    localStorage.setItem("accessToken", res.data.result.accessToken);
                    localStorage.setItem("refreshToken", res.data.result.refreshToken);
                    localStorage.setItem("nickName", res.data.result.nickName);

                    error.config.headers.Authorization = `Bearer ${res.data.result.accessToken}`;
                    return authAxios(error.config);
                }
            } catch (refreshError) {
                console.error("토큰 갱신 실패:", refreshError);
                alert("세션이 만료되었습니다. 다시 로그인해주세요.");
                localStorage.clear();
                window.dispatchEvent(new Event("storage"));
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default authAxios;
