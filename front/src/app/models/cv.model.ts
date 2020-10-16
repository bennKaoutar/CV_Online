import { defaultsDeep } from 'lodash';
import { Url } from 'url';
import {User} from './user.model';

export class Cv {
    id: number;
    user: string;
    education: string;
    experience: string;
    skills: string;
    languages: string;
    activities: string;
    fb:string;
    git:string;
    in:string;

    constructor(cv?: Partial<Cv>) {
        defaultsDeep(this, cv);
    }
}