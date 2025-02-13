import { createGlobalStyle } from "styled-components";
import "./reset.css";
// 변수명 앞에 두 개의 대시(--)를 붙여서 사용합니다.
// :root 의사 클래스는 문서 트리의 루트 요소를 선택합니다. <html> 요소와 동일합니다.

// # styled-components에서의 GlobalStyle 전역변수 사용 방법
// const Title = styled.h1`
//   font-size: var(--font-size-md);
//   color: var(--color-blue);
// `;

const GlobalStyle = createGlobalStyle`
  :root {
    // 색상 전역변수  적용
    --background-black: #161616;
    --dark-grey: #1E1E20;

    // Grey
    --grey-100: rgb(38, 38, 42);
    --grey-80: rgba(38, 38, 43, 0.8);
    --grey-50: rgba(38, 38, 42, 0.5);
    --grey-10: rgba(38, 38, 42, 0.1);
    --light-grey: #9095A0;

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
    
    // font-size 전역변수
    --font-size-title: 1.75rem;
    --font-size-subtitle1: 1.5rem; 
    --font-size-subtitle2: 1.125rem; 
    --font-size-subtitle3: 1rem;
    --font-size-body: 1rem;
    --font-size-chat-text: 0.875rem;
    --font-size-small-caption: 0.75rem;
    --font-size-caption: 0.875rem;

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
    min-height: 100%; {/*그냥 height로 하면 body 내용이 길어질때 navbar와 겹침*/}
    font-family: var(--font-family-base);
    font-size: var(--font-size-body);
    background-color: var(--background-black);
    color: var(--white-100);
  }

  body {
    font-family: var(--font-family-base);
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