import styled from "styled-components";
import * as S from "../../styles/Typography.ts";
import ViewTypeButton from "./ViewTypeButton.tsx";
import FilterSelect from "./FilterSelect.tsx";
import { forwardRef, useEffect, useState } from "react";

interface CoinListHeaderProps {
  title?: string;
  options: string[];
  onOptionChange: (value: string) => void;
  viewType: "GRID" | "LIST";
  onTypeChange: (viewType: "GRID" | "LIST") => void;
  marginBottom: string;
  setCurrentPage?: (currentPage: number) => void;
}

const CoinListHeader = forwardRef<HTMLDivElement, CoinListHeaderProps>(
  (
    {
      title,
      options,
      onOptionChange,
      viewType,
      onTypeChange,
      marginBottom,
      setCurrentPage,
    },
    coinListHeaderRef,
  ) => {
    useEffect(() => {
      if (setCurrentPage) {
        setCurrentPage(1);
      }
    }, [viewType, setCurrentPage]);

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
        window.innerWidth <= 768 && onTypeChange("GRID");
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
      <Container $marginBottom={marginBottom} ref={coinListHeaderRef}>
        <S.SubTitle1Typo>{title}</S.SubTitle1Typo>
        {
          !isMobile
          &&
          <ViewTypeButtonWrapper>
            <ViewTypeButton
              viewType={viewType}
              onClick={onTypeChange}
            ></ViewTypeButton>
          </ViewTypeButtonWrapper>
        }
        <FilterSelectWrapper>
          <FilterSelect
            options={options}
            onChange={onOptionChange}
          ></FilterSelect>
        </FilterSelectWrapper>
      </Container>
    );
  },
);

export default CoinListHeader;

const Container = styled.div<{ $marginBottom: string }>`
  display: flex;
  width: 100%;
  height: 2rem;
  margin-bottom: ${(props) => props.$marginBottom};
`;

const ViewTypeButtonWrapper = styled.div`
  margin-left: auto;
  align-self: center;
`;

const FilterSelectWrapper = styled.div`
  margin-left: 1.75rem;
  align-self: center;

  @media (max-width: 768px) {
    margin-left: auto;
  }
`;
