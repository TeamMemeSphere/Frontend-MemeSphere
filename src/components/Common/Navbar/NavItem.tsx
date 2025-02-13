import React, { useState } from "react";
import styled from "styled-components";
import { NavLink, useLocation } from "react-router-dom";

interface NavItemProps {
    icon1: React.ReactNode;
    icon2: React.ReactNode;
    label: string;
    link?: string;
    onClick?: () => void;
    isSidebar?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({icon1, icon2, label, link, onClick, isSidebar = false}) => {
    const [isHovered, setIsHovered] = useState(false);
    const location = useLocation();
    const isActive = link ? location.pathname === link : false;

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);
    const NavItemWrapper: React.ElementType = link ? StyledNavLink : StyledDiv;

    return (
        <NavItemWrapper 
            to={link || ""}
            onClick={onClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            $isSidebar={isSidebar}>
            <IconWrapper> 
                {(isHovered || isActive) ? icon1: icon2}
            </IconWrapper>
            <Label>{label}</Label>
        </NavItemWrapper>
    );
};

export default NavItem;

const StyledNavLink = styled(NavLink)<{$isSidebar: boolean}>`
    display: flex;
    align-items: center;
    color: var(--white-10);
    text-decoration: none;
    gap: 3px;

    cursor: pointer;
    border-radius: 10px;
    transition: background-color 0.2s ease-in-out;

    &:hover {
        color: var(--white-100);
    }
    &.active {
        color: var(--white-100);
    }
`;
const StyledDiv = styled.div`
    display: flex;
    padding: 10px 6px;
    gap: 8px;
    cursor: pointer;
    border-radius: 10px;
    transition: background-color 0.2s ease-in-out;

    &:hover {
        background-color: rgba(225, 225, 225, 0.1);
    }
`;

const IconWrapper = styled.div`
    width: 22px;
    height: 22px;
`;

const Label = styled.span`
    height: 22px;
    font-size: var(--font-size-small); {/*16px*/} 
    color: inherit;
    text-decoration: none;
`;
