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
  chartOptions?: {
    height?: number;
    margin?: { left: number; right: number; top: number; bottom: number };
    disableInteraction?: boolean;
    showXAxisTicks?: boolean;
    zoomEnabled?: boolean;
  };
}

const CoinCardChart = ({
  width,
  symbol,
  chartOptions = {},
}: CoinCardChartProps) => {
  // Props를 통해 전달된 옵션을 설정
  const {
    height = 241,
    margin = { left: 0, right: 0, top: 0, bottom: 30 },
    disableInteraction = true,
    showXAxisTicks = false,
    zoomEnabled = false,
  } = chartOptions;

  const [interval, setInterval] = useState("1h");

  const handleIntervalChange = (interval: string) => {
    setInterval(interval);
  };

  const { getCandlestickData } = useFetchCoin();

  const {
    data: candlestickData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["candlestickData", symbol, interval],
    queryFn: () => getCandlestickData(symbol, interval),
    refetchInterval: 1000 * 60, // 1분마다 데이터 갱신
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
    (d) => d.date,
  );

  const { data, xScale, xAccessor, displayXAccessor } =
    xScaleProvider(candlestickData);

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
        height={height} // Props로 전달된 차트 높이
        width={width}
        ratio={3}
        margin={margin} // Props로 전달된 여백 설정
        seriesName="Data"
        data={data}
        xScale={xScale}
        xAccessor={xAccessor}
        displayXAccessor={displayXAccessor}
        xExtents={xExtents}
        zoomAnchor={() => 0}
        disableInteraction={disableInteraction} // Props로 상호작용 설정
      >
        <Chart id={1} yExtents={(d) => [d.high, d.low]}>
          <XAxis
            tickLabelFill={"#ffffff4d"}
            fontFamily="Pretendard"
            fontWeight={400}
            strokeStyle="#fff"
            innerTickSize={10}
            showTicks={showXAxisTicks} // Props로 눈금 표시 여부 설정
            ticks={4}
            zoomEnabled={zoomEnabled} // Props로 줌 활성화 설정
          />
          <YAxis
            strokeStyle="#fff"
            tickLabelFill={"#fff"}
            showGridLines={true}
            gridLinesStrokeStyle={"rgba(255, 255, 255, 0.10)"}
            gridLinesStrokeWidth={1}
            ticks={6}
            zoomEnabled={zoomEnabled} // Props로 줌 활성화 설정
            tickFormat={(d) => d.toFixed(4)}
          />
          <CandlestickSeries
            fill={(d) => (d.close > d.open ? "#FB6571" : "#345DFD")}
            wickStroke={(d) => (d.close > d.open ? "#FB6571" : "#345DFD")}
            clip={false}
          />
          <MouseCoordinateX displayFormat={timeDisplayFormat} />
          <MouseCoordinateY displayFormat={pricesDisplayFormat} />
        </Chart>
        <CrossHairCursor />
      </ChartCanvas>
    </>
  );
};

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
  margin-bottom: 0.625rem;
`;

const IntervalButton = styled.button<{ $isActive: boolean }>`
  background: transparent;
  color: var(--white-100);
  width: 2.75rem;
  height: 1.5rem;
  border: none;
  border-bottom: ${({ $isActive }) =>
    $isActive ? "0.094rem solid var(--white-100)" : "none"};
  font-size: 0.75rem;
  font-weight: ${({ $isActive }) => ($isActive ? 600 : 400)};
  font-family: "Pretendard";
  cursor: pointer;
`;
