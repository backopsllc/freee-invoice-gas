import {Locale} from './datas';

const messages: {[key: string]: {[locale: string]: string}} = {
  scriptName: {
    en: 'get invoices',
    ja: '請求書取得',
  },
  title_init: {
    en: 'Setup config',
    ja: 'freeeアプリ設定',
  },
  title_run: {
    en: 'Get invoices from freee',
    ja: 'freee 請求書取得',
  },
  menu_step0: {
    en: 'STEP0: Setup Config',
    ja: 'STEP0: アプリ設定',
  },
  menu_step1: {
    en: 'STEP1: Authorization',
    ja: 'STEP1: ログイン',
  },
  menu_step2: {
    en: 'STEP2: Confirm Connected',
    ja: 'STEP2: 接続確認',
  },
  menu_step3: {
    en: 'STEP3: Get Invoices',
    ja: 'STEP3: 請求書一覧取得',
  },
  menu_step99: {
    en: 'STEP99: Logout',
    ja: 'STEP99: ログアウト',
  },
  label_clientId: {
    en: 'Client ID',
    ja: 'Client ID',
  },
  label_clientSecret: {
    en: 'Client Secret',
    ja: 'Client Secret',
  },
  label_callbackUrl: {
    en: 'Callback Url',
    ja: 'コールバックURL',
  },
  button_save: {
    en: 'Save',
    ja: '保存',
  },
  button_execute: {
    en: 'Execute',
    ja: '実行',
  },
  complete_init: {
    en: 'Setup complete',
    ja: '設定が完了しました',
  },
  progress_collect: {
    en: 'Collecting data...',
    ja: 'データを収集しています...',
  },
  progress_end: {
    en: ' has finished',
    ja: ' が正常に行われました',
  },
};

export const Message = {
  findByKey: (key: string, locale: string): string => messages[key][locale],
  PROGRESS_INIT_BEGIN: (locale: Locale): string => {
    const msg = {
      en: 'Started initialize app',
      ja: 'freeeアプリの設定を開始しました...',
    };
    return msg[locale];
  },
  PROGRESS_RUN_BEGIN: (locale: Locale): string => {
    const msg = {
      en: 'Started get invoices',
      ja: '請求書の取得を開始しました...',
    };
    return msg[locale];
  },
  CLIENT_ID_REQUIRED: (locale: Locale): string => {
    const msg = {
      en: 'Clinet ID is required',
      ja: 'Client IDを入力してください',
    };
    return msg[locale];
  },
  CLIENT_SECRET_REQUIRED: (locale: Locale): string => {
    const msg = {
      en: 'Client Secret is required',
      ja: 'Client Secretを入力してください',
    };
    return msg[locale];
  },
  COMPANY_ID_NOT_FOUND: (locale: Locale): string => {
    const msg = {
      en: 'No company id found',
      ja: '事業所IDが見つかりません',
    };
    return msg[locale];
  },
  AUTHENTICATE_FAILED: (locale: Locale): string => {
    const msg = {
      en: 'Authentication failed',
      ja: '認証に失敗しました',
    };
    return msg[locale];
  },
  API_ACCESS_ERROR: (error: Error, locale: Locale): string => {
    const msg = {
      en: `API access error ${error.message}`,
      ja: `APIアクセスエラー ${error.message}`,
    };
    return msg[locale];
  },
  VALIDATE_ERROR_LINE: (lineNumber: number, locale: Locale): string => {
    const msg = {
      en: `Error occured at row ${lineNumber}: `,
      ja: `エラー ${lineNumber} 行目: `,
    };
    return msg[locale];
  },
  INVALID_ROW_LENGTH: (locale: Locale): string => {
    const msg = {
      en: 'There is no data on the sheet.',
      ja: 'シート上にデータが存在しません。',
    };
    return msg[locale];
  },
};
