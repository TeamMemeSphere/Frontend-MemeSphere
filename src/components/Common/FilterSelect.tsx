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
`;

const StyledButton = styled.button`
    display : inline-flex;
    justify-content : space-between;
    align-items : center;

    width : 100%;
    height : 3.125vh;
    padding : 0.879vh 0.703vw;
    border : 1px solid rgba(255, 255, 255, 0.30);
    background : transparent; // 투명하게
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
    margin-left : 1.389vw;
    width: 0.875rem;
    height: 0.875rem;
    background-size: contain;
`;

const Dropdown = styled.div`
    position: absolute;
    top: 3.223vh;
    width: 100%;
    background: var(--color-black);
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