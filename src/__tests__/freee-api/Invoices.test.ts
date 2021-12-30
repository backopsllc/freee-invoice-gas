import {Invoices, isInvoices} from '../../freee-api/Invoices';

export const dummyInvoices = () => {
  return `{
    "invoices": [
      {
        "id": 101,
        "company_id": 1,
        "issue_date": "2019-12-17",
        "partner_id": 201,
        "partner_code": "code001",
        "invoice_number": "A001",
        "title": "請求書",
        "due_date": "2019-12-17",
        "total_amount": 108000,
        "total_vat": 8000,
        "sub_total": 100000,
        "booking_date": "2019-12-17",
        "description": "８月分請求書",
        "invoice_status": "draft",
        "payment_status": "",
        "payment_date": "2019-12-17",
        "web_published_at": "2019-12-17T19:00:00+09:00",
        "web_downloaded_at": "2019-12-17T19:00:00+09:00",
        "web_confirmed_at": "2019-12-17T19:00:00+09:00",
        "mail_sent_at": "2019-12-17T19:00:00+09:00",
        "posting_status": "unrequested",
        "partner_name": "freeeパートナー",
        "partner_display_name": "株式会社freeeパートナー",
        "partner_title": "御中",
        "partner_zipcode": "000-0000",
        "partner_prefecture_code": 4,
        "partner_prefecture_name": "秋田県",
        "partner_address1": "湯沢市",
        "partner_address2": "Aビル",
        "partner_contact_info": "営業担当",
        "company_name": "freee株式会社",
        "company_zipcode": "000-0000",
        "company_prefecture_code": 12,
        "company_prefecture_name": "東京都",
        "company_address1": "ＸＸ区ＸＸ１−１−１",
        "company_address2": "ビル1F",
        "company_contact_info": "法人営業担当",
        "payment_type": "transfer",
        "payment_bank_info": "ＸＸ銀行ＹＹ支店1111111",
        "message": "下記の通りご請求申し上げます。",
        "notes": "毎度ありがとうございます",
        "invoice_layout": "default_classic",
        "tax_entry_method": "exclusive",
        "deal_id": 0,
        "invoice_contents": [
          {
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
          }
        ],
        "total_amount_per_vat_rate": {
          "vat_5": 0,
          "vat_8": 108000,
          "reduced_vat_8": 0,
          "vat_10": 0
        }
      }
    ]
  }`;
};

describe('freee-api/Invoice', () => {
  test('isInvoices', () => {
    const dummy = JSON.parse(dummyInvoices());
    const expected = isInvoices(dummy);
    expect(expected).toBeTruthy();
    const expected2 = isInvoices(null);
    expect(expected2).toBeFalsy();
    const expected3 = isInvoices({});
    expect(expected3).toBeFalsy();
  });
  test('Invoices', () => {
    const dummy = JSON.parse(dummyInvoices());
    const invoices = Invoices(dummy.invoices);
    const expected = isInvoices(invoices);
    expect(expected).toBeTruthy();
  });
});
