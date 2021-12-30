import {InvoiceContent, isInvoiceContent} from '../../freee-api/InvoiceContent';

export const dummyInvoiceContent = () => {
  return `{
    "id": 1,
    "order": 1,
    "type": "normal",
    "qty": 1,
    "unit": "個",
    "unit_price": 1,
    "amount": 108000,
    "vat": 8000,
    "reduced_vat": true,
    "description": "備考",
    "account_item_id": 1,
    "account_item_name": "売上",
    "tax_code": 1,
    "item_id": 1,
    "item_name": "freee会計",
    "section_id": 1,
    "section_name": "開発部",
    "tag_ids": [
      1
    ],
    "tag_names": [
      "メモタグ"
    ],
    "segment_1_tag_id": 1,
    "segment_1_tag_name": "セグメント１",
    "segment_2_tag_id": 1,
    "segment_2_tag_name": "セグメント２",
    "segment_3_tag_id": 1,
    "segment_3_tag_name": "セグメント３"
  }`;
};

describe('freee-api/InvoiceContent', () => {
  test('isInvoiceContent', () => {
    const dummy = JSON.parse(dummyInvoiceContent());
    const expected = isInvoiceContent(dummy);
    expect(expected).toBeTruthy();
    const expected2 = isInvoiceContent(null);
    expect(expected2).toBeFalsy();
    const expected3 = isInvoiceContent({});
    expect(expected3).toBeFalsy();
  });
  test('InvoiceContent', () => {
    const expected = InvoiceContent(
      1,
      1,
      'normal',
      1,
      '個',
      1,
      108000,
      8000,
      true,
      '備考',
      1,
      '売上',
      1,
      1,
      'freee会計',
      1,
      '開発部',
      [1],
      ['メモタグ']
    );
    expect(expected.id).toBe(1);
    expect(expected.order).toBe(1);
    expect(expected.type).toBe('normal');
    expect(expected.qty).toBe(1);
    expect(expected.unit).toBe('個');
    expect(expected.unit_price).toBe(1);
    expect(expected.amount).toBe(108000);
    expect(expected.vat).toBe(8000);
    expect(expected.reduced_vat).toBeTruthy();
    expect(expected.description).toBe('備考');
    expect(expected.account_item_id).toBe(1);
    expect(expected.account_item_name).toBe('売上');
    expect(expected.tax_code).toBe(1);
    expect(expected.item_id).toBe(1);
    expect(expected.item_name).toBe('freee会計');
    expect(expected.section_id).toBe(1);
    expect(expected.section_name).toBe('開発部');
    expect(expected.tag_ids[0]).toBe(1);
    expect(expected.tag_names[0]).toBe('メモタグ');
  });
});
