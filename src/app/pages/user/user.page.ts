import { Component, OnInit } from '@angular/core';
import {DatabaseService, User} from "../../services/database.service";
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import {Etudiant} from '../../models/entites/Etudiant';
import { ToastController } from '@ionic/angular';
import { canvasToBlob } from 'blob-util';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  etudiants: Etudiant[] = [];

//  products: Observable<any[]>;

  //user = {};
  etudiantNew: Etudiant = new Etudiant();
  etudiantSelected: Etudiant;

  image: any = '';

  //product = {};

  selectedView = 'inscription';

  constructor(private db: DatabaseService, private camera: Camera, private toast: ToastController) { }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getEtudiants().subscribe(devs => {
          this.etudiants = devs;
        })
        //this.products = this.db.getProducts();
      }
    });
  }

  addEtudiant() {
    //let skills = this.developer['skills'].split(',');
    //skills = skills.map(skill => skill.trim());

    this.db.addEtudiant(this.etudiantNew)
        .then(async _ => {
          this.etudiantNew = new Etudiant();
          this.image = '';

          let toast = await this.toast.create({
            message: 'Etudiant added',
            duration: 3000
          });
          toast.present();
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
      this.image = (window as any).Ionic.WebView.convertFileSrc(imageData);
      this.etudiantNew.pdp = this.image;
    }, (err) => {
      // Handle error
      alert('error ' + JSON.stringify(err));
    });

  }

  /*addProduct() {
    this.db.addProduct(this.product['name'], this.product['creator'])
        .then(_ => {
          this.product = {};
        });
  }
  */
}
