export default class ApiSuccess {
  data: DataType;
  error_string: any;
  timestamp: Number;

  /**
   *
   * @param response {ApiSuccessType}
   */
  constructor(response: ApiSuccessType) {
    this.data = response.data;
    this.error_string = response.error_string;
    this.timestamp = response.timestamp;
  }
}

export interface ApiSuccessType {
  data: DataType;
  error_string: any;
  timestamp: Number;
}

export interface DataType {
  status: string;
  error: any;
  smslog_id: string;
  queue: string;
  to: string;
}
