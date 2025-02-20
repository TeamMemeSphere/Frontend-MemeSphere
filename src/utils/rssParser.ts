import axios from "axios";
import { parseStringPromise } from "xml2js";

// Google 뉴스 RSS 프록시 URL
const rssUrl =
  "https://api.allorigins.win/get?url=" +
  encodeURIComponent(
    "https://news.google.com/rss/search?q=%EB%B0%88%EC%BD%94%EC%9D%B8&hl=ko&gl=KR&ceid=KR%3Ako"
  );

// RSS 데이터 타입
interface RssItem {
  title: string[];
  pubDate?: string[];
  source?: string | [{ _: string }]; // 배열이 아닐 수도 있음
  link: string[];
}

// 뉴스 제목을 가져오는 함수
export const fetchNewsFromRSS = async () => {
  try {
    // RSS 피드 요청
    const response = await axios.get(rssUrl, {
      headers: { Accept: "application/rss+xml" },
    });

    // XML 데이터 추출
    const xmlData = response.data.contents;
    console.log("🔍 RSS 원본 데이터:", xmlData); // 여기 잘 나옴

    // XML 파싱
    const parsedData = await parseStringPromise(xmlData);
    console.log("parsedData:", parsedData);

    const items: RssItem[] = parsedData.rss.channel[0].item || []; // `item`이 없을 수도 있음
    console.log("items:", items);

    if (!items || items.length === 0) {
      throw new Error("뉴스 데이터 없음!");
    }

    const topNewsTitles = items.slice(0, 5).map((item) => {
  const rawTitle = item.title?.[0] || "제목 없음";
  let cleanTitle = rawTitle.split(" - ")[0]; // " - "을 기준으로 나누고, 첫 번째 부분만 가져오기

  // 제목이 60자 초과하면 60자까지만 표시하고 "..." 추가
  if (cleanTitle.length > 60) {
    cleanTitle = cleanTitle.slice(0, 60) + "...";
  }

  return cleanTitle;
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

    const sourceList = items.slice(0, 5).map((item) => {
      if (typeof item.source === "string") {
        return item.source;
      } else if (Array.isArray(item.source) && item.source.length > 0) {
        return item.source[0]?._ || "출처 없음";
      }
      return "출처 없음";
    });

    const linkList = items.slice(0, 5).map((item) => item.link?.[0] || "#");

    return [topNewsTitles, dateList, sourceList, linkList];
  } catch (error) {
    console.error("Error fetching RSS:", error);
    return [];
  }
};
