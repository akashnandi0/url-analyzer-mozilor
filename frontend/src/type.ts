export interface User {
  email: string;
  password: string;
}
export interface TokenResponse {
  access_token: string;
  email: string;
  id: number;
}
export interface LoginResponse {
  data: TokenResponse;
}
export interface UrlForm {
  url: string;
  user_id: number;
}

export interface SummaryList {
  user_id: number;
  page: number;
  size: number;
}

export interface Summary {
  id: number;
  url: string;
  word_frequencies: Record<string, number>;
  created_at: string;
}
export interface SummaryResponse {
  data: Summary;
}

export interface WordFrequency {
  id: string;
  value: number;
  label: string;
}
export interface SummaryListResponse {
  data: Array<Summary>
  page: number
  size: number
  total_count: number
}

export interface SummaryPaginationResponse {
  data: SummaryListResponse
}
