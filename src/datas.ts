export type Locale = 'en' | 'ja';

export interface UserProperty {
  readonly clientId: string;
  readonly clientSecret: string;
}
export const UserProperty = (clientId: string, clientSecret: string) => ({
  clientId,
  clientSecret,
});

export interface Me {
  readonly user: User;
}
export const Me = (me: User) => ({me});
export const isMe = (arg: any): arg is Me => {
  if (arg === undefined || arg === null) return false;
  if ('user' in arg) {
    const user = arg.user;
    return isUser(user);
  }
  return false;
};

export interface User {
  readonly id: number;
  readonly email: string;
  readonly display_name: string;
  readonly first_name: string;
  readonly last_name: string;
  readonly first_name_kana: string;
  readonly last_name_kana: string;
  readonly companies?: Company[];
}
export const User = (
  id: number,
  email: string,
  display_name?: string,
  first_name?: string,
  last_name?: string,
  first_name_kana?: string,
  last_name_kana?: string,
  companies?: Company[]
) => ({
  id,
  email,
  display_name,
  first_name,
  last_name,
  first_name_kana,
  last_name_kana,
  companies,
});
export const isUser = (arg: any): arg is User => {
  if (arg === undefined || arg === null) return false;
  if ('id' in arg && 'email' in arg) {
    if ('companies' in arg) {
      const companies = arg.companies;
      return Array.isArray(companies) && companies.every(e => isCompany(e));
    } else {
      return true;
    }
  }
  return false;
};

export interface Companies {
  readonly companies: Company[];
}
export const Companies = (companies: Company[]) => ({companies});
export const isCompanies = (arg: any): arg is Companies => {
  if (arg === undefined || arg === null) return false;
  if ('companies' in arg) {
    const companies = arg.companies;
    return Array.isArray(companies) && companies.every(e => isCompany(e));
  }
  return false;
};

export interface Company {
  readonly id: number;
  readonly display_name: string;
  readonly role: string;
  readonly name?: string;
  readonly name_kana?: string;
  readonly use_custom_role?: boolean;
  readonly advisor_id?: number;
}
export const Company = (
  id: number,
  display_name: string,
  role: string,
  name?: string,
  name_kana?: string,
  use_custom_role?: boolean,
  advisor_id?: number
) => ({id, display_name, role, name, name_kana, use_custom_role, advisor_id});
export const isCompany = (arg: any): arg is Company => {
  if (arg === undefined || arg === null) return false;
  if ('id' in arg && 'display_name' in arg && 'role' in arg) {
    return true;
  }
  return false;
};

export interface Invoices {
  readonly invoices: Invoice[];
}
export const Invoices = (invoices: Invoices[]) => ({invoices});
export const isInvoices = (arg: any): arg is Invoices => {
  if (arg === undefined || arg === null) return false;
  if ('invoices' in arg) {
    const invoices = arg.invoices;
    return Array.isArray(invoices) && invoices.every(e => isInvoice(e));
  }
  return false;
};

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
  readonly invoice_status: string;
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
export const Invoice = (
  id: number,
  company_id: number,
  issue_date: string,
  partner_id: number,
  invoice_number: string,
  total_amount: number,
  invoice_status: string,
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
export const isInvoice = (arg: any): arg is Invoice => {
  if (arg === undefined || arg === null) return false;
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

export interface InvoiceContent {
  readonly id: string;
  readonly order: string;
  readonly type: string;
  readonly qty: number;
  readonly unit: string;
  readonly unit_price: number;
  readonly amount: number;
  readonly vat: number;
  readonly reduced_vat: boolean;
  readonly description: string;
  readonly account_item_id: number;
  readonly account_item_name: string;
  readonly tax_code: number;
  readonly item_id: number;
  readonly item_name: string;
  readonly section_id: number;
  readonly section_name: string;
  readonly tag_ids: number[];
  readonly tag_names: string[];
  readonly segment_1_tag_id?: number;
  readonly segment_1_tag_name?: string;
  readonly segment_2_tag_id?: number;
  readonly segment_2_tag_name?: string;
  readonly segment_3_tag_id?: number;
  readonly segment_3_tag_name?: string;
}
export const InvoiceContent = (
  id: string,
  order: string,
  type: string,
  qty: number,
  unit: string,
  unit_price: number,
  amount: number,
  vat: number,
  reduced_vat: boolean,
  description: string,
  account_item_id: number,
  account_item_name: string,
  tax_code: number,
  item_id: number,
  item_name: string,
  section_id: number,
  section_name: string,
  tag_ids: number[],
  tag_names: string[],
  segment_1_tag_id?: number,
  segment_1_tag_name?: string,
  segment_2_tag_id?: number,
  segment_2_tag_name?: string,
  segment_3_tag_id?: number,
  segment_3_tag_name?: string
) => ({
  id,
  order,
  type,
  qty,
  unit,
  unit_price,
  amount,
  vat,
  reduced_vat,
  description,
  account_item_id,
  account_item_name,
  tax_code,
  item_id,
  item_name,
  section_id,
  section_name,
  tag_ids,
  tag_names,
  segment_1_tag_id,
  segment_1_tag_name,
  segment_2_tag_id,
  segment_2_tag_name,
  segment_3_tag_id,
  segment_3_tag_name,
});
export const isInvoiceContent = (arg: any): arg is Invoice => {
  if (arg === undefined || arg === null) return false;
  if (
    'id' in arg &&
    'order' in arg &&
    'type' in arg &&
    'qty' in arg &&
    'unit' in arg &&
    'unit_price' in arg &&
    'amount' in arg &&
    'vat' in arg &&
    'reduced_vat' in arg &&
    'description' in arg &&
    'account_item_id' in arg &&
    'account_item_name' in arg &&
    'tax_code' in arg &&
    'item_id' in arg &&
    'item_name' in arg &&
    'section_id' in arg &&
    'section_name' in arg &&
    'tag_ids' in arg &&
    'tag_names' in arg
  ) {
    const tag_ids = arg.tag_ids;
    const tag_names = arg.tag_names;
    return (
      Array.isArray(tag_ids) &&
      tag_ids.every(e => typeof e === 'number') &&
      Array.isArray(tag_names) &&
      tag_names.every(e => typeof e === 'string')
    );
  }
  return false;
};

export interface TotalAmountPerVatRate {
  readonly vat_5: number;
  readonly vat_8: number;
  readonly reduced_vat_8: number;
  readonly vat_10: number;
}
export const TotalAmountPerVatRate = (
  vat_5: number,
  vat_8: number,
  reduced_vat_8: number,
  vat_10: number
) => ({
  vat_5,
  vat_8,
  reduced_vat_8,
  vat_10,
});
export const isTotalAmountPerVatRate = (
  arg: any
): arg is TotalAmountPerVatRate => {
  if (arg === undefined || arg === null) return false;
  if (
    'vat_5' in arg &&
    'vat_8' in arg &&
    'reduced_vat_8' in arg &&
    'vat_10' in arg
  ) {
    return true;
  }
  return false;
};
