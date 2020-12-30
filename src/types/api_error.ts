export default class ApiError {
  status: string;
  error: string;
  error_string: any;
  timestamp: Number;

  constructor(data: ApiErrorType) {
    this.status = data.status;
    this.error = data.error;
    this.error_string = data.error_string;
    this.timestamp = data.timestamp;
  }
}

export interface ApiErrorType {
  status: string,
  error: string,
  error_string: any,
  timestamp: Number
}