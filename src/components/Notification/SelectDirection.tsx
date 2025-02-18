import styled from "styled-components";
import * as S from "./../../styles/Typography.ts";
import { notificationType } from "./NotificationType.ts";

type SelectDirectionProps = {
    setValue: (name: keyof notificationType, value: boolean) => void;
    currentValue: boolean;
}

const SelectDirection :React.FC<SelectDirectionProps> = ({setValue, currentValue}) => {
    
    const toggleDirection = () => {
        const newDirection = currentValue === true ? false : true;
        setValue("isRising", newDirection);
    };

    return <Container>
        <Name>상승/하락</Name>
        <SelectOption>
            <Option>
                {(currentValue === true)
                ? <ChangeButton src="/assets/Notification/ActiveButton.svg"/>
                : <ChangeButton src="/assets/Notification/InactiveButton.svg" onClick={toggleDirection}/>
                }
                <S.CaptionTypoRegular>상승</S.CaptionTypoRegular>
            </Option>
            <Option>
                {(currentValue === false)
                ? <ChangeButton src="/assets/Notification/ActiveButton.svg"/>
                : <ChangeButton src="/assets/Notification/InactiveButton.svg" onClick={toggleDirection}/>
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