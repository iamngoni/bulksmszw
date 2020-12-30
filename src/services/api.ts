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

  async sendRequest(): Promise<ApiResponse> {
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
          if (response instanceof ApiError) {
            const error: ApiError = response;
            return new ApiResponse({
              statusresponse: SMSRESPONSE.API_ERROR,
              api_response: response,
              message: error.error_string
            });
          }

          if (response instanceof ApiSuccess) {
            const success: ApiSuccess = response;

            if (success.data.status === 'ERR' && success.data.error === 200) { 
              return new ApiResponse({
                statusresponse: SMSRESPONSE.API_ERROR,
                api_response: success,
                message: 'insufficients credits'
              });
            } else {
              return new ApiResponse({
                statusresponse: SMSRESPONSE.SUCCESS,
                api_response: success,
                message: 'success'
              });
            }
          }
          
          if (response instanceof ApiCredits) {
            return new ApiResponse({
              statusresponse: SMSRESPONSE.SUCCESS,
              api_response: response,
              message: 'success credit'
            });
          }
        }
      } else {
        return new ApiResponse({
          statusresponse: SMSRESPONSE.ERROR,
          api_response: null,
          message: result.data
        });
      }

    } catch (error) {
      return new ApiResponse({
        statusresponse: SMSRESPONSE.ERROR,
        api_response: null,
        message: 'Error sending bulksmszw request: Error ' + error.toString()
      });
    }

    return new ApiResponse({
      statusresponse: SMSRESPONSE.ERROR,
      api_response: null,
      message: 'null: request not processed'
    });
  }

  private checkApiResponseError(response: any) : any{
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