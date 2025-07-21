import httpService from "./httpService";
import type { AxiosResponse } from "axios";
import type { UrlForm, SummaryResponse, SummaryList, SummaryPaginationResponse } from "../type";

export const analyzeUrl = (
  url: UrlForm,
): Promise<AxiosResponse<SummaryResponse>> => {
  return httpService.post("analyze-url/", url);
};

export const summaryAnalyzer = (
  data: SummaryList,
): Promise<AxiosResponse<SummaryPaginationResponse>> => {
  return httpService.get("url-analysis-summary/?", {params: data});
};

export const getSummary = (
  id: number,user_id: number
): Promise<AxiosResponse<SummaryResponse>> => {
  return httpService.get(`url-analysis-summary-details/${id}`, { params: { user_id } });
};
