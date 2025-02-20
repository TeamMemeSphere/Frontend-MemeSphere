import { useEffect, useRef, useState } from "react";
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
import styled from "styled-components";

interface CoinCardChartProps {
  symbol: string;
  chartOptions?: {
    width?: number;
    height?: number;
    margin?: { left: number; right: number; top: number; bottom: number };
    disableInteraction?: boolean;
    showXAxisTicks?: boolean;
    zoomEnabled?: boolean;
  };
}

const CoinCardChart = ({ symbol, chartOptions = {} }: CoinCardChartProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    width = 626,
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
    refetchInterval: 1000 * 60,
  });

  const LoadingComponent = () => {
    return (
      <SkeletonWrapper>
        <ChartLine />
        <ChartLine />
        <ChartLine />
        <ChartLine />
        <ChartLine />
        <ChartLine />
        <ChartLine />
        <ChartLine />
      </SkeletonWrapper>
    );
  };

  const ChartComponent = () => {
    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
      (d) => d.date,
    );

    const { data, xScale, xAccessor, displayXAccessor } =
      xScaleProvider(candlestickData);

    const max = xAccessor(data[data.length - 1]);
    const xExtents = [max - 17, max + 3];
    return (
      width > 0 && (
        <ChartCanvas
          height={height}
          width={width} // 부모 컴포넌트의 너비를 동적으로 전달
          ratio={3}
          margin={margin}
          seriesName="Data"
          data={data}
          xScale={xScale}
          xAccessor={xAccessor}
          displayXAccessor={displayXAccessor}
          xExtents={xExtents}
          zoomAnchor={() => 0}
          disableInteraction={disableInteraction}
        >
          <Chart id={1} yExtents={(d) => [d.high, d.low]}>
            <XAxis
              tickLabelFill={"#ffffff4d"}
              fontFamily="Pretendard"
              fontWeight={400}
              strokeStyle="#fff"
              innerTickSize={10}
              showTicks={showXAxisTicks}
              ticks={4}
              zoomEnabled={zoomEnabled}
            />
            <YAxis
              strokeStyle="#fff"
              tickLabelFill={"#fff"}
              showGridLines={true}
              gridLinesStrokeStyle={"rgba(255, 255, 255, 0.10)"}
              gridLinesStrokeWidth={1}
              ticks={6}
              zoomEnabled={zoomEnabled}
              tickFormat={(d) => d.toFixed(4)}
            />
            <CandlestickSeries
              fill={(d) => (d.close > d.open ? "#FB6571" : "#345DFD")}
              wickStroke={(d) => (d.close > d.open ? "#FB6571" : "#345DFD")}
              clip={false}
            />
            <MouseCoordinateX displayFormat={(d) => d.toTimeString()} />
            <MouseCoordinateY displayFormat={(d) => d.toFixed(4)} />
          </Chart>
          <CrossHairCursor />
        </ChartCanvas>
      )
    );
  };

  if (error) return <div>Error loading data</div>;

  return (
    <ChartContainer ref={containerRef}>
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
      {
        isLoading ? <LoadingComponent /> : <ChartComponent />
      }
    </ChartContainer>
  );
};

export default CoinCardChart;

const ChartContainer = styled.div`
  width: 100%;
`;

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

const SkeletonWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  margin-top: 3.063rem;
  border-radius: 10px;
  display: flex;
  gap: 1.938rem;
  flex-direction: column;
`;

const ChartLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--white-10);
`;