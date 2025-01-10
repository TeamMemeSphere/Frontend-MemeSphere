import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

interface NavItemProps {
    icon1: React.ReactNode;
    icon2: React.ReactNode;
    label: string;
    link: string;
}

const NavItem: React.FC<NavItemProps> = ({icon1, icon2, label, link}) => {
    return (
        <NavItemWrapper to={link}>
            <IconWrapper 
                icon1={icon1} 
                icon2={icon2} />
            <Label>{label}</Label>
        </NavItemWrapper>
    );
};

export default NavItem;

interface IconWrapperProps {
    icon1: React.ReactNode;
    icon2: React.ReactNode;
}

const IconWrapper: React.FC<IconWrapperProps> = ({ icon1 }) => (
    <IconWrapperStyled>
        {icon1}
    </IconWrapperStyled>
);

// 폰트, 색깔 수정 필요
const NavItemWrapper = styled(NavLink)`
    display: flex;
    align-items: center;
    text-decoration: none;
    margin-right: 30px;
    gap: 3px;

    &.active {
        color: #ffffff;
    }
    &:not(.active) {
        color: #ffffff;
        opacity: 60%;
    }
`;

const IconWrapperStyled = styled.div`
    width: 20px;
    height: 20px;
    color: inherit;
`;

const Label = styled.span`
    font-size: var(--font-size-small); {/*16px*/} 
    color: inherit;
`;
