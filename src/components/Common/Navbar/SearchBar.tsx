import React from "react";
import styled from "styled-components";

const SearchBar: React.FC = () => {
  return <SearchBarWrapper></SearchBarWrapper>;
};

export default SearchBar;

const SearchBarWrapper = styled.div`
  display: flex;
  width: 27.292vw;
  height: 3.796vh;
  padding: 3px 3px 3px 23px;
  justify-content: space-between;
  align-items: center;
  border-radius: 50px;
  border: 1px solid var(--White-10, rgba(255, 255, 255, 0.1));
  background: var(--background-black, #161616);
`;
