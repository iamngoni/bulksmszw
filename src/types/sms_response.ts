export default interface SMS_RESPONSE {
  SUCCESS: string;
  ERROR: string;
  FAIL: string;
  API_ERROR: string;
}

export const SMSRESPONSE: SMS_RESPONSE = Object.freeze({
  SUCCESS: 'success',
  ERROR: 'error',
  FAIL: 'fail',
  API_ERROR: 'api_error',
});
