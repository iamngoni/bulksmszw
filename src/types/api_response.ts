export default class ApiResponse {
  statusresponse: string;
  api_response: any;
  message: string;

  /**
   *
   * @param response {ApiResponseType}
   */
  constructor(response: ApiResponseType) {
    this.statusresponse = response.statusresponse;
    this.api_response = response.api_response;
    this.message = response.message;
  }

  /**
   * Returns Json Data
   */
  toJson(): string {
    return JSON.stringify({
      statusresponse: this.statusresponse,
      api_response: this.api_response,
      message: this.message,
    });
  }
}

export interface ApiResponseType {
  statusresponse: string;
  api_response: any;
  message: string;
}
