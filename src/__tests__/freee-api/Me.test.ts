import {isMe, Me} from '../../freee-api/Me';

export const dummyMe = () => {
  return `{
    "user": {
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
    }
  }`;
};

describe('freee-api/Me', () => {
  test('isMe', () => {
    const dummy = JSON.parse(dummyMe());
    const expected = isMe(dummy);
    expect(expected).toBeTruthy();
    const expected2 = isMe(null);
    expect(expected2).toBeFalsy();
    const expected3 = isMe({});
    expect(expected3).toBeFalsy();
  });
  test('Me', () => {
    const dummy = JSON.parse(dummyMe());
    const me = Me(dummy.user);
    const expected = isMe(me);
    expect(expected).toBeTruthy();
  });
});
