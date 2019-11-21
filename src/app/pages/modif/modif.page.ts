import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DatabaseService} from '../../services/database.service';
import {ToastController} from '@ionic/angular';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import {Etudiant} from '../../models/entites/Etudiant';

@Component({
  selector: 'app-modif',
  templateUrl: './modif.page.html',
  styleUrls: ['./modif.page.scss'],
})
export class ModifPage implements OnInit {
  id = null;
  image: any = '';
  etudiant: Etudiant;

  constructor(private activatedRoute: ActivatedRoute, private db: DatabaseService, private toast: ToastController,  private camera: Camera,  private router: Router) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('idUpdate =' + this.id);

    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getEtudiant(this.id).then(async data => {
          this.etudiant = data;
          console.log(this.etudiant);
        });
        //this.products = this.db.getProducts();
      }
    });
  }


  openCam() {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      // alert(imageData)
      this.image = (window as any).Ionic.WebView.convertFileSrc(imageData);
      this.etudiant.pdp = this.image;
    }, (err) => {
      // Handle error
      alert('error ' + JSON.stringify(err));
    });

  }

  saveChange() {
    console.log("update");
    console.log(this.etudiant);
    this.db.updateEtudiant(this.etudiant)
        .then(async _ => {
          this.router.navigateByUrl('/list');

          //this.etudiant = new Etudiant();
          let toast = await this.toast.create({
            message: 'Etudiant updated',
            duration: 3000
          });
          toast.present();

        });
  }

}
