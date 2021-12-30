import {Companies, isCompanies} from '../../freee-api/Companies';

export const dummyCompanies = () => {
  return `{
    "companies": [
      {
        "id": 1,
        "name": "freee事務所",
        "name_kana": "フリージムショ",
        "display_name": "freee事務所",
        "role": "admin"
      }
    ]
  }`;
};

describe('freee-api/Companies', () => {
  test('isCompanies', () => {
    const dummy = JSON.parse(dummyCompanies());
    const expected = isCompanies(dummy);
    expect(expected).toBeTruthy();
    const expected2 = isCompanies(null);
    expect(expected2).toBeFalsy();
    const expected3 = isCompanies({});
    expect(expected3).toBeFalsy();
  });
  test('Companies', () => {
    const dummy = JSON.parse(dummyCompanies());
    const companies = Companies(dummy.companies);
    const expected = isCompanies(companies);
    expect(expected).toBeTruthy();
  });
});
