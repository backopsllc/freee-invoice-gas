import {Invoice} from './Invoice';

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
