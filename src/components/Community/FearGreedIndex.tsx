import styled from "styled-components";

type FearGreedIndexProps = {
    value : number
}

const FearGreedIndex : React.FC<FearGreedIndexProps> = ({value}) => {
    // const FearGreedValue : number = 123;

    return <>
        <FGIDiv>
            <FGIText>공포탐욕지수</FGIText>
            <FGIndex>{value}</FGIndex>
        </FGIDiv>
    </>;
    
};


export default FearGreedIndex;


const FGIDiv = styled.div`
    display: flex;
    width: 5.188rem;
    height: 3.875rem;
    padding: 7.5rem 11.9375rem 1.75rem 2.25rem;;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    gap: 0.438rem;
    flex-shrink: 0;
    border-radius: 1.25rem;
    background: var(--Secondary-green, #49DF82);
    margin-top : 0;
`;

const FGIText = styled.p`
    color: var(--background-black, #161616);
    font-family: Pretendard;
    font-size: 0.94rem;           
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin: 0;
`;

const FGIndex = styled.p`
    color: var(--background-black, #161616);
    font-family: Pretendard;
    font-size: 1.47rem;           
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin: 0;
`;