export type Locale = 'en' | 'ja';

export interface UserProperty {
  readonly clientId: string;
  readonly clientSecret: string;
}

export const UserProperty = (clientId: string, clientSecret: string) => ({
  clientId,
  clientSecret,
});
