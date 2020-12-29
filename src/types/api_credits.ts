export default class ApiCredits {
  status: string;
  error: string;
  error_string: any;
  timestamp: any;
  credit: any;
  constructor(public data: ApiCredit) {
    this.status = data.status;
    this.error = data.error;
    this.error_string = data.error_string;
    this.timestamp = data.timestamp;
    this.credit = data.credit;
  }

  toJson() : string {
    return JSON.stringify({
      status: this.status,
      error: this.error,
      error_string: this.error_string,
      timestamp: this.timestamp,
      credit: this.credit
    });
  }

  fromJson(data: string): ApiCredits {
    return JSON.parse(data);
  }
}

export interface ApiCredit {
  status: string,
  error: string,
  error_string: string,
  timestamp: any,
  credit: any
}