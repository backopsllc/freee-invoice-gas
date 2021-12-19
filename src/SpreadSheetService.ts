import {Locale} from './datas';

const PROPERTY_PREFIX = 'freee-invoice-gas.';

export interface SpreadSheetService {
  getUserLocale: () => Locale;
  getUserProperty: (key: string) => string;
  setUserProperty: (key: string, value: string) => void;
  getRange: (
    sheet: GoogleAppsScript.Spreadsheet.Sheet,
    column: number,
    row: number
  ) => GoogleAppsScript.Spreadsheet.Range;
  setColumnWidth: (
    sheet: GoogleAppsScript.Spreadsheet.Sheet,
    column: number,
    width: number
  ) => void;
  showMessage: (title: string, message: string) => void;
}

export class SpreadSheetServiceImpl implements SpreadSheetService {
  public getUserLocale(): Locale {
    switch (Session.getActiveUserLocale()) {
      case 'en':
        return 'en';
      default:
        return 'ja';
    }
  }

  public getUserProperty(key: string): string {
    const value =
      PropertiesService.getUserProperties().getProperty(
        PROPERTY_PREFIX + key
      ) || '';
    console.log(key + ': ' + value);
    return value;
  }

  public setUserProperty(key: string, value: string): void {
    console.log(key + ': ' + value);
    PropertiesService.getUserProperties().setProperty(
      PROPERTY_PREFIX + key,
      value
    );
  }

  public getRange(
    sheet: GoogleAppsScript.Spreadsheet.Sheet,
    column: number,
    row: number
  ): GoogleAppsScript.Spreadsheet.Range {
    return sheet.getRange(row, column);
  }

  public setColumnWidth(
    sheet: GoogleAppsScript.Spreadsheet.Sheet,
    column: number,
    width: number
  ): void {
    sheet.setColumnWidth(column, width);
  }

  public showMessage(title: string, message: string): void {
    SpreadsheetApp.getActiveSpreadsheet().toast(message, title);
  }
}
