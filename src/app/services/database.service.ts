import { Injectable } from '@angular/core';
import {IonDatetime, Platform} from "@ionic/angular";
import {BehaviorSubject, Observable} from "rxjs";
import {SQLite, SQLiteObject} from "@ionic-native/sqlite/ngx";
import {HttpClient} from "@angular/common/http";
import {SQLitePorter} from "@ionic-native/sqlite-porter/ngx";
import {Etudiant} from '../models/entites/Etudiant';


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

  etudiants: BehaviorSubject<Etudiant[]> = new BehaviorSubject([]);
  //products = new BehaviorSubject([]);

  constructor(private plt: Platform, private sqlitePorter: SQLitePorter, private sqlite: SQLite, private http: HttpClient) {
    this.plt.ready().then(() => {
      this.sqlite.create({
        name: 'GU3.db',
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
                this.loadEtudiants();
               // this.loadProducts();
                this.dbReady.next(true);
              })
              .catch(e => console.error(e));
        });
  }

  getDatabaseState() {
    return this.dbReady.asObservable();
  }

  getEtudiants(): Observable<Etudiant[]> {
    return this.etudiants.asObservable();
  }
/*
  getProducts(): Observable<any[]> {
    return this.products.asObservable();
  }
*/
  private loadEtudiants() {
    return this.database.executeSql('SELECT * FROM etudiant where etat = 1', []).then(data => {
      let etudiants: Etudiant[] = [];

      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          /*
          let skills = [];
          if (data.rows.item(i).skills != '') {
            skills = JSON.parse(data.rows.item(i).skills);
          }
          */
          let etudiant: Etudiant = new Etudiant();
              etudiant.id = data.rows.item(i).id;
              etudiant.name = data.rows.item(i).name;
              etudiant.age = data.rows.item(i).age;
              etudiant.pdp = data.rows.item(i).pdp;
              etudiant.etat = data.rows.item(i).etat;
              etudiants.push(etudiant);
        }
      }
      this.etudiants.next(etudiants);
    });
  }
  addEtudiant(etudiant: Etudiant) {
    //let data = [name, JSON.stringify(skills), img];
    console.log(etudiant.pdp);

    let data = [etudiant.name, etudiant.email, etudiant.contact, etudiant.age, etudiant.pdp, 1];
    return this.database.executeSql('INSERT INTO Etudiant (name, email, contact, age, pdp, etat) VALUES (?, ?, ?, ?, ?, ?)', data).then(data => {
      this.loadEtudiants();
    });
  }

  getEtudiant(id): Promise<Etudiant> {
    return this.database.executeSql('SELECT * FROM etudiant WHERE id = ?', [id]).then(data => {

      let etudiant: Etudiant = new Etudiant();
      etudiant.id = data.rows.item(0).id;
      etudiant.name = data.rows.item(0).name;
      etudiant.email = data.rows.item(0).email;
      etudiant.contact = data.rows.item(0).contact;
      etudiant.age = data.rows.item(0).age;
      etudiant.pdp = data.rows.item(0).pdp;
      etudiant.etat = data.rows.item(0).etat;

      return etudiant;
    });
  }

  findEtudiantByName(name): Promise<Etudiant[]> {
    console.log("a recherche "+name);
    return this.database.executeSql('SELECT * FROM etudiant where etat = 1 and name like ?', ['%' + name + '%']).then(data => {
      let etudiants: Etudiant[] = [];

      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {

          let etudiant: Etudiant = new Etudiant();
          etudiant.id = data.rows.item(i).id;
          etudiant.name = data.rows.item(i).name;
          etudiant.email = data.rows.item(i).email;
          etudiant.contact = data.rows.item(i).contact;
          etudiant.age = data.rows.item(i).age;
          etudiant.pdp = data.rows.item(i).pdp;
          etudiant.etat = data.rows.item(i).etat;
          etudiants.push(etudiant);
        }
      }
      console.log(etudiants);
      return etudiants;
    });
  }

  findEtudiantByAge(min, max): Promise<Etudiant[]> {
    return this.database.executeSql('SELECT * FROM etudiant where etat = 1 and age < ? and age > ?', [max, min]).then(data => {
      let etudiants: Etudiant[] = [];

      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {

          let etudiant: Etudiant = new Etudiant();
          etudiant.id = data.rows.item(i).id;
          etudiant.name = data.rows.item(i).name;
          etudiant.email = data.rows.item(i).email;
          etudiant.contact = data.rows.item(i).contact;
          etudiant.age = data.rows.item(i).age;
          etudiant.pdp = data.rows.item(i).pdp;
          etudiant.etat = data.rows.item(i).etat;
          etudiants.push(etudiant);
        }
      }
      console.log(etudiants);
      return etudiants;
    });
  }

  deleteEtudiant(id) {
    return this.database.executeSql('update etudiant set etat= 0 WHERE id = ? ', [id]).then(_ => {
      this.loadEtudiants();
      //this.loadProducts();
    });
  }

  updateEtudiant(dev: Etudiant) {
   // let data = [dev.name, JSON.stringify(dev.skills), dev.img];
    let data = [dev.name, dev.email, dev.contact, dev.age, dev.pdp];
    return this.database.executeSql(`UPDATE etudiant SET name = ?, email = ?, contact = ?, age = ?, pdp = ? WHERE id = ${dev.id}`, data).then(data => {
      this.loadEtudiants();
    });
  }
}
