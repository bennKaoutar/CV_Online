import { defaultsDeep } from 'lodash';

export class Mail {
    nameSender: string;
    emailSender: string;
    subject: string;
    message: number;

    constructor(mail?: Partial<Mail>) {
        defaultsDeep(this, mail);
    }
}
