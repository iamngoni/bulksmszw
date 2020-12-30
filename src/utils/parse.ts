export default class Parse {
  webUrl: string;
  quoteBody: string;
  quoteRecipients: string;

  constructor(parseData: ParseType) {
    this.webUrl = parseData.webUrl;
    this.quoteBody = parseData.quoteBody;
    this.quoteRecipients = parseData.quoteRecipients;
  }

  url(): string {
    return this.webUrl + this.payload();
  }

  private payload(): string {
    return '&to=' + this.recipients() + '&msg=' + this.body();
  }

  private recipients(): string {
    return encodeURI(this.quoteRecipients);
  }

  private body(): string {
    return encodeURI(this.quoteBody);
  }

  public toString(): string {
    return (
      'Parse -> (webUrl: ' +
      this.webUrl +
      ', quoteBody: ' +
      this.quoteBody +
      ', quoteRecipients: ' +
      this.quoteRecipients +
      ')'
    );
  }
}

export interface ParseType {
  webUrl: string;
  quoteBody: string;
  quoteRecipients: string;
}
