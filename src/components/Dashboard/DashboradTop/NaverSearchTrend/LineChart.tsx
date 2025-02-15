import React from "react";
import styled from "styled-components";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { format, parseISO } from "date-fns";
import { Result } from "./api";

interface TrendChartProps {
  data: Result | null;
  isLoading: boolean;
}

const TrendLineChart: React.FC<TrendChartProps> = ({ data, isLoading }) => {
  if (isLoading) {
    return <LoadingMessage>데이터를 불러오는 중...</LoadingMessage>;
  }

  if (!data || !data.data || data.data.length === 0) {
    return <NoDataMessage>검색 결과가 없습니다.</NoDataMessage>;
  }

  const formattedData = data.data.map(item => ({
    ...item,
    formattedDate: format(parseISO(item.period), "MM.dd"),
  }));

  return (
    <ChartContainer>
      <ChartTitle>{data.title} 검색 트렌드</ChartTitle>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={formattedData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
          <XAxis 
            dataKey="formattedDate" 
            stroke="rgba(255, 255, 255, 0.6)"
          />
          <YAxis 
            stroke="rgba(255, 255, 255, 0.6)"
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "#26262A", 
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "rgba(255, 255, 255, 0.8)"
            }}
            formatter={(value) => [`${value}%`, "검색 비율"]}
            labelFormatter={(label) => `날짜: ${label}`}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="ratio" 
            name="검색 비율" 
            stroke="#4CAF50" 
            activeDot={{ r: 8 }}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

const ChartContainer = styled.div`
  background: var(--grey-90, #2E2E32);
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-top: 2rem;
`;

const ChartTitle = styled.h3`
  color: var(--white-90, rgba(255, 255, 255, 0.9));
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
`;

const LoadingMessage = styled.div`
  color: var(--white-60, rgba(255, 255, 255, 0.6));
  text-align: center;
  padding: 2rem;
  font-size: 1rem;
`;

const NoDataMessage = styled.div`
  color: var(--white-60, rgba(255, 255, 255, 0.6));
  text-align: center;
  padding: 2rem;
  font-size: 1rem;
`;

export default TrendLineChart;