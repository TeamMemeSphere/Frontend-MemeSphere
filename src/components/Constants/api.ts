const BASE_URL : string = import.meta.env.VITE_APP_BASE_URL || "" ;

export const API_ENDPOINTS = {
    DASHBOARD_TREND: `${BASE_URL}/dashboard/trend`,
    DASHBOARD_OVERVIEW: `${BASE_URL}/dashboard/overview`,
    DASHBOARD_CHART: `${BASE_URL}/dashboard/chart`,
    COIN_DETAIL: (memeId: number) => `${BASE_URL}/detail/${memeId}`,
    CHATTING: (coinId: number) => `${BASE_URL}/latest/${coinId}`,
    ALARM_ENROLL: `${BASE_URL}/notification/enroll`,
    ALARM_MODIFY: (notificaionId: string) => `${BASE_URL}/notification/${notificaionId}`,
    ALARM_LIST: `${BASE_URL}/notification/list`,
    PUSH_ALARM_LIST: `${BASE_URL}/push-notifications`,
    PUSH_ALARM_CONFIRM: (notificaionId: string) => `${BASE_URL}/push-notifications/${notificaionId}`,
    USER_SIGNUP: `${BASE_URL}/user/signup`,
    USER_SIGNIN: `${BASE_URL}/user/signin`,
    USER_KAKAO: `${BASE_URL}/user/login/oauth2/kakao`,
    SEARCH: `${BASE_URL}/search`,
    COLLECTION: `${BASE_URL}/collection`,
};

console.log("api 기본 주소:", BASE_URL);

