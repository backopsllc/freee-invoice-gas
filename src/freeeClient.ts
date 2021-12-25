import {Companies, isCompanies} from './freee-api/Companies';
import {Company} from './freee-api/Company';
import {Invoice} from './freee-api/Invoice';
import {Invoices, isInvoices} from './freee-api/Invoices';
import {isMe, Me} from './freee-api/Me';
import {User} from './freee-api/User';
import {Http} from './Http';

export interface freeeClient {
  getMe: () => User;
  getCompanies: () => Company[];
  getInvoices: (parameters: string[]) => Invoice[];
}

export class freeeClientImpl implements freeeClient {
  private http: Http;
  private accessToken: string;
  constructor(http: Http, accessToken: string) {
    this.http = http;
    this.accessToken = accessToken;
  }

  public getMe(): User {
    const json = this.http.getWithAccessToken(
      this.buildUri('users/me?companies=true&advisor=true'),
      this.accessToken
    );
    if (isMe(json)) {
      return json.user;
    }
    return (json as unknown as Me).user;
  }

  public getCompanies(): Company[] {
    const json = this.http.getWithAccessToken(
      this.buildUri('companies'),
      this.accessToken
    );
    if (isCompanies(json)) {
      return json.companies;
    }
    return (json as unknown as Companies).companies;
  }

  public getInvoices(parameters: string[]): Invoice[] {
    const json = this.http.getWithAccessToken(
      this.buildUri('invoices?' + parameters.join('&')),
      this.accessToken
    );
    if (isInvoices(json)) {
      return json.invoices;
    }
    return (json as unknown as Invoices).invoices;
  }

  private buildUri(resource: string): string {
    return `https://api.freee.co.jp/api/1/${resource}`;
  }
}
