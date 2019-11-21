import {BaseModel} from '../basemodel';


export class Etudiant extends BaseModel {
    name: string;
    email: string;
    contact: string;
    age: number;
    pdp: string;
    etat: number;

    constructor() {
        super();
        this.class = 'etudiant';
    }
}
