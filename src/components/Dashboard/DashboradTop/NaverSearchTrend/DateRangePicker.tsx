import React from "react";
import styled from "styled-components";
import { format } from "date-fns";

interface DateRangePickerProps {
  startDate: Date;
  endDate: Date;
  onDateChange: (startDate: Date, endDate: Date) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ startDate, endDate, onDateChange }) => {
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartDate = new Date(e.target.value);
    onDateChange(newStartDate, endDate);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndDate = new Date(e.target.value);
    onDateChange(startDate, newEndDate);
  };

  return (
    <Container>
      <Label>조회 기간</Label>
      <DatePickerWrapper>
        <DateInput
          type="date"
          value={format(startDate, "yyyy-MM-dd")}
          onChange={handleStartDateChange}
        />
        <Separator>~</Separator>
        <DateInput
          type="date"
          value={format(endDate, "yyyy-MM-dd")}
          onChange={handleEndDateChange}
        />
      </DatePickerWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
`;

const Label = styled.div`
  font-size: 0.875rem;
  color: var(--white-80, rgba(255, 255, 255, 0.8));
  margin-bottom: 0.5rem;
`;

const DatePickerWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const DateInput = styled.input`
  background: var(--grey-100, #26262A);
  border: 1px solid var(--white-30, rgba(255, 255, 255, 0.3));
  border-radius: 0.313rem;
  padding: 0.5rem;
  color: var(--white-80, rgba(255, 255, 255, 0.8));
  width: 10rem;
  
  &::-webkit-calendar-picker-indicator {
    filter: invert(0.8);
  }
`;

const Separator = styled.span`
  margin: 0 0.5rem;
  color: var(--white-60, rgba(255, 255, 255, 0.6));
`;

export default DateRangePicker;
