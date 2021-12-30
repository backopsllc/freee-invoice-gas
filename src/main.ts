import {UserProperty} from './datas';
import {freeeInvoiceService} from './freeeInvoiceService';
import {SpreadSheetServiceImpl} from './SpreadSheetService';

const SCRIPT_VERSION = 'v1.0.0';

const service = freeeInvoiceService(new SpreadSheetServiceImpl());

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
const authCallback = function (request: object) {
  const property = service.getUserProperties();
  const oauth2Service = getOAuth2Service(property);
  const isAuthorized = oauth2Service.handleCallback(request);
  if (isAuthorized) {
    return HtmlService.createHtmlOutput(
      '成功! freeeにログインしました。<br>続行するには、このウィンドウを閉じてSpreadsheetに戻ってください。'
    );
  } else {
    return HtmlService.createHtmlOutput(
      '失敗!  freeeへのログインに失敗しました。<br>このウィンドウを閉じてSpreadsheetに戻ってください。'
    );
  }
};

const onOpen = function () {
  SpreadsheetApp.getUi()
    .createMenu('freee')
    .addItem(service.getMessage('menu_step0'), 'init_d')
    .addItem(service.getMessage('menu_step1'), 'auth_d')
    .addItem(service.getMessage('menu_step2'), 'user_info_d')
    .addItem(service.getMessage('menu_step3'), 'run')
    .addItem(service.getMessage('menu_step99'), 'logout_d')
    .addToUi();
};

const init_d = function () {
  const html = HtmlService.createTemplateFromFile('index');

  html.mode = 'init';
  SpreadsheetApp.getUi().showModalDialog(
    html.evaluate(),
    service.getMessage('title_init') + ' ' + SCRIPT_VERSION
  );
};
const init = function (property: UserProperty) {
  service.init(property);
};

const auth_d = function () {
  const property = service.getUserProperties();
  const oauth2Service = getOAuth2Service(property);
  if (!oauth2Service.hasAccess()) {
    const authorizationUrl = oauth2Service.getAuthorizationUrl();
    const template = HtmlService.createTemplate(
      '<?!= include("css"); ?>' +
        '<a class="button" href="<?= authorizationUrl ?>" target="_blank">freeeアプリ連携</a><br />' +
        'Spreadsheetとfreeeのアプリ連携を許可します。'
    );
    template.authorizationUrl = authorizationUrl;
    const page = template.evaluate();
    const title = 'freeeアプリ連携';

    createModelessDialog(page.getContent(), title);
  } else {
    user_info_d();
  }
};

const logout_d = function () {
  const property = service.getUserProperties();
  const oauth2Service = getOAuth2Service(property);
  oauth2Service.reset();
  const mes = 'freeeアプリからログアウトしました';
  const logoutTitle = 'ログアウト終了';

  createModelessDialog(mes, logoutTitle);
};

const user_info_d = function () {
  const property = service.getUserProperties();
  const oauth2Service = getOAuth2Service(property);
  const displayName = service.getDisplayname(oauth2Service);
  const page = 'ユーザー名: ' + displayName;
  const title = 'freee連携済';

  createModelessDialog(page, title);
};

const run = function () {
  const property = service.getUserProperties();
  const oauth2Service = getOAuth2Service(property);
  service.run(oauth2Service);
};

const run_cron = function () {
  const property = service.getUserProperties();
  const oauth2Service = getOAuth2Service(property);
  service.run(oauth2Service);
};

const getConfig = function (): UserProperty {
  return service.getUserProperties();
};

const getMessage = function (key: string) {
  return service.getMessage(key);
};

const include = function (filename: string) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
};

const createModelessDialog = function (html: string, title: string) {
  const htmlOutput = HtmlService.createHtmlOutput(html)
    .setWidth(360)
    .setHeight(120);
  SpreadsheetApp.getUi().showModelessDialog(htmlOutput, title);
};
