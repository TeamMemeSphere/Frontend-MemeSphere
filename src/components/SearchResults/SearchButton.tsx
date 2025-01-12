import styled from "styled-components";

interface SearchButtonProps {
    keyword: string;
    isActive: boolean;
}

const SearchButton: React.FC<SearchButtonProps> = ({ keyword, isActive }) => {
    return (
        <Container $isActive={isActive}>
            {keyword}
        </Container>
    );
}

export default SearchButton;

interface ContainerProps {
    $isActive: boolean;
}

const Container = styled.button<ContainerProps>`
    width: fit-content;
    height: fit-content;
    padding: 8px 20px;
    border-radius: 10px;
    color: white;
    background-color: ${props => props.$isActive ? "var(--color-purple)" : "var(--color-gray)"};
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`