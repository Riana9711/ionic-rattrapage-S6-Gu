import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Etudiant} from '../../models/entites/Etudiant';
import {DatabaseService} from '../../services/database.service';
import {ToastController} from '@ionic/angular';

@Component({
    selector: 'app-fiche',
    templateUrl: './fiche.page.html',
    styleUrls: ['./fiche.page.scss'],
})
export class FichePage implements OnInit {
    id = null;
    etudiant: Etudiant;

    constructor(private activatedRoute: ActivatedRoute, private db: DatabaseService, private toast: ToastController, private router: Router) {
    }

    ngOnInit() {
        this.id = this.activatedRoute.snapshot.paramMap.get('id');
        console.log('id fiche =' + this.id);

        this.db.getDatabaseState().subscribe(rdy => {
            if (rdy) {
                this.db.getEtudiant(this.id).then(data => {
                    this.etudiant = data;
                });
                //this.products = this.db.getProducts();
            }
        });
    }


    deleteFiche(id) {
        this.db.deleteEtudiant(id)
            .then(async _ => {
                this.etudiant = new Etudiant();

                this.router.navigateByUrl('/list');

                let toast = await this.toast.create({
                    message: 'Etudiant deleted',
                    duration: 3000
                });
                toast.present();


            });
    }


}
