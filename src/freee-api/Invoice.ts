import {InvoiceContent, isInvoiceContent} from './InvoiceContent';
import {
  isTotalAmountPerVatRate,
  TotalAmountPerVatRate,
} from './TotalAmountPerVatRate';

export const INVOICE_STATUS_JA = {
  draft: '下書き',
  applying: '申請中',
  remanded: '差し戻し',
  rejected: '却下',
  approved: '承認済み',
  submitted: '送付済み',
  unsubmitted: '送付待ち',
};

export type InvoiceStatus =
  | 'draft'
  | 'applying'
  | 'remanded'
  | 'rejected'
  | 'approved'
  | 'submitted'
  | 'unsubmitted';

export interface Invoice {
  readonly id: number;
  readonly company_id: number;
  readonly issue_date: string;
  readonly partner_id: number;
  readonly partner_code?: string;
  readonly invoice_number: string;
  readonly title?: string;
  readonly due_date?: string;
  readonly total_amount: number;
  readonly total_vat?: number;
  readonly sub_total?: number;
  readonly booking_date?: string;
  readonly description?: string;
  readonly invoice_status: InvoiceStatus;
  readonly payment_status?: string;
  readonly payment_date?: string;
  readonly web_published_at?: string;
  readonly web_downloaded_at?: string;
  readonly web_confirmed_at?: string;
  readonly mail_sent_at?: string;
  readonly posting_status: string;
  readonly partner_name?: string;
  readonly partner_display_name?: string;
  readonly partner_title?: string;
  readonly partner_prefecture_code?: number;
  readonly partner_prefecture_name?: string;
  readonly partner_address1?: string;
  readonly partner_address2?: string;
  readonly partner_contact_info?: string;
  readonly company_name: string;
  readonly company_zipcode?: string;
  readonly company_prefecture_code?: number;
  readonly company_prefecture_name?: string;
  readonly company_address1?: string;
  readonly company_address2?: string;
  readonly company_contact_info?: string;
  readonly payment_type: string;
  readonly payment_bank_info?: string;
  readonly message?: string;
  readonly notes?: string;
  readonly invoice_layout: string;
  readonly tax_entry_method: string;
  readonly deal_id?: number;
  readonly invoice_contents: InvoiceContent[];
  readonly total_amount_per_vat_rate: TotalAmountPerVatRate;
}

export const isInvoice = (arg: any): arg is Invoice => {
  // eslint-disable-next-line eqeqeq
  if (arg == null) return false;
  if (
    'id' in arg &&
    'company_id' in arg &&
    'issue_date' in arg &&
    'partner_id' in arg &&
    'invoice_number' in arg &&
    'total_amount' in arg &&
    'invoice_status' in arg &&
    'posting_status' in arg &&
    'company_name' in arg &&
    'payment_type' in arg &&
    'invoice_layout' in arg &&
    'tax_entry_method' in arg &&
    'invoice_contents' in arg &&
    'total_amount_per_vat_rate' in arg
  ) {
    const invoice_contents = arg.invoice_contents;
    const total_amount_per_vat_rate = arg.total_amount_per_vat_rate;
    return (
      Array.isArray(invoice_contents) &&
      invoice_contents.every(e => isInvoiceContent(e)) &&
      isTotalAmountPerVatRate(total_amount_per_vat_rate)
    );
  }
  return false;
};

export const Invoice = (
  id: number,
  company_id: number,
  issue_date: string,
  partner_id: number,
  invoice_number: string,
  total_amount: number,
  invoice_status: InvoiceStatus,
  posting_status: string,
  company_name: string,
  payment_type: string,
  invoice_layout: string,
  tax_entry_method: string,
  invoice_contents: InvoiceContent[],
  total_amount_per_vat_rate: TotalAmountPerVatRate,
  partner_code?: string,
  title?: string,
  due_date?: string,
  total_vat?: number,
  sub_total?: number,
  booking_date?: string,
  description?: string,
  payment_status?: string,
  payment_date?: string,
  web_published_at?: string,
  web_downloaded_at?: string,
  web_confirmed_at?: string,
  mail_sent_at?: string,
  partner_name?: string,
  partner_display_name?: string,
  partner_title?: string,
  partner_prefecture_code?: number,
  partner_prefecture_name?: string,
  partner_address1?: string,
  partner_address2?: string,
  partner_contact_info?: string,
  company_zipcode?: string,
  company_prefecture_code?: number,
  company_prefecture_name?: string,
  company_address1?: string,
  company_address2?: string,
  company_contact_info?: string,
  payment_bank_info?: string,
  message?: string,
  notes?: string,
  deal_id?: number
) => ({
  id,
  company_id,
  issue_date,
  partner_id,
  invoice_number,
  total_amount,
  invoice_status,
  posting_status,
  company_name,
  payment_type,
  invoice_layout,
  tax_entry_method,
  invoice_contents,
  total_amount_per_vat_rate,
  partner_code,
  title,
  due_date,
  total_vat,
  sub_total,
  booking_date,
  description,
  payment_status,
  payment_date,
  web_published_at,
  web_downloaded_at,
  web_confirmed_at,
  mail_sent_at,
  partner_name,
  partner_display_name,
  partner_title,
  partner_prefecture_code,
  partner_prefecture_name,
  partner_address1,
  partner_address2,
  partner_contact_info,
  company_zipcode,
  company_prefecture_code,
  company_prefecture_name,
  company_address1,
  company_address2,
  company_contact_info,
  payment_bank_info,
  message,
  notes,
  deal_id,
});
