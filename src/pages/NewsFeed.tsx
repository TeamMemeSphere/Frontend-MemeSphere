// import { useState } from "react";
// import styled from "styled-components";
// import { TitleTypo } from "../styles/Typography";
// import arrow from "../../public/assets/DetailPage/arrow.svg";
// import HeadImage from "../../public/assets/NewsFeed/Head-News.png";
// import NewsCard from "../components/NewsFeed/NewsCard";
// import PageSelector from "../components/common/PageSeletor";

// const NewsFeed = () => {
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const itemsPerPage = 9; // 한 페이지에 보여줄 카드 개수
//   const totalItems = 9; // 전체 카드 개수
//   const totalPages = Math.ceil(totalItems / itemsPerPage);

//   return (
//     <Wrapper>
//       <TitleLayout>
//         <Icon src={arrow} alt="뒤로 가기" />
//         <TitleTypo>뉴스</TitleTypo>
//       </TitleLayout>

//       <HeadNews>
//         <img src={HeadImage} alt="헤드 뉴스 샘플" />
//       </HeadNews>

//       <NewsCardsWrapper>
//         {Array.from({ length: itemsPerPage }).map((_, index) => (
//           <NewsCard key={index} />
//         ))}
//       </NewsCardsWrapper>

//       <PageSelector
//         currentPage={currentPage}
//         updateCurrentPage={setCurrentPage}
//         totalPages={totalPages}
//         limit={itemsPerPage}
//       />
//     </Wrapper>
//   );
// };

// export default NewsFeed;

// const Wrapper = styled.div`
//   margin-left: 11.25rem;
//   margin-right: 11.25rem;
// `;

// const TitleLayout = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 0.688rem;
//   margin-top: 2.031rem;
//   margin-bottom: 0.813rem;
// `;

// const Icon = styled.img`
//   width: 1.5rem;
//   height: 1.5rem;
// `;

// const HeadNews = styled.div`
//   width: 100%;
//   margin-bottom: 2.5rem;
// `;

// const NewsCardsWrapper = styled.div`
//   display: grid;
//   grid-template-columns: repeat(3, 1fr); /* 3개의 열 생성 */
//   gap: 27px; /* 카드 간 간격 */
//   width: 100%;
// `;
