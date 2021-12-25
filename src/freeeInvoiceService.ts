import {UserProperty} from './datas';
import {INVOICE_STATUS_JA} from './freee-api/Invoice';
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
  'ステータス',
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

interface freeeInvoiceService {
  init: (property: UserProperty) => void;
  getUserProperties: () => UserProperty;
  run: (oauth2Service: GoogleAppsScriptOAuth2.OAuth2Service) => void;
  getDisplayname: (
    oauth2Service: GoogleAppsScriptOAuth2.OAuth2Service
  ) => string;
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
  run: (oauth2Service: GoogleAppsScriptOAuth2.OAuth2Service): void => {
    const locale = spreadSheetService.getUserLocale();
    showMessage(Message.PROGRESS_RUN_BEGIN(locale), spreadSheetService);

    // 検索条件シート
    const sheetSearch = spreadSheetService.getSheetByName(
      SEARCH_CONDITION_SHEET
    );
    if (sheetSearch === null) {
      return;
    }

    // 検索条件シートからD2:D9のデータを取得する
    const rangeQueries = spreadSheetService.getRange(sheetSearch, 2, 4, 9, 1);
    const queries2D = spreadSheetService.getValues(rangeQueries);
    const queries1D = queries2D.flat();

    // 事業所IDの配列
    let company_ids: string[] = [];
    // 検索条件の配列
    const parameters: string[] = [];
    queries1D.forEach((value, index) => {
      // eslint-disable-next-line eqeqeq
      if (index == 0) {
        // 事業所ID
        if (typeof value === 'string') {
          // 事業所IDが複数の場合
          company_ids = value.split(',');
        } else {
          // 事業所IDが1つのみの場合
          company_ids.push(value);
        }
      } else if (INVOICES_PARAMS.length > index) {
        // 事業所ID以外の検索項目
        if (typeof value !== 'string' || value !== '') {
          parameters.push(`${INVOICES_PARAMS[index]}=${value}`);
        }
      }
    });

    // 事業所一覧シート
    const companiesSheet = spreadSheetService.getSheetByName(COMPANIES_SHEET);
    const companiesRange = spreadSheetService.getRange(companiesSheet);
    const companiesValues = spreadSheetService.getValues(companiesRange);

    // APIクライアント
    const client = new freeeClientImpl(
      new HttpClient(),
      oauth2Service.getAccessToken()
    );
    showMessage(
      getMessage('progress_collect', spreadSheetService),
      spreadSheetService
    );

    // 事業所毎にAPI実行
    company_ids.forEach(company_id => {
      // 事業所名
      let companyName = INVOICES_SHEET + company_id;
      companiesValues.forEach(row => {
        // eslint-disable-next-line eqeqeq
        if (row[0] == company_id && row[1]) {
          companyName = row[1];
        }
      });
      // 事業所名シート
      const sheetInvoices = spreadSheetService.getSheetByName(companyName);
      // 事業所名シートのクリア
      spreadSheetService.clearSheet(sheetInvoices);

      // APIで検索
      const params = [`${INVOICES_PARAMS[0]}=${company_id}`].concat(parameters);
      const invoices = client.getInvoices(params);

      // 取得データを2次元配列化
      const ary2D: any[][] = [INVOCIES_HEADER];
      invoices.forEach(invoice => {
        ary2D.push([
          invoice.booking_date,
          invoice.id,
          invoice.deal_id,
          invoice.partner_display_name,
          invoice.total_amount,
          invoice.total_vat,
          INVOICE_STATUS_JA[invoice.invoice_status],
          invoice.description,
          `https://secure.freee.co.jp/docs_v2/invoice/${invoice.id}/edit`,
          `https://secure.freee.co.jp/deals#deal_id=${invoice.deal_id}`,
        ]);
      });

      // 事業所名シートにデータを書く
      const rangeData = spreadSheetService.getRange(
        sheetInvoices,
        1,
        1,
        ary2D.length,
        ary2D[0].length
      );
      spreadSheetService.setValues(rangeData, ary2D);
    });

    showMessage(
      getMessage('scriptName', spreadSheetService) +
        getMessage('progress_end', spreadSheetService),
      spreadSheetService
    );

    return;
  },
  getDisplayname: (
    oauth2Service: GoogleAppsScriptOAuth2.OAuth2Service
  ): string => {
    // API実行
    const client = new freeeClientImpl(
      new HttpClient(),
      oauth2Service.getAccessToken()
    );
    const me = client.getMe();

    if (me.companies) {
      // 事業所一覧シート
      const sheet = spreadSheetService.getSheetByName(COMPANIES_SHEET);
      // 事業所一覧シートのクリア
      spreadSheetService.clearSheet(sheet);

      // 取得データを2次元配列化
      const ary2D: any[][] = [COMPANIES_HEADER];
      me.companies.forEach(company => {
        ary2D.push([company.id, company.display_name, company.role]);
      });

      // 事業所一覧にデータを書く
      const rangeData = spreadSheetService.getRange(
        sheet,
        1,
        1,
        ary2D.length,
        ary2D[0].length
      );
      spreadSheetService.setValues(rangeData, ary2D);
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
