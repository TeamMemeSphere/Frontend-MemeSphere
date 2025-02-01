import { useState } from "react";
import { useFetchCoin } from "../../hooks/common/useFetchCoin";
import { useQuery } from "@tanstack/react-query";
import {
    Chart,
    ChartCanvas,
    CandlestickSeries,
    XAxis,
    YAxis,
    MouseCoordinateX,
    MouseCoordinateY,
    CrossHairCursor,
    discontinuousTimeScaleProvider,
} from "react-financial-charts";
import { timeFormat } from "d3-time-format";
import { format } from "d3-format";
import styled from "styled-components";

interface CoinCardChartProps {
    width: number;
    symbol: string;
}

const CoinCardChart = ({ width, symbol }: CoinCardChartProps) => {
    const [interval, setInterval] = useState("1h");

    const handleIntervalChange = (interval: string) => {
        setInterval(interval);
    }

    const { getCandlestickData } = useFetchCoin();

    const { data: candlestickData, error, isLoading } = useQuery({
        queryKey: ["candlestickData", symbol, interval],
        queryFn: () => getCandlestickData(symbol, interval),
        refetchInterval: 1000 * 60 // 1분마다 데이터 갱신
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading data</div>;

    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
        (d) => d.date // 데이터에서 날짜 정보를 가져오는 방식 지정
    );

    const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(
        candlestickData,
    );

    const max = xAccessor(data[data.length - 1]);
    const xExtents = [max - 17, max + 3];

    const dateTimeFormat = "%I:%M";
    const timeDisplayFormat = timeFormat(dateTimeFormat);
    const pricesDisplayFormat = format(".4f");

    return (
        <>
            <IntervalWrapper>
                <IntervalButton
                    $isActive={interval === "1h"}
                    onClick={() => handleIntervalChange("1h")}
                >
                    1h
                </IntervalButton>
                <IntervalButton
                    $isActive={interval === "4h"}
                    onClick={() => handleIntervalChange("4h")}
                >
                    4h
                </IntervalButton>
                <IntervalButton
                    $isActive={interval === "1d"}
                    onClick={() => handleIntervalChange("1d")}
                >
                    1D
                </IntervalButton>
                <IntervalButton
                    $isActive={interval === "1w"}
                    onClick={() => handleIntervalChange("1w")}
                >   
                    1W
                </IntervalButton>
            </IntervalWrapper>
            <ChartCanvas
                height={241} // 차트 높이
                width={width} // 차트 너비 (컨테이너 크기 기준으로 동적 설정)
                ratio={3} // 픽셀 밀도 설정 (기본값 3)
                margin={{ left: 0, right: 0, top: 0, bottom: 30 }} // 차트 여백
                seriesName="Data" // 차트 데이터 시리즈 이름
                data={data} // 차트에 전달할 데이터
                xScale={xScale} // X축 스케일
                xAccessor={xAccessor} // 데이터를 X축에서 접근하는 방식
                displayXAccessor={displayXAccessor} // X축에 표시할 데이터 형식
                xExtents={xExtents} // X축 범위
            >
                <Chart id={1} yExtents={(d) => [d.high, d.low]}>
                    {/* Y축 범위: 데이터의 high, low 값을 기준으로 설정 */}
                    <XAxis
                        tickLabelFill={"#ffffff4d"} // 눈금 레이블 색상
                        fontFamily="Pretendard"
                        fontWeight={400}
                        strokeStyle="#fff" // 축 색상
                        innerTickSize={10}
                        showTicks={false}
                        ticks={4} // 눈금 레이블 개수
                    />
                    <YAxis
                        strokeStyle="#fff"
                        tickLabelFill={"#fff"}
                        showGridLines={true} // 그리드 라인 표시
                        gridLinesStrokeStyle={"rgba(255, 255, 255, 0.10)"} // 그리드 라인 색상
                        gridLinesStrokeWidth={1} // 그리드 라인 두께
                        // strokeStyle="#fff"
                        ticks={6}
                        zoomEnabled={false} // 축 확대 기능 비활성화
                        tickFormat={(d) => d.toFixed(4)} // 눈금 레이블 형식
                    />
                    <CandlestickSeries
                        fill={(d) => (d.close > d.open ? "#FB6571" : "#345DFD")}
                        wickStroke={(d) => (d.close > d.open ? "#FB6571" : "#345DFD")}
                        clip={false}
                    /> {/* 캔들스틱 차트를 렌더링 */}
                    <MouseCoordinateX displayFormat={timeDisplayFormat} />
                    <MouseCoordinateY
                        displayFormat={pricesDisplayFormat}
                    />
                </Chart>
                <CrossHairCursor /> {/* 마우스의 교차점을 시각화 */}
            </ChartCanvas>
        </>
    )
}

export default CoinCardChart;

const IntervalWrapper = styled.div`
    box-sizing: border-box;
    display: flex;
    width: 100%;
    height: 1.5rem;
    padding: 0px 1.813rem;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
    /* margin-top: 0.938rem; */
    margin-bottom: 0.625rem;
`

const IntervalButton = styled.button<{ $isActive: boolean }>`
    background: transparent;
    color: var(--white-100);
    width: 2.75rem;
    height: 1.5rem;
    border: none;
    border-bottom: ${({ $isActive }) => $isActive ? "0.094rem solid var(--white-100)" : "none"};
    font-size: 0.75rem;
    font-weight: ${({ $isActive }) => $isActive ? 600 : 400};
    font-family: "Pretendard";
    cursor: pointer;
`