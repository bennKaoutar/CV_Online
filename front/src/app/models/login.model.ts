import { defaultsDeep } from 'lodash';

export class Login {
    mail: string;
    password: string;
      
    constructor(login?: Partial<Login>) {
      defaultsDeep(this, login);
    }
  }