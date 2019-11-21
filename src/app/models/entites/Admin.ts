import {BaseModel} from '../basemodel';


export class Admin extends BaseModel {
    name: string;
    password: string;

    constructor() {
        super();
        this.class = 'admin';
    }
}
