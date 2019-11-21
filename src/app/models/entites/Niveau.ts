import {BaseModel} from '../basemodel';


export class Niveau extends BaseModel {
    libelle: string;

    constructor() {
        super();
        this.class = 'niveau';
    }
}
