import React from "react";
import styled from "styled-components";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { format, parseISO } from "date-fns";
import { Result } from "./NaverApi";

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
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={formattedData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--white-10)" />
          <XAxis 
            dataKey="formattedDate" 
            stroke="var(--white-60)"
          />
          <YAxis 
            stroke="var(--white-60)"
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "var(--white-30)"
            }}
            formatter={(value) => [`${value}%`, "검색 비율"]}
            labelFormatter={(label) => `날짜: ${label}`}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="ratio" 
            name="검색 비율" 
            stroke="var(--green)" 
            activeDot={{ r: 8 }}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

const ChartContainer = styled.div`
  border-radius: 0.5rem;
  height: 13rem;
`;

const LoadingMessage = styled.div`
  color: var(--white-60);
  text-align: center;
  padding: 2rem;
  font-size: 1rem;
`;

const NoDataMessage = styled.div`
  color: var(--white-60);
  text-align: center;
  padding: 2rem;
  font-size: 1rem;
`;

export default TrendLineChart;