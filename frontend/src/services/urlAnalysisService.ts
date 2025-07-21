import httpService from "./httpService";
import type { AxiosResponse } from "axios";
import type {
  UrlForm,
  SummaryResponse,
  SummaryList,
  SummaryPaginationResponse,
} from "../type";

export const analyzeUrl = (
  url: UrlForm
): Promise<AxiosResponse<SummaryResponse>> => {
  return httpService.post("url-analyze/", url);
};

export const summaryAnalyzer = (
  data: SummaryList
): Promise<AxiosResponse<SummaryPaginationResponse>> => {
  return httpService.get("url-analyze-summary/?", { params: data });
};

export const getSummary = (
  id: number,
  user_id: number
): Promise<AxiosResponse<SummaryResponse>> => {
  return httpService.get(`url-analyze-summary-details/${id}`, {
    params: { user_id },
  });
};
