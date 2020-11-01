import { defaultsDeep } from 'lodash';

export class Custom {
    id: number;
    banner: string;
    titles: string;

    constructor(custom?: Partial<Custom>) {
        defaultsDeep(this, custom);
    }
}
