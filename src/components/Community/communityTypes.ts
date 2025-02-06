export type chatInfo = {
    id: number;
    message: string;
    memeCoin: string;
    nickname: string;
    likes: number;
    created_at: string;
};

export type coinInfo = {
    id : number,
    name : string,
    symbol : string,
    image : string,
    chatInfo? : chatInfo
};