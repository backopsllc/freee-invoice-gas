import {isUser, User} from './User';

export interface Me {
  readonly user: User;
}

export const isMe = (arg: any): arg is Me => {
  // eslint-disable-next-line eqeqeq
  if (arg == null) return false;
  if ('user' in arg) {
    const user = arg.user;
    return isUser(user);
  }
  return false;
};

export const Me = (user: User) => ({user});
