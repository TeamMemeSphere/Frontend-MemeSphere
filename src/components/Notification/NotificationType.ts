export type notificationType = {
        notificationId : number,
        name : string,
        symbol : string,
        volatility : number,
        stTime : number,
        isRising : boolean,
        isOn : boolean,
};

export type notificationWithoutId = {
        name : string,
        symbol : string,
        volatility : number,
        stTime : number,
        isRising : boolean,
        isOn : boolean,
};

export type alertHistoryType = notificationType & { 
        receivedAt : string,
        coinId : number
};