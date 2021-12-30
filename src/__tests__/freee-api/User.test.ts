import {isUser, User} from '../../freee-api/User';

export const dummyUser = () => {
  return `{
    "id": 1,
    "email": "contaxt@example.com",
    "display_name": "フリー太郎",
    "first_name": "太郎",
    "last_name": "フリー",
    "first_name_kana": "タロウ",
    "last_name_kana": "フリー",
    "companies": [
      {
        "id": 1,
        "display_name": "freee株式会社",
        "role": "admin",
        "use_custom_role": false,
        "advisor_id": 1234
      }
    ]
  }`;
};

describe('freee-api/User', () => {
  test('isUser', () => {
    const dummy = JSON.parse(dummyUser());
    const expected = isUser(dummy);
    expect(expected).toBeTruthy();
    const expected2 = isUser(null);
    expect(expected2).toBeFalsy();
    const expected3 = isUser({});
    expect(expected3).toBeFalsy();
    const expected4 = isUser({id: 1, email: 'contaxt@example.com'});
    expect(expected4).toBeTruthy();
  });
  test('User', () => {
    const expected = User(1234567, 'contaxt@example.com');
    expect(expected.id).toBe(1234567);
    expect(expected.email).toBe('contaxt@example.com');
  });
});
