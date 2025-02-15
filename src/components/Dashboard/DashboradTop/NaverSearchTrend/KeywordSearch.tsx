import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { coinMap } from "../../../Notification/CoinMap";

interface Coin {
  name: string;
}

const coinList: Coin[] = Object.keys(coinMap).map(key => ({
  name: key
}));

interface KeywordSearchProps {
  onKeywordSelect: (keyword: string) => void;
}

interface FormValues {
  name: string;
}

const KeywordSearch: React.FC<KeywordSearchProps> = ({ onKeywordSelect }) => {
  const { register, setValue, watch, clearErrors, formState: { errors } } = useForm<FormValues>();
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);
  
  const watchedName = watch("name", "");

  const filteredCoins = coinList.filter(coin => 
    coin.name.toLowerCase().includes(watchedName.toLowerCase())
  );

  const onClickDropdown = (value: string) => {
    setValue("name", value);
    setDropdownOpen(false);
    onKeywordSelect(value);
    clearErrors("name");
  };

  return (
    <Container>
      <Label>밈코인 검색</Label>
      <InputWrapper>
        <Input
          {...register("name", { required: "코인을 선택해주세요" })}
          placeholder="코인 이름 입력"
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setTimeout(() => setDropdownOpen(false), 200)}
        />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        
        {isDropdownOpen && filteredCoins.length > 0 && (
          <CoinDropDown>
            {filteredCoins.map((coin) => (
              <FilteredList 
                key={coin.name}
                onClick={() => onClickDropdown(coin.name)}
              >
                {coin.name}
              </FilteredList>
            ))}
          </CoinDropDown>
        )}
      </InputWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
  position: relative;
`;

const Label = styled.div`
  font-size: 0.875rem;
  color: var(--white-80, rgba(255, 255, 255, 0.8));
  margin-bottom: 0.5rem;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  background: var(--grey-100, #26262A);
  border: 1px solid var(--white-30, rgba(255, 255, 255, 0.3));
  border-radius: 0.313rem;
  color: var(--white-80, rgba(255, 255, 255, 0.8));
  
  &::placeholder {
    color: var(--white-40, rgba(255, 255, 255, 0.4));
  }
`;

const ErrorMessage = styled.div`
  color: #ff6b6b;
  font-size: 0.75rem;
  margin-top: 0.25rem;
`;

const Dropdown = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  z-index: 10;
  position: absolute;
  padding: 0.188rem 0.5rem;
  border-radius: 0.313rem;
  border: 0.063rem solid var(--white-30, rgba(255, 255, 255, 0.30));
  background: var(--grey-100, #26262A);
  max-height: 15rem;
  overflow-y: auto;
`;

const CoinDropDown = styled(Dropdown)`
  top: 100%;
  margin-top: 0.25rem;
`;

const FilteredList = styled.div`
  color: var(--white-60, rgba(255, 255, 255, 0.60));
  padding: 0.5rem 0;
  cursor: pointer;
  font-size: 0.875rem;
  
  &:not(:last-child) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.10);
  }
  
  &:hover {
    color: var(--white-100, #FFF);
  }
`;

export default KeywordSearch;