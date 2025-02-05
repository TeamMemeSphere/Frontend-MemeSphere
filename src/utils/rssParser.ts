import axios from "axios";
import { parseStringPromise } from "xml2js";

// 구글 뉴스 RSS 피드 URL (밈코인에 대한 최신 뉴스)
// 프록시 서버
const rssUrl = "https://api.allorigins.win/raw?url=" + encodeURIComponent("https://news.google.com/rss/search?q=%EB%B0%88%EC%BD%94%EC%9D%B8&hl=ko&gl=KR&ceid=KR%3Ako");

interface RssItem {
  title: string[];
}

// 뉴스 제목을 가져오는 함수
export const fetchNewsFromRSS = async () => {
  try {
    // RSS 피드 요청
    const response = await axios.get(rssUrl, { headers: { "Accept": "application/rss+xml" } });

    // XML 파싱
    const parsedData = await parseStringPromise(response.data);
    // RSS 데이터에서 "item" 리스트 추출 (뉴스 항목들)
    const items: RssItem[] = parsedData.rss.channel[0].item;

    // 최신 뉴스 제목 5개 추출
    const topNewsTitles = items.slice(0, 5).map(item => {
      const rawTitle = item.title[0]; 
      const formattedTitle = rawTitle.split(" - ")[0]; 
      return formattedTitle;
    });
    //console.log("topNewsTitles1", topNewsTitles);

    const dateList = items.slice(0, 5).map(item => {
      const rawDate = item.pubDate[0]; 
      const dateObj = new Date(rawDate); 
      const formattedDate = `${dateObj.getFullYear()}.${String(dateObj.getMonth() + 1).padStart(2, "0")}.${String(dateObj.getDate()).padStart(2, "0")} ${String(dateObj.getHours()).padStart(2, "0")}:${String(dateObj.getMinutes()).padStart(2, "0")}`;
      return formattedDate;
    });
    //console.log("DateList:", dateList);

    const sourceList = items.slice(0, 5).map(item => item.source[0]._);                                                                                      
    //console.log("sourceList:", sourceList);

    const linkList = items.slice(0,5).map(item => item.link[0]);
    //console.log("link", linkList);
    return [topNewsTitles, dateList, sourceList, linkList];
  } catch (error) {
    console.error("Error fetching RSS:", error);
    return [];
  }
};

// // "밈코인"에 대한 뉴스 제목을 출력
// fetchNewsFromRSS().then(newsTitles => {
//   console.log("Recent news titles about 밈코인:", newsTitles);
// }).catch(error => {
//   console.error("Error:", error);
// });
