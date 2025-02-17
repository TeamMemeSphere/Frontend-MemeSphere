import styled from "styled-components";

interface ViewTypeButtonProps {
    viewType: "GRID" | "LIST";
    onClick: (viewType : "GRID" | "LIST") => void;
}

const ViewTypeButton = ({viewType, onClick}: ViewTypeButtonProps) => {
    const viewTypeCard = viewType === "GRID";
    const viewTypeList = viewType === "LIST";

    return (
        <Container>
            <Button src="/assets/common/viewtype-card.svg" alt="" onClick={() => onClick("GRID")} $isActive={viewTypeCard} />
            <Button src="/assets/common/viewtype-list.svg" alt="" onClick={() => onClick("LIST")} $isActive={viewTypeList} />
        </Container>
    );
}

export default ViewTypeButton;

const Container = styled.div`
    display: flex;
    width: 57px;
    height: 24px;
    justify-content: center;
    align-items: flex-start;
    gap: 0.625vw;
`

interface ButtonProps {
    $isActive: boolean;
}

const Button = styled.img<ButtonProps>`
    opacity: ${props => props.$isActive ? 1 : 0.3};
    cursor: pointer;
`

