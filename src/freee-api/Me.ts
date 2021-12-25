import {isUser, User} from './User';

export interface Me {
  readonly user: User;
}

export const isMe = (arg: any): arg is Me => {
  if (arg === undefined || arg === null) return false;
  if ('user' in arg) {
    const user = arg.user;
    return isUser(user);
  }
  return false;
};

export const Me = (me: User) => ({me});
