import styled from "styled-components";
import * as S from "./../../styles/Typography.ts";
import { useState } from "react";

const SelectDirection :React.FC = () => {
    const [direction, setDirection] = useState("RISE");

    const onClickDirection = () => {
        setDirection((prev)=>(prev === "RISE" ? "FALL" : "RISE"));
    };
    return <Container>
        <Name>상승/하락</Name>
        <SelectOption>
            <Option>
                {(direction === "RISE")
                ? <ChangeButton src="public/assets/Notification/ActiveButton.svg"/>
                : <ChangeButton src="public/assets/Notification/InactiveButton.svg" onClick={onClickDirection}/>
                }
                <S.CaptionTypoRegular>상승</S.CaptionTypoRegular>
            </Option>
            <Option>
                {(direction === "FALL")
                ? <ChangeButton src="public/assets/Notification/ActiveButton.svg"/>
                : <ChangeButton src="public/assets/Notification/InactiveButton.svg" onClick={onClickDirection}/>
                }
                <S.CaptionTypoRegular>하락</S.CaptionTypoRegular>
            </Option>
        </SelectOption>
    </Container>;
};

export default SelectDirection;

const Container = styled.div`
    display: inline-flex;
    padding: 0.469rem 0.938rem;
    align-items: center;
    gap: 0.625rem;
`;

const Name = styled(S.CaptionTypoRegular)`
    width: 3.875rem;
    align-self: stretch;
`;

const SelectOption = styled.div`
    display : flex;
    height : 100%;
    flex-direction : column;
    align-items : flex-start;
    justify-content : flex-start;
    gap : 0.5rem;
`;

const Option = styled.div`
    display : flex;
    align-items: center;
    gap : 0.625rem;
`;

const ChangeButton = styled.img`
    width : 0.688rem;
    height : 0.688rem;
    cursor : pointer;
`;