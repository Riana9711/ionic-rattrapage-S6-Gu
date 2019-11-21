import {BaseModel} from '../basemodel';


export class EtudiantHasNiveau extends BaseModel {
    etudiantId: number;
    niveauId: number;
    annee: string;

    constructor() {
        super();
        this.class = 'etudianthasniveau';
    }
}
