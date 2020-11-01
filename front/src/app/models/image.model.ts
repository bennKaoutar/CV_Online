import { defaultsDeep } from 'lodash';

export class Image {
    id: number;
    name: string;
    type: string;
    pic: string;

    constructor(img?: Partial<Image>) {
        defaultsDeep(this, img);
    }
}