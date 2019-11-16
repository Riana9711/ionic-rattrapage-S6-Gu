import { Component, OnInit } from '@angular/core';
import {DatabaseService, User} from "../services/database.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  users: User[] = [];

//  products: Observable<any[]>;

  user = {};
  //product = {};

  selectedView = 'users';

  constructor(private db: DatabaseService) { }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getUsers().subscribe(devs => {
          this.users = devs;
        })
        //this.products = this.db.getProducts();
      }
    });
  }

  addUser() {
    //let skills = this.developer['skills'].split(',');
    //skills = skills.map(skill => skill.trim());

    this.db.addUser(this.user['name'], this.user['bornAt'], this.user['img'])
        .then(_ => {
          this.user = {};
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
