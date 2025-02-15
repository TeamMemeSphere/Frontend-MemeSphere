import axios from "axios";
import { API_ENDPOINTS } from "../../../../api/api";
import { SearchCoinMap } from "./SearchCoinMapKorean";

export interface SearchTrendRequest {
  startDate: string;
  endDate: string;
  timeUnit: string;
  keywordGroups: KeywordGroup[];
}

export interface KeywordGroup {
  groupName: string;
  keywords: string[];
}

export interface SearchTrendResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    startDate: string;
    endDate: string;
    timeUnit: string;
    results: Result[];
  };
}

export interface Result {
  title: string;
  keywords: string[];
  data: {
    period: string;
    ratio: number;
  }[];
}

export const fetchSearchTrend = async (params: SearchTrendRequest): Promise<SearchTrendResponse> => {
  try {
    console.log("검색어 백엔드에 요청:", JSON.stringify(params, null, 2));
    const response = await axios.post(API_ENDPOINTS.DASHBOARD_SEARCH, params);
    console.log("검색어 백엔드 응답:", JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error("검색어 오류 발생:", error);
    throw error;
  }
};

export const getCoinList = (): { name: string }[] => {
  return Object.keys(SearchCoinMap).map(name => ({ name }));
};
