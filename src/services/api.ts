import axios from "axios";
import ApiCredits from "../types/api_credits";
import ApiError from "../types/api_error";
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
        console.log(result.data)
        let response = this.checkApiResponseError(result.data);

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

            if (success.data.status === 'ERR' && success.data.error === '200') { 
              return new ApiResponse({
                statusresponse: SMSRESPONSE.API_ERROR,
                api_response: success,
                message: 'insufficients credit'
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
      console.log(error);
      return new ApiResponse({
        statusresponse: SMSRESPONSE.ERROR,
        api_response: null,
        message: 'Error sending bulksmszw request: Error -> ' + error.toString()
      });
    }

    return new ApiResponse({
      statusresponse: SMSRESPONSE.ERROR,
      api_response: null,
      message: 'null: request not processed'
    });
  }

  private checkApiResponseError(response: any){
    try {
      if (response.hasOwnProperty('error_string') && response.error_string != null) {
        console.log('Processing error response from API');
        return new ApiError({error_string: response.error_string, error: response.error, status: response.status, timestamp: response.timestamp});
      } else {
        if (response.hasOwnProperty('credit')) {
          console.log('Processing credit response for API');
          return new ApiCredits({ status: response.status, error: response.error, error_string: response.error_string, timestamp: response.timestamp, credit: response.credit});
        }

        if (response.hasOwnProperty('data')) {
          console.log('Processing success response from API');
          return new ApiSuccess({error_string: response.error_string, data: response.data[0], timestamp: response.timestamp});
        } else {
          throw Error("Unknown response");
        }
      }
    } catch (error) {
      console.log(error)
      return null;
    }
  }
}

export interface ApiType {
  url: string;
  recipients: string,
  message: string
}