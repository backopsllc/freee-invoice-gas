import {
  isTotalAmountPerVatRate,
  TotalAmountPerVatRate,
} from '../../freee-api/TotalAmountPerVatRate';

export const dummyTotalAmountPerVatRate = () => {
  return `{
    "vat_5": 0,
    "vat_8": 108000,
    "reduced_vat_8": 0,
    "vat_10": 0
  }`;
};

describe('freee-api/TotalAmountPerVatRate', () => {
  test('isTotalAmountPerVatRate', () => {
    const dummy = JSON.parse(dummyTotalAmountPerVatRate());
    const expected = isTotalAmountPerVatRate(dummy);
    expect(expected).toBeTruthy();
    const expected2 = isTotalAmountPerVatRate(null);
    expect(expected2).toBeFalsy();
    const expected3 = isTotalAmountPerVatRate({});
    expect(expected3).toBeFalsy();
  });
  test('TotalAmountPerVatRate', () => {
    const expected = TotalAmountPerVatRate(0, 108000, 8000, 10000);
    expect(expected.vat_5).toBe(0);
    expect(expected.vat_8).toBe(108000);
    expect(expected.reduced_vat_8).toBe(8000);
    expect(expected.vat_10).toBe(10000);
  });
});
