const BASE_URL : string = import.meta.env.VITE_APP_BASE_URL || "" ;

export const API_ENDPOINTS = {
    DASHBOARD_TREND: `${BASE_URL}/dashboard/trend`,
    DASHBOARD_OVERVIEW: `${BASE_URL}/dashboard/overview`,
    DASHBOARD_CHART: `${BASE_URL}/dashboard/chart`,
    COIN_DETAIL: (memeId: number) => `${BASE_URL}/detail/${memeId}`,
    CHATTING : (coin_id:number)=> `${BASE_URL}/chat/${coin_id}/latest`,
    ALARM_ENROLL: `${BASE_URL}/notification/enroll`,
    ALARM_MODIFY: (notificaionId: number) => `${BASE_URL}/notification/${notificaionId}`,
    ALARM_LIST: `${BASE_URL}/notification/list`,
    SUBSCRIBE_SSE: `${BASE_URL}/push-notifications/subscribe`,
    PUSH_ALARM_LIST: `${BASE_URL}/push-notifications`,
    PUSH_ALARM_CONFIRM: (notificaionId: string) => `${BASE_URL}/push-notifications/${notificaionId}`,
    USER_IMAGE: `${BASE_URL}/image/upload`,
    USER_SIGNUP: `${BASE_URL}/user/sign-up`,
    USER_SIGNUP_NICKNAME: `${BASE_URL}/user/signup/nickname/validate`,
    USER_SIGNIN: `${BASE_URL}/user/sign-in`,
    USER_SIGNOUT: `${BASE_URL}/user/sign-out`,
    USER_KAKAO: `${BASE_URL}/user/login/oauth2/kakao`,
    USER_GOOGLE: `${BASE_URL}/user/login/oauth2/google`,
    USER_REISSUE: `${BASE_URL}/user/reissue`,
    SEARCH: `${BASE_URL}/search`,
    COLLECTION: `${BASE_URL}/collection`,
};

//console.log("api 기본 주소:", BASE_URL);

