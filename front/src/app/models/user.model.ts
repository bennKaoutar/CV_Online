import { defaultsDeep } from 'lodash';

export class User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  hash: string;
  salt: string;
  idCv: number;
  idImage: number;
  idCustom: number

  constructor(user?: Partial<User>) {
    defaultsDeep(this, user);
  }
}
