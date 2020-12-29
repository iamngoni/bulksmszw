import SMS_RESPONSE from "./sms_response";

export default class ApiResponse {
  statusresponse: SMS_RESPONSE;
  api_response: any;
  message: String;

  constructor(response: ApiResponseType) {
    this.statusresponse = response.statusresponse;
    this.api_response = response.api_response;
    this.message = response.message;
  }

  toJson() : string {
    return JSON.stringify({
      statusresponse: this.statusresponse,
      api_response: this.api_response,
      message: this.message
    });
  }
}

export interface ApiResponseType {
  statusresponse: SMS_RESPONSE,
  api_response: String,
  message: String
}