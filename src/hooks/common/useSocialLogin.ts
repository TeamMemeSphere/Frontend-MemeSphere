export const useSocialLogin = () => {

    const KAKAO_REST_API_KEY = import.meta.env.VITE_APP_KAKAO_REST_API_KEY;
    const KAKAO_REDIRECT_URI = import.meta.env.VITE_APP_KAKAO_REDIRECT_URI;
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

    const GOOGLE_CLIENT_ID = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;
    const GOOGLE_REDIRECT_URI = import.meta.env.VITE_APP_GOOGLE_REDIRECT_URI;
    const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=email profile`;

    const handleSocialLogin = (provider: "kakao" | "google") => {
        let authUrl = "";
        const currentUrl = window.location.href;
        localStorage.setItem("redirectAfterLogin", currentUrl);
        
        switch (provider) {
        case "kakao":
            authUrl = KAKAO_AUTH_URL;  
            break;
        case "google":
            authUrl = GOOGLE_AUTH_URL;
            break;
        default:
            console.error("지원하지 않는 로그인 방식입니다.");
            return;
        }
    window.location.href = authUrl;
    };
    return {handleSocialLogin};
};