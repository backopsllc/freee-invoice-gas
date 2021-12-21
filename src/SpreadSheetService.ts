import {Locale} from './datas';

const PROPERTY_PREFIX = 'freee-invoice-gas.';

export interface SpreadSheetService {
  getUserLocale: () => Locale;
  getUserProperty: (key: string) => string;
  setUserProperty: (key: string, value: string) => void;
  getSheet: (
    spreadSheet: GoogleAppsScript.Spreadsheet.Spreadsheet,
    sheetName: string
  ) => GoogleAppsScript.Spreadsheet.Sheet;
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

  public getSheet(
    spreadSheet: GoogleAppsScript.Spreadsheet.Spreadsheet,
    sheetName: string
  ): GoogleAppsScript.Spreadsheet.Sheet {
    let sheet = spreadSheet.getSheetByName(sheetName);
    if (sheet) {
      return sheet;
    }
    sheet = spreadSheet.insertSheet();
    sheet.setName(sheetName);
    return sheet;
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
