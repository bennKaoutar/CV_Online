import { defaultsDeep } from 'lodash';

export class Mail {
    nameSender: string;
    emailSender: string;
    emailReceiver: string;
    subject: string;
    message: string;

    constructor(mail?: Partial<Mail>) {
        defaultsDeep(this, mail);
    }
}
