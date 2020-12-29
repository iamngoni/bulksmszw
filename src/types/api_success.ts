export default class ApiSuccess {
  data: Data;
  errorString: any;
  timestamp: Number;

  constructor(response: ApiSuccessType) {
    this.data = response.data;
    this.errorString = response.errorString;
    this.timestamp = response.timestamp;
  }

  toJson() : string {
    return JSON.stringify({
      data: this.data,
      error_string: this.errorString,
      timestamp: this.timestamp
    });
  }

  fromJson(data: string): ApiSuccess {
    return JSON.parse(data);
  }
}

export interface ApiSuccessType {
  data: Data,
  errorString: any,
  timestamp: Number,
}

export class Data {
  status: String;
  error: any;
  smsLogId: String;
  queue: String;
  to: String;

  constructor(data: DataType) {
    this.status = data.status;
    this.error = data.error;
    this.smsLogId = data.smsLogId;
    this.queue = data.queue;
    this.to = data.to;
  }

  toJson() : string {
    return JSON.stringify({
      status: this.status,
      error: this.error,
      smsLogId: this.smsLogId,
      queue: this.queue,
      to: this.to
    });
  }

  fromJson(data: string): Data {
    return JSON.parse(data);
  }
}

export interface DataType {
  status: String,
  error: any,
  smsLogId: String,
  queue: String,
  to: String
}