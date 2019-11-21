import {Component, OnInit} from '@angular/core';
import {DatabaseService} from '../../services/database.service';
import {Etudiant} from '../../models/entites/Etudiant';

@Component({
    selector: 'app-search',
    templateUrl: './search.page.html',
    styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

    selectedView = 'simple';
    ageMin: number = 0;
    ageMax: number = 0;
    searchSimple = null;
    etudiants: Etudiant[];

    constructor(private db: DatabaseService) {
    }

    ngOnInit() {
    }

    search_simple(event) {

        this.db.getDatabaseState().subscribe(rdy => {
            if (rdy) {
                console.log(event.target.value);
                this.db.findEtudiantByName(event.target.value).then(data => {
                    this.etudiants = data;
                    console.log(this.etudiants);
                });
                //this.products = this.db.getProducts();
            }
        });
    }

    checkMinMax(event) {
        if (this.ageMax < this.ageMin) {
            this.ageMax = this.ageMin;
        }
    }

    searchMulti() {
        if (this.ageMax < this.ageMin) {
            this.ageMax = this.ageMin;
        }

        this.db.getDatabaseState().subscribe(rdy => {
            if (rdy) {
                this.db.findEtudiantByAge(this.ageMin, this.ageMax).then(data => {
                    this.etudiants = data;
                    console.log(this.etudiants);
                });
                //this.products = this.db.getProducts();
            }
        });
    }

}
