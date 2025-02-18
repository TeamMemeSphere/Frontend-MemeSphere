import styled from "styled-components";

const DefaultProfile : React.FC = () => {
    return <Container>
        <StyledImg src="/assets/Community/DefaultProfile.svg" alt="img"></StyledImg>
    </Container>;
};

export default DefaultProfile;
const Container = styled.div`
    width: 1.75rem;
    height: 1.75rem;
    border-radius: 50%;
    border-radius: 0.875rem;
    background: var(--light-grey, #9095A0);
    
    display : flex;
    justify-content: center;
    align-items: center;
`;

const StyledImg = styled.img`
    width : 0.875rem;
    height : 0.875rem;
    flex-shirink : 0;
`;