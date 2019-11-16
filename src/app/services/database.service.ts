import { Injectable } from '@angular/core';
import {IonDatetime, Platform} from "@ionic/angular";
import {BehaviorSubject, Observable} from "rxjs";
import {SQLite, SQLiteObject} from "@ionic-native/sqlite/ngx";
import {HttpClient} from "@angular/common/http";
import {SQLitePorter} from "@ionic-native/sqlite-porter/ngx";


export interface User {
  id: number,
  name: string,
  bornAt: Date,
  img: string
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  users = new BehaviorSubject([]);
  //products = new BehaviorSubject([]);

  constructor(private plt: Platform, private sqlitePorter: SQLitePorter, private sqlite: SQLite, private http: HttpClient) {
    this.plt.ready().then(() => {
      this.sqlite.create({
        name: 'GU.db',
        location: 'default'
      })
          .then((db: SQLiteObject) => {
            this.database = db;
            this.seedDatabase();
          });
    });
  }

  seedDatabase() {
    this.http.get('assets/data.sql', { responseType: 'text'})
        .subscribe(sql => {
          this.sqlitePorter.importSqlToDb(this.database, sql)
              .then(_ => {
                this.loadUsers();
               // this.loadProducts();
                this.dbReady.next(true);
              })
              .catch(e => console.error(e));
        });
  }

  getDatabaseState() {
    return this.dbReady.asObservable();
  }

  getUsers(): Observable<User[]> {
    return this.users.asObservable();
  }
/*
  getProducts(): Observable<any[]> {
    return this.products.asObservable();
  }
*/
  private loadUsers() {
    return this.database.executeSql('SELECT * FROM user', []).then(data => {
      let users: User[] = [];

      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          /*
          let skills = [];
          if (data.rows.item(i).skills != '') {
            skills = JSON.parse(data.rows.item(i).skills);
          }
          */
          users.push({
            id: data.rows.item(i).id,
            name: data.rows.item(i).name,
            bornAt: data.rows.item(i).bornAt,
            img: data.rows.item(i).img
          });
        }
      }
      this.users.next(users);
    });
  }
  addUser(name, bornAt, img) {
    //let data = [name, JSON.stringify(skills), img];
    let data = [name, bornAt, img];
    return this.database.executeSql('INSERT INTO users (name, bornAt, img) VALUES (?, ?, ?)', data).then(data => {
      this.loadUsers();
    });
  }

  getUser(id): Promise<User> {
    return this.database.executeSql('SELECT * FROM user WHERE id = ?', [id]).then(data => {
      /*let skills = [];
      if (data.rows.item(0).skills != '') {
        skills = JSON.parse(data.rows.item(0).skills);
      }
      */
      return {
        id: data.rows.item(0).id,
        name: data.rows.item(0).name,
        bornAt:data.rows.item(0).bornAt,
        img: data.rows.item(0).img
      }
    });
  }

  deleteUser(id) {
    return this.database.executeSql('DELETE FROM user WHERE id = ?', [id]).then(_ => {
      this.loadUsers();
      //this.loadProducts();
    });
  }

  updateUser(dev: User) {
   // let data = [dev.name, JSON.stringify(dev.skills), dev.img];
    let data = [dev.name, dev.bornAt, dev.img];
    return this.database.executeSql(`UPDATE user SET name = ?, skills = ?, img = ? WHERE id = ${dev.id}`, data).then(data => {
      this.loadUsers();
    })
  }
}
