import {isCompany} from '../freee-api/Company';
import {isInvoice} from '../freee-api/Invoice';
import {isUser} from '../freee-api/User';
import {freeeClientImpl} from '../freeeClient';
import {Http} from '../Http';
import {dummyCompanies} from './freee-api/Companies.test';
import {dummyInvoices} from './freee-api/Invoices.test';
import {dummyMe} from './freee-api/Me.test';

describe('freeeClient', () => {
  class FakeHttp implements Http {
    public get(uri: string): JSON {
      return this.toJson('{}');
    }
    public getWithAccessToken(uri: string, accessToken: string): JSON {
      if (
        uri ===
        'https://api.freee.co.jp/api/1/users/me?companies=true&advisor=true'
      ) {
        return this.toJson(dummyMe());
      } else if (uri === 'https://api.freee.co.jp/api/1/companies') {
        return this.toJson(dummyCompanies());
      } else if (uri === 'https://api.freee.co.jp/api/1/invoices?') {
        return this.toJson(dummyInvoices());
      }

      return this.toJson('{}');
    }
    public post(uri: string, data: any): JSON {
      return this.toJson('{}');
    }
    private toJson(text: string): JSON {
      return JSON.parse(text);
    }
  }

  const client = new freeeClientImpl(new FakeHttp(), 'dummyAccessToken');

  test('Get Me', () => {
    const expected = client.getMe();
    expect(isUser(expected)).toBeTruthy();
  });
  test('Get Companies', () => {
    const expected = client.getCompanies();
    expect(isCompany(expected[0])).toBeTruthy();
  });
  test('Get Invoices', () => {
    const expected = client.getInvoices([]);
    expect(isInvoice(expected[0])).toBeTruthy();
  });
});
