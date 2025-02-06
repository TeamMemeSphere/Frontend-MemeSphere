import { useEffect, useRef } from "react";
import styled from "styled-components";

const GoogleTrendsWidget = () => {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scriptId = "google-trends-script";

    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://ssl.gstatic.com/trends_nrtr/3975_RC01/embed_loader.js";
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        renderTrendsWidget();
      };
    } else {
      renderTrendsWidget();
    }
  }, []);

  // 위젯 렌더링 함수
  const renderTrendsWidget = () => {
    if (window.trends && widgetRef.current) {
      window.trends.embed.renderExploreWidgetTo(
        widgetRef.current,
        "RELATED_QUERIES",
        {
          comparisonItem: [
            {
              keyword: "밈코인",
              geo: "KR",
              time: "today 12-m",
            },
          ],
          category: 0,
          property: "",
        },
        {
          exploreQuery: "geo=KR&q=%EB%B0%88%EC%BD%94%EC%9D%B8&hl=ko&date=today 12-m",
          guestPath: "https://trends.google.co.kr:443/trends/embed/",
        }
      );

      // 스타일 조정 (iframe 커스텀)
      setTimeout(() => {
        const iframe = widgetRef.current?.querySelector("iframe");
        if (iframe) {
          iframe.style.background = "trnasparent"; 
          iframe.style.filter = "invert(1)"; 
        }
      }, 1000);
    }
  };

  return (
    <WidgetContainer>
      <StyledWidget ref={widgetRef} />
    </WidgetContainer>
  );
};

export default GoogleTrendsWidget;

// 스타일 지정
const WidgetContainer = styled.div`
  width: auto;  
  max-width: 100%;
  height: 300px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledWidget = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;

  iframe {
    background: var(--grey-100); !important;
    border-radius: 10px;
    max-width: 100%;
  }
`;
