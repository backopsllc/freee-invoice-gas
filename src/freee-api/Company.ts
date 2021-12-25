export const USER_ROLE_JA = {
  admin: '管理者',
  simple_accounting: '一般',
  self_only: '取引登録のみ',
  read_only: '閲覧のみ',
};

export type UserRole =
  | 'admin'
  | 'simple_accounting'
  | 'self_only'
  | 'read_only';

export interface Company {
  readonly id: number;
  readonly display_name: string;
  readonly role: UserRole;
  readonly name?: string;
  readonly name_kana?: string;
  readonly use_custom_role?: boolean;
  readonly advisor_id?: number;
}

export const isCompany = (arg: any): arg is Company => {
  if (arg === undefined || arg === null) return false;
  if ('id' in arg && 'display_name' in arg && 'role' in arg) {
    return true;
  }
  return false;
};

export const Company = (
  id: number,
  display_name: string,
  role: UserRole,
  name?: string,
  name_kana?: string,
  use_custom_role?: boolean,
  advisor_id?: number
) => ({id, display_name, role, name, name_kana, use_custom_role, advisor_id});
