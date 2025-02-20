import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { SearchCoinMap } from "./SearchCoinMapKorean";
import { ErrorMessage } from "../../../Modal/Auth/SharedAuthenticationStyles";

interface Coin {
  name: string;
  key: string;
}

const coinList: Coin[] = Object.entries(SearchCoinMap).map(([key, value]) => {
  return { name: value, key: key.toLowerCase() };
});

interface KeywordSearchProps {
  onKeywordSelect: (keyword: string) => void;
}

interface FormValues {
  name: string;
}

const KeywordSearch: React.FC<KeywordSearchProps> = ({ onKeywordSelect }) => {
  const [isInitialMount, setIsInitialMount] = useState(true);
  const { register, setValue, watch, clearErrors, formState: { errors } } = useForm<FormValues>();
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);
  
  const watchedName = watch("name", "");

  useEffect(() => {
    if (isInitialMount) {
      setValue("name", "도지코인");
      onKeywordSelect("도지코인");
      setIsInitialMount(false);
    }
  }, [setValue, onKeywordSelect, isInitialMount]);

  const filteredCoins = coinList
    .filter(coin => {
      const searchTerm = watchedName.toLowerCase();
      if (coin.name.toLowerCase().includes(searchTerm)) {
        return true;
      }
      if (coin.key.includes(searchTerm)) {
        return true;
      }
      return false;
    })
    .filter((coin, index, self) => {
      return index === self.findIndex(c => c.name === coin.name);
    });

  const onClickDropdown = (value: string) => {
    setValue("name", value);
    setDropdownOpen(false);
    onKeywordSelect(value);
    clearErrors("name");
  };

  return (
    <Container>
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
  position: relative;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  max-width: 12rem;
  padding: 0.5rem;
  background: var(--grey-100);
  border: 1px solid var(--white-30);
  border-radius: 0.313rem;
  color: var(--white-80);
  
  &::placeholder {
    color: var(--white-40);
  }

  @media (max-width: 480px) {
    width: 5rem;
  }
`;

const Dropdown = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  z-index: 10;
  position: absolute;
  padding: 0.188rem 0.5rem;
  border-radius: 0.313rem;
  border: 0.063rem solid var(--white-30);
  background: var(--grey-100);
  overflow-y: auto;
`;

const CoinDropDown = styled(Dropdown)`
  top: 100%;
  margin-top: 0.25rem;
  height: 10rem;
`;

const FilteredList = styled.div`
  color: var(--white-60);
  padding: 0.5rem 0;
  cursor: pointer;
  font-size: 0.875rem;
  
  &:not(:last-child) {
    border-bottom: 1px solid var(--white-10);
  }
  
  &:hover {
    color: var(--white-100);
  }
`;

export default KeywordSearch;