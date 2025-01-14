import styled from "styled-components";
import * as S from "../../styles/Typography.ts";
import ViewTypeButton from "./ViewTypeButton";
import FilterSelect from "./FilterSelect";

interface CoinListHeaderProps {
    title?: string;
    options: string[];
    onOptionChange: (value: string) => void;
    viewType: "card" | "list";
    onTypeChange: () => void;
    marginBottom: string
}

const CoinListHeader = ({ title, options, onOptionChange, viewType, onTypeChange, marginBottom }: CoinListHeaderProps) => {
    return (
        <Container $marginBottom={marginBottom}>
            <S.SubTitle1Typo>{title}</S.SubTitle1Typo>
            <ViewTypeButtonWrapper>
                <ViewTypeButton viewType={viewType} onClick={onTypeChange}></ViewTypeButton>
            </ViewTypeButtonWrapper>
            <FilterSelectWrapper>
                <FilterSelect options={options} onChange={onOptionChange}></FilterSelect>
            </FilterSelectWrapper>
        </Container>
    )
}

export default CoinListHeader;

const Container = styled.div<{ $marginBottom: string }>`
    display: flex;
    width: 100%;
    height: 2rem;
    margin-bottom: ${props => props.$marginBottom};
`

const ViewTypeButtonWrapper = styled.div`
    margin-left: auto;
    align-self: center;
`

const FilterSelectWrapper = styled.div`
    margin-left: 1.75rem;
    align-self: center;
`
