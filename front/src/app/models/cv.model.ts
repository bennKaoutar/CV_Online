import { defaultsDeep } from 'lodash';

export class Cv {
    id: number;
    education: string;
    experience: string;
    skills: string;
    languages: string;
    activities: string;
    fb: string;
    git: string;
    linkedin: string;

    constructor(cv?: Partial<Cv>) {
        defaultsDeep(this, cv);
    }
}
