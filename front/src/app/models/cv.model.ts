import { defaultsDeep } from 'lodash';
import {User} from './user.model';

export class Cv {
    id: number;
    user: string;
    education: string;
    experience: string;
    skills: string;
    languages: string;
    activities: string;

    constructor(cv?: Partial<Cv>) {
        defaultsDeep(this, cv);
    }
}