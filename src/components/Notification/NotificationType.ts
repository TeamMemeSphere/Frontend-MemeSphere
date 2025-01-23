export type notificationType = {
        id : number,
        name : string,
        symbol : string,
        volatility : number,
        period : number,
        direction : "RISE" | "FALL",
        isAlertOn : "ON" | "OFF",
};