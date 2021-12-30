import {Company, isCompany} from './Company';

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

export const isUser = (arg: any): arg is User => {
  // eslint-disable-next-line eqeqeq
  if (arg == null) return false;
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
