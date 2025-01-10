// src/styles/GlobalStyle.js
import { createGlobalStyle } from "styled-components";
import "normalize.css";

// 변수명 앞에 두 개의 대시(--)를 붙여서 사용합니다.
// :root 의사 클래스는 문서 트리의 루트 요소를 선택합니다. <html> 요소와 동일합니다.

// # styled-components에서의 GlobalStyle 전역변수 사용 방법
// const Title = styled.h1`
//   font-size: var(--font-size-md);
//   color: var(--color-blue);
// `;

const GlobalStyle = createGlobalStyle`
  @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');

  :root {
    // 색상 전역변수  적용
    --background-black: #161616;
    --dark-grey: #1E1E20;

    // Grey
    --grey-100: rgb(38, 38, 42);
    --grey-50: rgba(38, 38, 42, 0.5);
    --grey-10: rgba(38, 38, 42, 0.1);

    // White
    --white-100: rgb(255, 255, 255);
    --white-60: rgba(255, 255, 255, 0.6);
    --white-50: rgba(255, 255, 255, 0.5);
    --white-30: rgba(255, 255, 255, 0.3);
    --white-10: rgba(255, 255, 255, 0.1);
    --white-5: rgba(255, 255, 255, 0.05);

    // Primary
    --blue: #345DFD; 
    --purple: #7061F0; 
    --pink: #DE8DFA; 

    // Secondary
    --green: #4FFC91; 
    --yellow: #D6F84C;
    --red: #FB6571;

    // font-family 전역변수 
    --font-family-base: "Pretendard", sans-serif;
    
    // font-size 전역변수(TODO: 수정 예정)
    --font-size-base: 1rem; /* 기본 폰트 크기 */
    --font-size-title: 1.75rem;
    --font-size-card-title: 1.125rem; /* 18px */

    // font-weight 전역변수
    --font-weight-bold : 700;
    --font-weight-semibold: 600;
    --font-weight-medium: 500;
    --font-weight-regular: 400;
    --font-weight-light: 300;
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
    background-color: var(--background-black);
    color: var(--white-100);
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
