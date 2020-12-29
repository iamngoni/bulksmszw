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

  toJson() : string {
    return JSON.stringify({
      status: this.status,
      error: this.error,
      error_string: this.error_string,
      timestamp: this.timestamp
    });
  }

  fromJson(data: string): ApiErrorType {
    return JSON.parse(data);
  }
}

export interface ApiErrorType {
  status: string,
  error: string,
  error_string: any,
  timestamp: Number
}