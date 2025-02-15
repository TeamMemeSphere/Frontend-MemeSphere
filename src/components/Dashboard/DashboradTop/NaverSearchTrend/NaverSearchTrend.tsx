import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { subDays } from "date-fns";
import KeywordSearch from "./KeywordSearch";
import DateRangePicker from "./DateRangePicker";
import TrendLineChart from "./LineChart";
import { fetchSearchTrend, SearchTrendRequest, Result } from "./api";

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
  }, [selectedKeyword, startDate, endDate]); // useCallback으로 메모이제이션

  useEffect(() => {
    if (selectedKeyword) {
      fetchData();
    }
  },[fetchData, selectedKeyword]); // fetchData만 의존성 배열에 추가

  return (
    <Container>
      <Header>
        <Title>네이버 검색 트렌드</Title>
        <Description>밈코인의 네이버 검색 트렌드를 확인해보세요</Description>
      </Header>

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
  background: var(--grey-100, #1E1E22);
  padding: 2rem;
  border-radius: 0.5rem;
  max-width: 537px;
  width: 100%;
  height: 347px;
  margin: 0 auto;
`;


const Header = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: var(--white-100, #FFFFFF);
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  color: var(--white-60, rgba(255, 255, 255, 0.6));
  font-size: 0.875rem;
`;

const FilterSection = styled.div`
  background: var(--grey-90, #26262A);
  border-radius: 0.5rem;
  padding: 1.5rem;
`;

const ErrorMessage = styled.div`
  color: #ff6b6b;
  background: rgba(255, 107, 107, 0.1);
  border: 1px solid rgba(255, 107, 107, 0.3);
  border-radius: 0.313rem;
  padding: 0.75rem;
  margin: 1rem 0;
  font-size: 0.875rem;
`;

export default NaverSearchTrend;
