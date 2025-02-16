import React from "react";
import styled from "styled-components";
import { format } from "date-fns";

interface DateRangePickerProps {
  startDate: Date;
  endDate: Date;
  onDateChange: (startDate: Date, endDate: Date) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ startDate, endDate, onDateChange }) => {
  const today = new Date();
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
      <DatePickerWrapper>
        <DateInput
          type="date"
          value={format(startDate, "yyyy-MM-dd")}
          onChange={handleStartDateChange}
          max={format(today, "yyyy-MM-dd")}
        />
        <Separator>~</Separator>
        <DateInput
          type="date"
          value={format(endDate, "yyyy-MM-dd")}
          onChange={handleEndDateChange}
          max={format(today, "yyyy-MM-dd")}
        />
      </DatePickerWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const DatePickerWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const DateInput = styled.input`
  background: var(--grey-100);
  border: 1px solid var(--white-30);
  border-radius: 0.313rem;
  padding: 0.5rem;
  color: var(--white-80);
  width: 6rem;
  
  &::-webkit-calendar-picker-indicator {
    filter: invert(0.8);
  }
`;

const Separator = styled.span`
  margin: 0 0.5rem;
  color: var(--white-60);
`;

export default DateRangePicker;
