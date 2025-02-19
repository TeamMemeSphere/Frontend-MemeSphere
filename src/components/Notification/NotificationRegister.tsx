import styled from "styled-components";
import * as S from "../../styles/Typography.ts";
import SelectDirection from "./SelectDirection.tsx";
import {useForm} from "react-hook-form";
import NotificationInput from "./NotificationInput.tsx";
import { notificationType, notificationWithoutId } from "./NotificationType.ts";
import { useState } from "react";
import { coinMap } from "./CoinMap.ts";

type NotificationRegisterProps = {
    createNotification : (notification: notificationWithoutId) => void;
};

const NotificationRegister : React.FC<NotificationRegisterProps> = ({createNotification}) => {
    const { register, handleSubmit, setError, setValue, clearErrors, watch, reset, formState: { errors }} = useForm<notificationType>({
        mode:"onChange",
        defaultValues: {
            name: "",
            symbol: "",
            volatility: undefined,
            stTime: undefined,
            isRising: true,
            isOn: true,
        }
    });
    
    const [isDropdownOpen, setDropdownOpen] = useState({
        name : false,
        symbol : false
    });

    const onClickDropdown = (type : string, value : string) => {
        if(type === "name"){
            setValue("name", value);
            setDropdownOpen((prev)=>({...prev, name : false}));
        }
        if(type === "symbol"){
            setValue("symbol", value);
            setDropdownOpen((prev)=>({...prev, symbol : false}));
        }
        return 0;
    };

    const nameInput = watch("name").toUpperCase() || "";
    const symbolInput = watch("symbol").toUpperCase() || "";

    const filteredNames = nameInput
        ? Object.entries(coinMap)
            .filter(([name])=> name.toUpperCase().includes(nameInput))
            .map(([name])=>name)
        : [];

    const filteredSymbols = symbolInput 
        ? Object.entries(coinMap)
            .filter(([, symbol])=> symbol.includes(symbolInput))
            .map(([name, symbol])=> ({name, symbol}))
        : [];

    const handleNameChange = (e : React.ChangeEvent<HTMLInputElement>) : void => {
        const name = e.target.value;

        if (coinMap[name]) {
            setValue("symbol",coinMap[name]);
            clearErrors("symbol");
        } else {
            setValue("symbol","");
            setError("name", {type: "manual", message: "사이트 내 존재하지 않는 코인입니다."});
        }
};

    const handleSymbolChange = (e : React.ChangeEvent<HTMLInputElement>) : void => {
        const symbol = e.target.value.toUpperCase();

        const name = Object.keys(coinMap).find((key) => coinMap[key] === symbol);
        if (name) {
            setValue("name", name);
            setValue("symbol", symbol);
            clearErrors("name");
        } else { 
            setValue("name","");
            setError("symbol",{type: "manual", message: "사이트 내 존재하지 않는 코인입니다."});
        }
};

    const direction = watch("isRising", true);

    const onSubmit = (data: notificationWithoutId) => {
        createNotification(data);
        reset(
            {
                name: "",
                symbol: "",
                volatility: undefined,
                stTime: undefined,
                isRising: true,
                isOn: true,
            }
        );
};

    return <Container>
        <S.SubTitle3Typo>알림 등록하기</S.SubTitle3Typo>
        <Content>
            <InputWrapper>
                <NotificationInput
                    label="코인 이름"
                    inputProps={{
                        type:"text",
                        placeholder:"이름을 입력해주세요",
                        onFocus:()=>setDropdownOpen((prev)=>({...prev, name : true})),
                        ...register("name",{
                            required:"이름은 필수", 
                            onChange: handleNameChange})
                    }}
                    error={errors.name}
                    gap="1.875rem"
                    labelWidth="4.563rem"
                    inputWidth="13.625rem"
                    align="left"
                />
                {isDropdownOpen.name && filteredNames.length > 0 && <NameDropDown>
                        {filteredNames.map((filteredName)=>
                        <FilteredList key={filteredName}
                        onClick={()=>{
                            onClickDropdown("name", filteredName);
                            if (coinMap[filteredName]) {
                                setValue("symbol",coinMap[filteredName]);
                                clearErrors("symbol");
                                setDropdownOpen((prev)=>({...prev,symbol:false}));
                            } else {
                                setValue("symbol","");
                                setError("name", {type: "manual", message: "사이트 내 존재하지 않는 코인입니다."});
                            }
                            }}>{filteredName}</FilteredList>)}
                    </NameDropDown>}
                <NotificationInput
                    label="Symbol"
                    inputProps={{
                        type:"text",
                        placeholder:"symbol을 입력해주세요",
                        onFocus: ()=>setDropdownOpen((prev)=>({...prev, symbol:true})),
                        ...register("symbol",{
                            required:"심볼은 필수",
                            onChange: handleSymbolChange})
                    }}
                    error={errors.symbol}
                    gap="1.875rem"
                    labelWidth="4.563rem"
                    inputWidth="13.625rem"
                    align="left"
                />
                {isDropdownOpen.symbol && filteredSymbols.length > 0 && <SymbolDropDown>
                    {filteredSymbols.map((filteredSymbol)=>
                    <FilteredList onClick={()=>{
                        onClickDropdown("symbol", filteredSymbol.symbol);
                        const name = Object.keys(coinMap).find((key) => coinMap[key] === filteredSymbol.symbol);
                        if (name) {
                            setValue("name", name);
                            setValue("symbol", filteredSymbol.symbol);
                            clearErrors("name");
                            setDropdownOpen((prev)=>({...prev, name:false}));
                        } else { 
                            setValue("name","");
                            setError("symbol",{type: "manual", message: "사이트 내 존재하지 않는 코인입니다."});
                        }
                        }}>
                        {filteredSymbol.symbol}</FilteredList>)}
                    </SymbolDropDown>}
            </InputWrapper>
            <Setting>
                <Left>
                    <NotificationInput
                        label="변동성"
                        inputProps={{placeholder:"1-100",
                            type:"text",
                            value: watch("volatility") ?? "",
                            ...register("volatility",{
                                required : "변동성을 입력해주세요.",
                                validate: (value) => {
                                    const numericValue = Number(value);
                                    if (isNaN(numericValue)) {return "숫자를 입력해주세요.";}
                                    if (numericValue < 1) {return "1 이상을 입력해주세요.";}
                                    if (numericValue > 100) {return "100 이하를 입력해주세요.";}
                                    return true;
                                },
                            })
                        }}
                        error={errors.volatility}
                        gap="0.625rem"
                        caption="%"
                        labelWidth="3.75rem"
                        inputWidth="2.875rem"
                        align="right"
                    />
                    <NotificationInput
                        label="기준 시간"
                        inputProps={{placeholder:"1-30",
                            type:"text",
                            value: watch("stTime") ?? "",
                            ...register("stTime",{
                                required : "기준시간을 입력해주세요.",
                                validate: (value) => {
                                    const numericValue = Number(value);
                                    if (isNaN(numericValue)) {return "숫자를 입력해주세요.";}
                                    if (numericValue < 1) {return "1 이상을 입력해주세요.";}
                                    if (numericValue > 30) {return "30 이하를 입력해주세요.";}
                                    return true;
                                },
                            })
                        }}
                        error={errors.stTime}
                        gap="0.625rem"
                        caption="분"
                        labelWidth="3.75rem"
                        inputWidth="2.875rem"
                        align="right"
                    />
                </Left>
                <SelectDirection
                    setValue={setValue}
                    currentValue={direction}
                />
            </Setting>
            <RegisterButton onClick={handleSubmit(onSubmit)}>저장하기</RegisterButton>
        </Content>
    </Container>;
};

export default NotificationRegister;

const Container = styled.div`
    display : flex;
    flex-direction : column;
    gap : 0.438rem;
    width : 23.813rem;
    height : 18.75rem;
`;


const Content = styled.div`
    display : flex;
    flex-direction : column;
    align-items : center;
    justify-content: center;
    width : 23.813rem;
    height : 17.125rem;
    gap: 1.406rem;
    flex-shrink: 0;
    border-radius: 10px;
    background: var(--dark-grey, #1E1E20); 
`;

const InputWrapper = styled.div`
    display : flex;
    flex-direction : column;
    position: relative;
    gap : 0.625rem;
`;

const Setting = styled.div`
    display : flex;
    gap : 1.625rem;
`;

const Left = styled.div`
    display : inline-flex;
    flex-direction : column;
    gap : 0.625rem;
`;

const RegisterButton = styled.button`
    all : unset;
    cursor : pointer;

    display: flex;

    width: 10.375rem;
    height: 2.5rem;
    justify-content: center;
    align-items: center;
    gap: 0.625rem;
    flex-shrink: 0;
    margin-bottom: 0.3rem;

    border-radius: 3.125rem;
    background: var(--Primary-purple, #7061F0); 
`;

const Dropdown = styled.div`
    display : flex;
    flex-direction : column;
    width : 13.8rem;
    z-index : 1;
    position : absolute;
    padding : 0.188rem 0.5rem;
    justify-content : space-between;
    margin-left: 6.438rem;
    border-radius: 0.313rem;
    border: 0.063rem solid var(--white-30, rgba(255, 255, 255, 0.30));
    background: var(--grey-100, #26262A);
`;

const NameDropDown = styled(Dropdown)`
    top : 2.375rem;
`;

const SymbolDropDown = styled(Dropdown)`
    top : 5.25rem;
`;

const FilteredList = styled(S.SmallCaptionTypo)`
    color : var(--white-60, rgba(255, 255, 255, 0.60));
    padding : 0.5rem 0;
    justify-content : center;
    cursor: pointer;
    &:not(:last-child) {
        border-bottom : 1px solid rgba(255, 255, 255, 0.10);
    };
    &:hover{
        color : var(--white-100, #FFF);
    };
    
`;