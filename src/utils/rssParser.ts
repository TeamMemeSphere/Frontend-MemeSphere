import axios from "axios";
import { parseStringPromise } from "xml2js";

// Google 뉴스 RSS 프록시 URL (CORS 우회)
const rssUrl =
  "https://api.allorigins.win/get?url=" +
  encodeURIComponent(
    "https://news.google.com/rss/search?q=%EB%B0%88%EC%BD%94%EC%9D%B8&hl=ko&gl=KR&ceid=KR%3Ako"
  );

// RSS 데이터 타입
interface RssItem {
  title: string[];
  pubDate?: string[];
  source?: { _: string } | string;
  link: string[];
}

// 뉴스 제목을 가져오는 함수
export const fetchNewsFromRSS = async () => {
  try {
    // RSS 피드 요청
    const response = await axios.get(rssUrl, {
      headers: { Accept: "application/rss+xml" },
    });

    // ✅ XML 데이터가 `response.data.contents` 안에 있음!
    const xmlData = response.data.contents;
    console.log("🔍 RSS 원본 데이터:", xmlData);

    // XML 파싱
    const parsedData = await parseStringPromise(xmlData, { explicitArray: false });

    // ✅ RSS 데이터에서 "item" 리스트 추출
    const items: RssItem[] = parsedData.rss.channel.item;

    if (!items || !Array.isArray(items)) {
      console.error("❌ 예상과 다른 데이터 구조:", parsedData);
      return [];
    }

    // 최신 뉴스 제목 5개 추출
    const topNewsTitles = items.slice(0, 5).map((item) => {
      return item.title[0].split(" - ")[0];
    });

    // 날짜 변환
    const dateList = items.slice(0, 5).map((item) => {
      const rawDate = item.pubDate?.[0] ?? "";
      if (!rawDate) return "날짜 없음";
      const dateObj = new Date(rawDate);
      return `${dateObj.getFullYear()}.${String(dateObj.getMonth() + 1).padStart(2, "0")}.${String(dateObj.getDate()).padStart(2, "0")} ${String(dateObj.getHours()).padStart(2, "0")}:${String(dateObj.getMinutes()).padStart(2, "0")}`;
    });

    // 출처 가져오기 (❗ 오류 해결)
    const sourceList = items.slice(0, 5).map((item) => {
      if (typeof item.source === "string") {
        return item.source;
      } else if (item.source && typeof item.source._ === "string") {
        return item.source._;
      } else {
        return "출처 없음";
      }
    });

    // 링크 가져오기
    const linkList = items.slice(0, 5).map((item) => item.link[0]);

    return [topNewsTitles, dateList, sourceList, linkList];
  } catch (error) {
    console.error("❌ Error fetching RSS:", error);
    return [];
  }
};
