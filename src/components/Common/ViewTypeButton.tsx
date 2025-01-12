import styled from "styled-components";

interface ViewTypeButtonProps {
    viewType: "card" | "list";
    onClick: () => void;
    isActive: boolean;
}

const ViewTypeButton = ({viewType, onClick}: ViewTypeButtonProps) => {
    const viewTypeCard = viewType === "card";
    const viewTypeList = viewType === "list";

    return (
        <Container>
            <Button src="/assets/common/viewtype-card.svg" alt="" onClick={onClick} $isActive={viewTypeCard} />
            <Button src="/assets/common/viewtype-list.svg" alt="" onClick={onClick} $isActive={viewTypeList} />
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
    padding: 0 0.5vw;
`

interface ButtonProps {
    $isActive: boolean;
}

const Button = styled.img<ButtonProps>`
    opacity: ${props => props.$isActive ? 1 : 0.3};
    cursor: pointer;
`

