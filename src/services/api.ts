import axios from "axios";
import ApiCredits from "../types/api_credits";
import ApiError from "../types/api_error";
import { ApiErrorType } from "../types/api_error";
import ApiResponse from "../types/api_response";
import ApiSuccess from "../types/api_success";
import { SMSRESPONSE } from "../types/sms_response";
import Parse from "../utils/parse";

export default class Api {
  url: string;
  recipients: string;
  message: string;

  constructor(apiData: ApiType) {
    this.url = apiData.url;
    this.recipients = apiData.recipients;
    this.message = apiData.message;
  }

  async sendRequest(): ApiResponse {
    try {
      const url: string = new Parse({
        quoteBody: this.message,
        quoteRecipients: this.recipients,
        webUrl: this.url
      }).url();

      let result = await axios.post(url);

      if (result.status === 200) {
        let response = this.checkApiResponseError(result.data)

        if (response == null) {
          return new ApiResponse({
            statusresponse: SMSRESPONSE.FAIL,
            api_response: response,
            message: 'Failed to send bulksmsweb message'
          });
        } else {
          if (typeof response === ApiError) {
            const error: ApiError = response;
            return new ApiResponse({
              statusresponse: SMSRESPONSE.API_ERROR,
              api_response: response,
              message: error.error_string
            });
          }
        }
      }

    } catch (error) {
      return new ApiResponse({
        statusresponse: SMSRESPONSE.ERROR,
        api_response: null,
        message: 'Error sending bulksmszw request: Error ' + error.toString()
      });
    }
  }

  private checkApiResponseError(response: any) {
    let resp = JSON.parse(response);
    if (resp.error_string != null) {
      return new ApiError(resp).fromJson(response);
    } else {
      if (resp.toString().includes('credit')) {
        return new ApiCredits(resp).fromJson(response);
      }

      if (resp.toString().includes('data')) {
        return new ApiSuccess(resp).fromJson(response);
      } else {
        return null;
      }
    }
  }
}

export interface ApiType {
  url: string;
  recipients: string,
  message: string
}