import React from "react";
import styled from "styled-components";
import * as S from "../../../styles/Typography";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar: React.FC = () => {
  const [focus, setFocus] = useState(false);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleFocus = () => {
    setFocus(true);
  }

  const handleBlur = () => {
    setFocus(false);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (keyword.trim() === "") return;
    navigate('/SearchResults', {
      replace: false,
      state: { keyword: keyword }
    });
  }

  return (
    <SearchBarWrapper $isFocused={focus} onSubmit={handleSubmit}>
      <img src="/assets/SearchResults/search-magnifier.svg" alt="search icon" />
      <SearchInput
        placeholder="검색어를 입력하세요..."
        value={keyword}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
      />
    </SearchBarWrapper>
  )
};

export default SearchBar;

interface SearchBarWrapperProps {
  $isFocused: boolean;
}

const SearchBarWrapper = styled.form<SearchBarWrapperProps>`
  box-sizing: border-box;
  display: flex;
  width: 27.292vw;
  height: 2.563rem;
  padding: 3px 3px 3px 23px;
  align-items: center;
  border-radius: 50px;
  border: ${(props) => props.$isFocused ?
    `1px solid var(--White-100, #FFF);` :
    `1px solid var(--White-10, rgba(255, 255, 255, 0.1))`
  };
  background: var(--background-black, #161616);
`;

const SearchInput = styled.input`
  box-sizing: border-box;
  margin-left: 0.5rem;
  width: 100%;
  height: 100%;
  background-color: transparent;
  border: none;
  align-self: center;
  color: var(--White-100, #FFF);
  font-size: 0.875rem;
  font-weight: 400;

  &:focus {
    outline: none;
  }

  &::placeholder {
    /* ${S.CaptionTypoRegular} */
    color: var(--White-30, rgba(255, 255, 255, 0.30));
    font-size: 0.875rem;
    font-weight: 400;
  }
`;