import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { subDays } from "date-fns";
import KeywordSearch from "./KeywordSearch";
import DateRangePicker from "./DateRangePicker";
import TrendLineChart from "./LineChart";
import { fetchSearchTrend, SearchTrendRequest, Result } from "./NaverApi";
import { ErrorMessage } from "../../../Modal/Auth/SharedAuthenticationStyles";

const NaverSearchTrend: React.FC = () => {
  const [startDate, setStartDate] = useState<Date>(subDays(new Date(), 7));
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [selectedKeyword, setSelectedKeyword] = useState<string>("");
  const [chartData, setChartData] = useState<Result | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleDateChange = (newStartDate: Date, newEndDate: Date) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  const handleKeywordSelect = (keyword: string) => {
    setSelectedKeyword(keyword);
  };

  const fetchData = useCallback(async () => {
    if (!selectedKeyword) {
      setError("키워드를 선택해주세요.");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const params: SearchTrendRequest = {
        startDate: startDate.toISOString().split("T")[0],
        endDate: endDate.toISOString().split("T")[0],
        timeUnit: "date",
        keywordGroups: [
          {
            groupName: "밈코인",
            keywords: [selectedKeyword]
          }
        ]
      };

      const response = await fetchSearchTrend(params);

      if (response.isSuccess && response.result.results.length > 0) {
        setChartData(response.result.results[0]);
      } else {
        setChartData(null);
        setError("데이터를 불러오는데 실패했습니다.");
      }
    } catch (err) {
      setError("네트워크 오류가 발생했습니다.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [selectedKeyword, startDate, endDate]);

  useEffect(() => {
    if (selectedKeyword) {
      fetchData();
    }
  },[fetchData, selectedKeyword]);

  return (
    <Container>
      <FilterSection>
        <KeywordSearch onKeywordSelect={handleKeywordSelect} />
        <DateRangePicker 
          startDate={startDate} 
          endDate={endDate} 
          onDateChange={handleDateChange} 
        />
      </FilterSection>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <TrendLineChart data={chartData} isLoading={isLoading} />
    </Container>
  );
};

const Container = styled.div`
  background: var(--grey-100);
  padding: 1rem;
  border-radius: 0.5rem;
  width: 100%
  margin: 0 auto;
`;

const FilterSection = styled.div`
  background: var(--grey-90);
  border-radius: 0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 0.1rem;
  margin-bottom: 1.2rem;
`;

export default NaverSearchTrend;
