import { defaultsDeep } from 'lodash';

export class Cv {
    id: number;
    user: string;
    education: string;
    experience: string;
    skills: string;
    languages: string;
    activities: string;
    fb: string;
    git: string;
    in: string;

    constructor(cv?: Partial<Cv>) {
        defaultsDeep(this, cv);
    }
}