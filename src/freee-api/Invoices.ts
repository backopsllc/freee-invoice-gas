import {Invoice, isInvoice} from './Invoice';

export interface Invoices {
  readonly invoices: Invoice[];
}

export const isInvoices = (arg: any): arg is Invoices => {
  // eslint-disable-next-line eqeqeq
  if (arg == null) return false;
  if ('invoices' in arg) {
    const invoices = arg.invoices;
    return Array.isArray(invoices) && invoices.every(e => isInvoice(e));
  }
  return false;
};

export const Invoices = (invoices: Invoices[]) => ({invoices});
