import styled from "styled-components";
import { useEffect } from "react";

interface PageSelectorProps {
    currentPage: number;
    totalPages: any;
    updateCurrentPage: (page: number) => void;
}

const PageSelector = ({ currentPage, totalPages, updateCurrentPage}: PageSelectorProps) => {

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return;
        updateCurrentPage(page);
        console.log(page);
    }

    if (totalPages <= 1) return null;
    if (totalPages >= 1) {
        let pages = Array.from({ length: 5 }, (_, i) => i + 1 + Math.floor((currentPage - 1) / 5) * 5);
        if (pages[pages.length - 1] > totalPages) {
            pages = pages.filter(page => page <= totalPages);
        }
        return (
            <Container>
                <Pagination>
                    {
                        currentPage > 1 ? <Chevron src="/assets/common/chevron-left.svg" alt="previous" onClick={() => handlePageChange(currentPage - 1)} />
                            :
                            <Chevron src="/assets/common/chevron-left-disabled.svg" alt="previous disabled"/>
                    }
                    {
                        pages.map((page: number, index: number) => {
                            return (
                                <PageNumber
                                    key={index}
                                    $isActive={page == currentPage}
                                    onClick={() => handlePageChange(page)}
                                >
                                    {page}
                                </PageNumber>
                            )
                        })
                    }
                    {
                        currentPage < totalPages ? <img src="/assets/common/chevron-right.svg" alt="next" onClick={() => handlePageChange(currentPage + 1)} />
                            :
                            <img src="/assets/common/chevron-right-disabled.svg" alt="next disabled"></img>
                    }
                </Pagination>
            </Container>
        );
    }
}

const Container = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 34px;
`

const Pagination = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 15px;
`

const Chevron = styled.img`
    cursor: pointer;
`

interface PageNumberProps {
    $isActive?: boolean;
}

const PageNumber = styled.button<PageNumberProps>`
    display: flex;
    width: 24px;
    height: 100%;
    padding: 1px 5px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    line-height: 22px;
    gap: 10px;
    color: ${props => props.$isActive ? '#FFF' : 'rgba(255, 255, 255, 0.60);'};
    font-weight: ${props => props.$isActive ? '700' : '400'};
    border: none;
    background-color: transparent;
    border-radius: 0;
    cursor: pointer;

    &:focus, &:active {
        border: none;
        outline: none;
    }
`

export default PageSelector;