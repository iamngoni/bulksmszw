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
}

export interface ApiCredit {
  status: string,
  error: string,
  error_string: string,
  timestamp: any,
  credit: any
}