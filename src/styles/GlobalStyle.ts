// src/styles/GlobalStyle.js
import { createGlobalStyle } from "styled-components";
import "normalize.css";
import "./fonts/font.css";

// 변수명 앞에 두 개의 대시(--)를 붙여서 사용합니다.
// :root 의사 클래스는 문서 트리의 루트 요소를 선택합니다. <html> 요소와 동일합니다.

// # styled-components에서의 GlobalStyle 전역변수 사용 방법
// const Title = styled.h1`
//   font-size: var(--font-size-md);
//   color: var(--color-blue);
// `;

const GlobalStyle = createGlobalStyle`
  :root {
    --font-size-md: 1.5rem;
    --font-size-base: 1.125rem;

    --color-blue: #345DFD; 
    --color-purple: #7061F0; 
    --color-pink: #DE8DFA; 

    --color-green: #4FFC91; 
    --color-yellow: #D6F84C;
    --color-black: #161616;
    --color-gray: #36363E;

    --font-size-base: 1rem; /* 기본 폰트 크기 */
    --font-family-base: "Pretendard"; /* Pretendard 폰트 */
  }

  /* 기본적인 HTML 및 Body 스타일 추가 */
  html, body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    font-family: var(--font-family-base);
    font-size: var(--font-size-base);
  }

  body {
    font-family: Arial, sans-serif;
    font-size: var(--font-size-base);
    line-height: 1.5;
  }

  #root {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    min-height: 100vh;
    width: 100%;
  }

  /* 모든 헤딩 요소 초기화 */
  h1, h2, h3, h4, h5, h6 {
  margin: 0;
  padding: 0;
}

`;

export default GlobalStyle;
