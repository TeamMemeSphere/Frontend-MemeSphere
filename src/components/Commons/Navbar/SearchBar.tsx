import React from "react";
import styled from "styled-components";
import * as S from "../../../styles/Typography";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Overlay from "../Overlay";

const SearchBar: React.FC = () => {
  const [focus, setFocus] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleFocus = () => {
    setFocus(true);
  };

  const handleBlur = () => {
    setFocus(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (keyword.trim() === "") return;
    const searchKeyword = keyword;
    setKeyword("");
    inputRef.current?.blur();
    navigate('/SearchResults', {
      replace: false,
      state: { keyword: searchKeyword }
    });
    setIsOpen(false);
  };

  const handleOverlayClick = (e?: React.MouseEvent) => {
    if (!e || e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  return (
    <>
    {/*PC용 검색창*/}
    <SearchBarWrapper $isFocused={focus} onSubmit={handleSubmit}>
      <img src="/assets/SearchResults/search-magnifier.svg" alt="search icon" />
      <SearchInput
        placeholder="검색어를 입력하세요..."
        value={keyword}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        ref={inputRef}
      />
    </SearchBarWrapper>

    {/*모바일용 검색 아이콘*/}
    <SmallSearchIcon 
      src="/assets/common/navbar/Search small button.svg" 
      alt="small search icon"
      onClick={() => setIsOpen(true)}/>
    {/*모바일용 검색창*/}
    {isOpen && (
      <>
      <Overlay onClick={handleOverlayClick} />
        <MobileSearchWrapper $isFocused={focus} onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
          <img src="/assets/SearchResults/search-magnifier.svg" alt="search icon" />
          <SearchInput
            placeholder="검색어를 입력하세요..."
            value={keyword}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </MobileSearchWrapper>
      </>)}
    </>
);};

export default SearchBar;

interface SearchBarWrapperProps {
  $isFocused: boolean;
}

const MobileSearchWrapper = styled.form<SearchBarWrapperProps>`
  position: fixed;
  top: 4%;
  left: 50%;
  transform: translateX(-50%);

  box-sizing: border-box;
  width: 350px;
  height: 2.563rem;
  padding: 3px 3px 3px 23px;
  border-radius: 50px;
  border: 1px solid var(--White-100, #FFF);
  background: var(--background-black, #161616);

  display: flex;
  align-items: center;
  z-index: 1000;
`;

const SearchBarWrapper = styled.form<SearchBarWrapperProps>`
  box-sizing: border-box;
  display: flex;
  width: 27.292vw;
  height: 2.563rem;
  padding: 3px 3px 3px 23px;
  align-items: center;
  border-radius: 50px;
  border: ${(props) => props.$isFocused ?
    "1px solid var(--White-100, #FFF);" :
    "1px solid var(--White-10, rgba(255, 255, 255, 0.1))"
  };
  background: var(--background-black, #161616);

  @media (max-width: 480px) {
    display: none;
  }
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

const SmallSearchIcon = styled.img`
  display: none;
  width: 41px;
  cursor: pointer;

  @media (max-width: 480px) {
    display: block;
  }
`;