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


const Label = styled.span`
    font-size: var(--font-size-small);
    color: var(--white-60);
    text-decoration: none;
`;

const StyledNavLink = styled(NavLink)<{$isSidebar: boolean}>`
    display: flex;
    align-items: center;
    color: var(--white-60);
    text-decoration: none;
    gap: 0.188rem;

    cursor: pointer;
    border-radius: 10px;
    transition: background-color 0.2s ease-in-out;

    &:hover,
    &.active {
        color: var(--white-100);
    }

    &:hover ${Label}, 
    &.active ${Label} {
        color: var(--white-100);
    }
`;
const StyledDiv = styled.div`
    display: flex;
    padding: 0.625rem 0.375rem;
    gap: 0.5rem;
    cursor: pointer;
    border-radius: 10px;
    transition: background-color 0.2s ease-in-out;

    &:hover {
        background-color: rgba(225, 225, 225, 0.1);
    }
        
    &:hover ${Label} {
        color: var(--white-100);
    }
`;

const IconWrapper = styled.div`
`;
