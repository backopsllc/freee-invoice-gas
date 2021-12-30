import {Company, isCompany} from '../../freee-api/Company';

export const dummyCompany = () => {
  return `{
    "id": 1,
    "display_name": "freee株式会社",
    "role": "admin",
    "use_custom_role": false,
    "advisor_id": 1234
  }`;
};

describe('freee-api/Company', () => {
  test('isCompany', () => {
    const dummy = JSON.parse(dummyCompany());
    const expected = isCompany(dummy);
    expect(expected).toBeTruthy();
    const expected2 = isCompany(null);
    expect(expected2).toBeFalsy();
    const expected3 = isCompany({});
    expect(expected3).toBeFalsy();
  });
  test('Company', () => {
    const expected = Company(1234567, 'freee株式会社', 'admin');
    expect(expected.id).toBe(1234567);
    expect(expected.display_name).toBe('freee株式会社');
    expect(expected.role).toBe('admin');
  });
});
