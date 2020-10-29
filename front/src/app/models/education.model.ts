import { defaultsDeep } from 'lodash';

export class Education {
    id: number;
    text: string;

    constructor(education?: Partial<Education>) {
        defaultsDeep(this, education);
    }
}
