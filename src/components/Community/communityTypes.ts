export type chatInfo = {
    author : string,
    time : string,
    content : string,
    like : number,
    profileImgSrc? : string
}

export type coinInfo = {
    id : number,
    name : string,
    symbol : string,
    imgSrc : string,
    chatInfo? : chatInfo
}