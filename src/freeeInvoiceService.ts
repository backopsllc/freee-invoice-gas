import {UserProperty} from './datas';
import {freeeClientImpl} from './freeeClient';
import {HttpClient} from './Http';
import {Message} from './resource';
import {SpreadSheetService} from './SpreadSheetService';

const SEARCH_CONDITION_SHEET = '検索条件';
const COMPANIES_SHEET = '事業所一覧';
const INVOICES_SHEET = '請求書';
const COMPANIES_HEADER = ['事業所ID', '事業所名', 'ユーザの権限'];
const INVOCIES_HEADER = [
  '売上計上日',
  '請求書ID',
  '取引ID',
  '請求先名',
  '合計額',
  '消費税額',
  '備考',
  '請求書URL',
  '取引URL',
];
const INVOICES_PARAMS = [
  'company_id',
  'start_issue_date',
  'end_issue_date',
  'start_due_date',
  'end_due_date',
  'limit',
  'payment_status',
  'invoice_status',
];

const getOAuth2Service = (property: UserProperty) => {
  return OAuth2.createService('freeeAPI')
    .setAuthorizationBaseUrl(
      'https://accounts.secure.freee.co.jp/public_api/authorize'
    )
    .setTokenUrl('https://accounts.secure.freee.co.jp/public_api/token')
    .setClientId(property.clientId)
    .setClientSecret(property.clientSecret)
    .setCallbackFunction('authCallback')
    .setPropertyStore(PropertiesService.getUserProperties());
};

interface freeeInvoiceService {
  init: (property: UserProperty) => void;
  getUserProperties: () => UserProperty;
  getOAuth2Service: () => GoogleAppsScriptOAuth2.OAuth2Service;
  run: () => void;
  getDisplayname: () => string;
  getMessage: (key: string) => string;
}

export const freeeInvoiceService = (
  spreadSheetService: SpreadSheetService
): freeeInvoiceService => ({
  init: (property: UserProperty): void => {
    const locale = spreadSheetService.getUserLocale();
    showMessage(Message.PROGRESS_INIT_BEGIN(locale), spreadSheetService);

    storeUserProperties(property, spreadSheetService);

    showMessage(
      getMessage('complete_init', spreadSheetService),
      spreadSheetService
    );
    return;
  },
  getUserProperties: (): UserProperty => getUserProperties(spreadSheetService),
  getOAuth2Service: (): GoogleAppsScriptOAuth2.OAuth2Service => {
    const config = getUserProperties(spreadSheetService);
    return getOAuth2Service(config);
  },
  run: (): void => {
    const locale = spreadSheetService.getUserLocale();
    showMessage(Message.PROGRESS_RUN_BEGIN(locale), spreadSheetService);

    const spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheetSearch = spreadSheet.getSheetByName(SEARCH_CONDITION_SHEET);
    if (!sheetSearch) {
      return;
    }

    const queries2D = sheetSearch.getRange('D2:D9').getValues();
    const queries1D = queries2D.flat();
    let company_ids: string[] = [];
    const parameters: string[] = [];
    queries1D.forEach((value, index) => {
      // eslint-disable-next-line eqeqeq
      if (index == 0) {
        if (typeof value === 'string') {
          company_ids = value.split(',');
        } else {
          company_ids.push(value);
        }
      } else if (INVOICES_PARAMS.length > index) {
        if (typeof value !== 'string' || value !== '') {
          parameters.push(`${INVOICES_PARAMS[index]}=${value}`);
        }
      }
    });

    const sheetCompanies = spreadSheetService.getSheet(
      spreadSheet,
      COMPANIES_SHEET
    );
    const companiesInfo = sheetCompanies.getDataRange().getValues();

    const config = getUserProperties(spreadSheetService);
    const oauth2Service = getOAuth2Service(config);
    const client = new freeeClientImpl(
      new HttpClient(),
      oauth2Service.getAccessToken()
    );
    showMessage(
      getMessage('progress_collect', spreadSheetService),
      spreadSheetService
    );

    company_ids.forEach(company_id => {
      let companyName = INVOICES_SHEET + company_id;
      companiesInfo.forEach(row => {
        // eslint-disable-next-line eqeqeq
        if (row[0] == company_id && row[1]) {
          companyName = row[1];
        }
      });
      const sheetInvoices = spreadSheetService.getSheet(
        spreadSheet,
        companyName
      );

      const params = [`${INVOICES_PARAMS[0]}=${company_id}`].concat(parameters);
      const invoices = client.getInvoices(params);

      const ary2D: any[][] = [INVOCIES_HEADER];
      invoices.forEach(invoice => {
        const urlInvoice = `https://secure.freee.co.jp/docs_v2/invoice/${invoice.id}/edit`;
        const urlDeal = `https://secure.freee.co.jp/deals#deal_id=${invoice.deal_id}`;
        ary2D.push([
          invoice.booking_date,
          invoice.id,
          invoice.deal_id,
          invoice.partner_display_name,
          invoice.total_amount,
          invoice.total_vat,
          invoice.description,
          urlInvoice,
          urlDeal,
        ]);
      });
      sheetInvoices.getDataRange().clearContent();
      const rangeData = sheetInvoices.getRange(
        1,
        1,
        ary2D.length,
        ary2D[0].length
      );
      rangeData.setValues(ary2D);
    });

    showMessage(
      getMessage('scriptName', spreadSheetService) +
        getMessage('progress_end', spreadSheetService),
      spreadSheetService
    );

    return;
  },
  getDisplayname: (): string => {
    const config = getUserProperties(spreadSheetService);
    const oauth2Service = getOAuth2Service(config);
    const client = new freeeClientImpl(
      new HttpClient(),
      oauth2Service.getAccessToken()
    );
    const me = client.getMe();

    if (me.companies) {
      const spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
      const sheet = spreadSheetService.getSheet(spreadSheet, COMPANIES_SHEET);
      sheet.getDataRange().clearContent();

      const ary2D: any[][] = [COMPANIES_HEADER];
      me.companies.forEach(company => {
        ary2D.push([company.id, company.display_name, company.role]);
      });
      const rangeData = sheet.getRange(1, 1, ary2D.length, ary2D[0].length);
      rangeData.setValues(ary2D);
    }

    return me.display_name;
  },
  getMessage: (key: string): string => getMessage(key, spreadSheetService),
});

const getMessage = (key: string, spreadSheetService: SpreadSheetService) =>
  Message.findByKey(key, spreadSheetService.getUserLocale());

const getUserProperties = (
  spreadSheetService: SpreadSheetService
): UserProperty => {
  const clientId = spreadSheetService.getUserProperty('clientId')
    ? spreadSheetService.getUserProperty('clientId')
    : '';
  const clientSecret = spreadSheetService.getUserProperty('clientSecret')
    ? spreadSheetService.getUserProperty('clientSecret')
    : '';

  return UserProperty(clientId, clientSecret);
};

const storeUserProperties = (
  property: UserProperty,
  spreadSheetService: SpreadSheetService
): void => {
  spreadSheetService.setUserProperty('clientId', property.clientId);
  spreadSheetService.setUserProperty('clientSecret', property.clientSecret);
};

const showMessage = (
  message: string,
  spreadSheetService: SpreadSheetService
): void =>
  spreadSheetService.showMessage(
    getMessage('scriptName', spreadSheetService),
    message
  );
