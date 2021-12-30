import {Company, isCompany} from './Company';

export interface Companies {
  readonly companies: Company[];
}

export const isCompanies = (arg: any): arg is Companies => {
  // eslint-disable-next-line eqeqeq
  if (arg == null) return false;
  if ('companies' in arg) {
    const companies = arg.companies;
    return Array.isArray(companies) && companies.every(e => isCompany(e));
  }
  return false;
};

export const Companies = (companies: Company[]) => ({companies});
