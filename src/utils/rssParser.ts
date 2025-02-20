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
  source?: [{ _: string }];
  link: string[];
}

// 뉴스 제목을 가져오는 함수
export const fetchNewsFromRSS = async () => {
  try {
    // RSS 피드 요청
    const response = await axios.get(rssUrl, {
      headers: { Accept: "application/rss+xml" },
    });

    // XML 데이터가 `response.data.contents` 안에 있음!
    const xmlData = response.data.contents;
    console.log("🔍 RSS 원본 데이터:", xmlData);

    // XML 파싱
    const parsedData = await parseStringPromise(xmlData);

    // RSS 데이터에서 "item" 리스트 추출 (뉴스 항목들)
    const items: RssItem[] = parsedData.rss.channel[0].item;

    // 최신 뉴스 제목 5개 추출
    const topNewsTitles = items.slice(0, 5).map((item) => {
      const rawTitle = item.title[0];
      return rawTitle.split(" - ")[0];
    });

    const dateList = items.slice(0, 5).map((item) => {
      const rawDate = item.pubDate?.[0] ?? "";
      if (!rawDate) return "날짜 없음";
      const dateObj = new Date(rawDate);
      return `${dateObj.getFullYear()}.${String(dateObj.getMonth() + 1).padStart(
        2,
        "0"
      )}.${String(dateObj.getDate()).padStart(2, "0")} ${String(
        dateObj.getHours()
      ).padStart(2, "0")}:${String(dateObj.getMinutes()).padStart(2, "0")}`;
    });

    const sourceList = items
      .slice(0, 5)
      .map((item) => item.source?.[0]?._ ?? "출처 없음");

    const linkList = items.slice(0, 5).map((item) => item.link[0]);

    return [topNewsTitles, dateList, sourceList, linkList];
  } catch (error) {
    console.error("Error fetching RSS:", error);
    return [];
  }
};
