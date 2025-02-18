import { axiosInstance } from "../../components/axios/axios-instance";
import { useState } from "react";

export const useFetchCoin = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getCandlestickData = async (symbol: string, interval: string) => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.get(`/klines?symbol=${symbol}&interval=${interval}`);
            const data =  response.data.map((data: any) => ({
                date: new Date(data[0]),
                open: data[1],
                high: data[2],
                low: data[3],
                close: data[4],
                volume: data[5],
            }));
            return data;
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    // 거래량 데이터 가져오기
    const getVolumeData = async (symbol: string, interval: string) => {
        const candlestickData = await getCandlestickData(symbol, interval);
        return candlestickData?.map((item: any) => ({
            time: item.date,
            volume: item.volume,
        }));
    };

    return { getCandlestickData, getVolumeData, isLoading };

};