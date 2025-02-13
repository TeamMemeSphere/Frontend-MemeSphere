import React, { useState } from "react";
import styled from "styled-components";
// 정렬기준 등을 지정할 수 있는 Combobox. Selector태그와 option태그의 css 지원이 잘 안되어서 div로 구현했습니다.

type OptionProps = {
    options : string[]
    onChange : (value : string) => void
}
const FilterSelect : React.FC<OptionProps> = ( { options, onChange } ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(options[0]);

    const toggleDropdown = () => setIsOpen(!isOpen); // 버튼 클릭을 통해 dropdown 컴포넌트 on/off

    const onClickOption = (option : string) => { // option 선택시 value 변경, dropdown off
        setSelectedValue(option);
        onChange(option);
        setIsOpen(false);
    };

    return (
        <Container>
            <StyledButton onClick={toggleDropdown}>
                {selectedValue} 
                <DropdownIcon src="assets/common/FilterSelectIcon.svg" />
            </StyledButton>
            {isOpen && (
                <Dropdown>
                    {options.map((option) => (
                        <StyledOption key={option} onClick={()=>onClickOption(option)}>
                            {option}
                        </StyledOption>
                    ))}
                </Dropdown>
            )}
        </Container>
    );
};

export default FilterSelect;

const Container = styled.div`
    position: relative;
    display : inline-flex;
    width : 8.5rem;
`;

const StyledButton = styled.button`
    display : inline-flex;
    justify-content : space-between;
    align-items : center;

    width : 100%;
    height : 2rem;
    padding : 0.563rem 0.813rem;
    border : 1px solid rgba(255, 255, 255, 0.30);
    background: var(--White-5, rgba(255, 255, 255, 0.05));
    color : var(--White-100, #FFF);
    border-radius: 0;

    font-family : Pretendard;
    font-size : 0.75rem;
    font-weight : 400;
    line-height : normal;
    cursor : pointer;
    position : relative;
`;

const DropdownIcon = styled.img`
    width: 0.875rem;
    height: 0.875rem;
    background-size: contain;
`;

const Dropdown = styled.div`
    position: absolute;
    top: 2.063rem;
    width: 100%;
    background: var(--background-black);
    border: 1px solid rgba(255, 255, 255, 0.30);
    z-index: 1000;
`;

const StyledOption = styled.div`
    padding: 0.879vh 0.903vw;
    color: #FFF;
    font-family: Pretendard;
    font-size: 0.75rem;
    cursor: pointer;

    &:hover {
        background:  #2a2a2a;
    }
`;