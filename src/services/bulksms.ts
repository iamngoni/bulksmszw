import Api from './api';
import ApiResponse from '../types/api_response';

export default class BulkSmsZw {
  private BULKSMS_WEBSERVICE_URL: string = 'http://portal.bulksmsweb.com/index.php?app=ws';
  private SEND_SMS_OPERATION: string = 'pv';
  private SMS_CREDIT_OPERATION: string = 'cr';
  private key: string;
  private name: string;

  /**
   *
   * @param data [BulkSmsZwType]
   */
  constructor(data: BulkSmsZwType) {
    this.key = data.bulkSmsWebKey.trim();
    this.name = data.bulkSmsWebName.trim();
  }

  /**
   *
   * @param input [message, recipients, credits]
   * @returns [BulkSmsZwApiResponse]
   */
  async send(input: messageInput): Promise<ApiResponse> {



    let url = this.sms_op();

    if (input.credits) {
      url = this.credit_op();
    }

    const resp = await new Api({
      url: url,
      recipients: this.recipientx(input.recipients),
      message: input.message + '\n',
    }).sendRequest();

    return resp;
  }

  private sms_op(): string {
    return this.BULKSMS_WEBSERVICE_URL + '&u=' + this.name + '&h=' + this.key + '&op=' + this.SEND_SMS_OPERATION;
  }

  private credit_op(): string {
    return this.BULKSMS_WEBSERVICE_URL + '&u=' + this.name + '&h=' + this.key + '&op=' + this.SMS_CREDIT_OPERATION;
  }

  private recipientx(recipients: Array<String>): string {
    let listStr: string = '';
    for (let number of recipients) {
      if (number == null || number === '') {
        continue;
      }
      listStr += number.trim() + ',';
    }

    listStr = listStr.replace(/,\s*$/, '');
    return listStr;
  }
}

export interface BulkSmsZwType {
  bulkSmsWebKey: string;
  bulkSmsWebName: string;
}

export interface messageInput {
  message: string;
  recipients: Array<string>;
  credits: Boolean;
}