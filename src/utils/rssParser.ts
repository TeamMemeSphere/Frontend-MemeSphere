import axios from "axios";
import { parseStringPromise } from "xml2js";

// Google 뉴스 RSS 프록시 URL (CORS 우회)
const rssUrl =
  "https://api.allorigins.win/get?url=" +
  encodeURIComponent(
    "https://news.google.com/rss/search?q=%EB%B0%88%EC%BD%94%EC%9D%B8&hl=ko&gl=KR&ceid=KR:ko"
  );

// RSS 데이터 타입
interface RssItem {
  title: string;
  pubDate?: string;
  source?: string;
  link: string;
}

// 뉴스 제목을 가져오는 함수
export const fetchNewsFromRSS = async () => {
  try {
    // RSS 피드 요청
    const response = await axios.get(rssUrl, {
      headers: { Accept: "application/rss+xml" },
    });

    // 📌 XML 데이터가 `response.data.contents` 안에 있음!
    const xmlData = response.data.contents;
    console.log("🔍 RSS 원본 데이터:", xmlData);

    // 📌 XML인지 확인 (올바른 XML이 아닐 경우 에러 출력)
    if (typeof xmlData !== "string" || !xmlData.startsWith("<?xml")) {
      throw new Error("❌ 올바른 XML 데이터가 아닙니다. 응답 데이터를 확인하세요.");
    }

    // 📌 XML 파싱 (explicitArray: false 옵션 추가)
    const parsedData = await parseStringPromise(xmlData, { explicitArray: false });

    // 📌 `parsedData.rss.channel.item`이 배열인지 확인 후 처리
    const items = parsedData.rss.channel.item;
    if (!Array.isArray(items)) {
      throw new Error("❌ RSS 항목이 배열이 아닙니다. 데이터 구조 확인 필요!");
    }

    // 📌 최신 뉴스 5개만 추출
    const topNews: RssItem[] = items.slice(0, 5).map((item) => ({
      title: item.title || "제목 없음",
      pubDate: item.pubDate || "날짜 없음",
      source: typeof item.source === "string" ? item.source : "출처 없음",
      link: item.link || "#",
    }));

    console.log("✅ 파싱된 뉴스 데이터:", topNews);
    return topNews;
  } catch (error) {
    console.error("❌ Error fetching RSS:", error);
    return [];
  }
};
