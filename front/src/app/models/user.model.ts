import { defaultsDeep } from 'lodash';

export class User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
  idCv: number

  constructor(user?: Partial<User>) {
    defaultsDeep(this, user);
  }
}
