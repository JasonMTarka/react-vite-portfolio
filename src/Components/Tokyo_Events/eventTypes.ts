export interface SumidaEvent {
  URL: string;
  イベント名: string;
  地方公共団体名: string;
  場所名称: string;
  説明: string;
  アクセス方法: string;
  開始日: string;
  開始日時特記事項: string;
  終了日: string;
}

export interface BigSightEvent {
  展示会名: string;
  "会期(開始)": string;
  "会期(終了)": string;
  開催時間: string;
  URL: string;
  内容: string;
}

export interface TokyoPublicAPIResponse {
  limit: number;
  metadata: object;
  offset: number;
  subtotal: number;
  total: number;
}

export interface SumidaAPIResponse extends TokyoPublicAPIResponse {
  hits: SumidaEvent[];
}

export interface BigSightAPIResponse extends TokyoPublicAPIResponse {
  hits: BigSightEvent[];
}

export type EventDataList = VenueData[];

export interface VenueData {
  name: string;
  data: EventDisplayData[];
}

export interface EventDisplayData {
  name: string;
  explanation: string;
  startDate: string;
  endDate: string;
  url: string;
}

export type ValidAPI = "Sumida" | "BigSight";
