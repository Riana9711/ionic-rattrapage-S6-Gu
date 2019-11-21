import { Injectable } from '@angular/core';
import {IonDatetime, Platform} from "@ionic/angular";
import {BehaviorSubject, Observable} from "rxjs";
import {SQLite, SQLiteObject} from "@ionic-native/sqlite/ngx";
import {HttpClient} from "@angular/common/http";
import {SQLitePorter} from "@ionic-native/sqlite-porter/ngx";
import {Etudiant} from './models/entites/Etudiant';

export interface Vue_register {
  firstname: string;
  lastname: string;
  date: Date;
  cinid: string;
  cinimage: string;
  customerimage: string;
  active: boolean;
  receiverid: number;
  profile: string;
  receivername: string;
  email: string;
  receiveron: boolean;
  operatorid: number;
  operatorname: string;
  prefix: string;
  operatoron: boolean;
  numeroid: number;
  sufix: string;
  numeroactive: boolean;
}
export interface Vue_numero {
  operatorid: number;
  operatorname: string;
  prefix: string;
  sufix: string;
  operatoron: boolean;
  active: boolean;
}

export interface Numero {
  operator: number;
  sufix: string;
  active: boolean;
}

export interface Operator {

  name: string;
  prefix: string;
  active: boolean;
}

export interface Receiver {

  profile: string;
  name: string;
  email: string;
  password: string;
  active: boolean;
}

export interface Register {

  receiver: number;
  numero: number;
  date: Date;
  firstname: string;
  lastname: string;
  cinid: string;
  cinimage: string;
  customerimage: string;
  active: boolean;
}



@Injectable({
  providedIn: 'root'
})


export class LocalService {

  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  operators: BehaviorSubject<Operator[]> = new BehaviorSubject([]);
  numeros: BehaviorSubject<Numero[]> = new BehaviorSubject([]);
  receivers: BehaviorSubject<Receiver[]> = new BehaviorSubject([]);
  registers: BehaviorSubject<Register[]> = new BehaviorSubject([]);
  vue_Numeros: BehaviorSubject<Vue_numero[]> = new BehaviorSubject([]);
  vue_Registers: BehaviorSubject<Vue_register[]> = new BehaviorSubject([]);

  constructor(private plt: Platform, private sqlitePorter: SQLitePorter, private sqlite: SQLite, private http: HttpClient) {
    this.plt.ready().then(() => {
      this.sqlite.create({
        name: 'base.db',
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
                this.loadOperators();
                this.loadNumeros();
                this.loadReceivers();
                this.loadRegisters();
                this.loadVue_numeros();
                this.loadVue_registers();
                this.dbReady.next(true);
              })
              .catch(e => console.error(e));
        });
  }

  getDatabaseState() {
    return this.dbReady.asObservable();
  }

  getOperators(): Observable<Operator[]> {
    return this.operators.asObservable();
  }
  getNumeros(): Observable<Numero[]> {
    return this.numeros.asObservable();
  }
  getReceivers(): Observable<Receiver[]> {
    return this.receivers.asObservable();
  }
  getRegisters(): Observable<Register[]> {
    return this.registers.asObservable();
  }
  getVue_numeros(): Observable<Vue_numero[]> {
    return this.vue_Numeros.asObservable();
  }
  geVue_registers(): Observable<Vue_register[]> {
    return this.vue_Registers.asObservable();
  }

  private loadOperators() {
    return this.database.executeSql('SELECT * FROM operator', []).then(data => {

      let operators: Operator[] = [];

      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          /*
          let skills = [];
          if (data.rows.item(i).skills != '') {
            skills = JSON.parse(data.rows.item(i).skills);
          }
          */
          let operator: Operator = new Operator();
          operator.name = data.rows.item(i).name;
          operator.prefix = data.rows.item(i).prefix;
          operator.active = data.rows.item(i).active;
          operators.push(operator);
        }
      }
      this.operators.next(operators);
    });
  }
  private loadRegisters() {
    return this.database.executeSql('SELECT * FROM register', []).then(data => {

      let registers: Register[] = [];

      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          /*
          let skills = [];
          if (data.rows.item(i).skills != '') {
            skills = JSON.parse(data.rows.item(i).skills);
          }
          */
          let register: Register = new Register();
          register.receiver = data.rows.item(i).receiver;
          register.numero = data.rows.item(i).numero;
          register.date = data.rows.item(i).date;
          register.firstname = data.rows.item(i).firstname;
          register.lastname = data.rows.item(i).lastname;
          register.cinid = data.rows.item(i).cinid;
          register.cinimage = data.rows.item(i).cinimage;
          register.customerimage = data.rows.item(i).customerimage;
          register.active = data.rows.item(i).active;
          registers.push(register);
        }
      }
      this.registers.next(registers);
    });
  }

  private loadReceivers() {
    return this.database.executeSql('SELECT * FROM receiver', []).then(data => {

      let receivers: Receiver[] = [];

      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {

          let receiver: Receiver = new Receiver();
          receiver.profile = data.rows.item(i).profile;
          receiver.name = data.rows.item(i).name;
          receiver.email = data.rows.item(i).email;
          receiver.password = data.rows.item(i).password;
          receiver.active = data.rows.item(i).active;
          receivers.push(receiver);
        }
      }
      this.receivers.next(receivers);
    });
  }

  private loadNumeros() {
    return this.database.executeSql('SELECT * FROM numero', []).then(data => {

      let numeros: Numero[] = [];

      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {

          let numero: Numero = new Numero();
          numero.number = data.rows.item(i).number;
          numero.sufix = data.rows.item(i).sufix;
          numero.active = data.rows.item(i).active;
          numeros.push(numero);
        }
      }
      this.numeros.next(numeros);
    });
  }
  private loadVue_numeros () {
    return this.database.executeSql('SELECT * FROM Vue_numero', []).then(data => {

      let vue_numeros: Vue_numero[] = [];

      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {

          let vue_numero: Vue_numero = new Vue_numero();
          vue_numero.operatorid = data.rows.item(i).operatorid;
          vue_numero.operatorname = data.rows.item(i).operatorname;
          vue_numero.prefix = data.rows.item(i).prefix;
          vue_numero.sufix = data.rows.item(i).sufix;
          vue_numero.operatoron = data.rows.item(i).operatoron;
          vue_numero.active = data.rows.item(i).active;
          vue_numeros.push(vue_numero);
        }
      }
      this.vue_Numeros.next(vue_numeros);
    });
  }

  private loadVue_registers() {
    return this.database.executeSql('SELECT * FROM Vue_register', []).then(data => {

      let vue_registers: Vue_register[] = [];

      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {

          let vue_register: Vue_register = new Vue_register();
          vue_register.firstname = data.rows.item(i).firstname;
          vue_register.lastname = data.rows.item(i).lastname;
          vue_register.date = data.rows.item(i).date;
          vue_register.cinid = data.rows.item(i).cinid;
          vue_register.cinimage = data.rows.item(i).cinimage;
          vue_register.customerimage = data.rows.item(i).customerimage;
          vue_register.active = data.rows.item(i).active;
          vue_register.receiverid = data.rows.item(i).receiverid;
          vue_register.profile = data.rows.item(i).profile;
          vue_register.receivername = data.rows.item(i).receivername;
          vue_register.email = data.rows.item(i).email;
          vue_register.receiveron = data.rows.item(i).receiveron;
          vue_register.operatorid = data.rows.item(i).operatorid;
          vue_register.operatorname = data.rows.item(i).operatorname;
          vue_register.prefix = data.rows.item(i).prefix;
          vue_register.operatoron = data.rows.item(i).operatoron;
          vue_register.numeroid = data.rows.item(i).numeroid;
          vue_register.sufix = data.rows.item(i).sufix;
          vue_register.numeroactive = data.rows.item(i).numeroactive;

          vue_registers.push(vue_register);
        }
      }
      this.vue_Registers.next(vue_registers);
    });
  }

  addRegister(register: Register) {

    let data = [register.receiver, register.numero, register.date, register.firstname, register.lastname, register.cinid, register.cinimage, register.customerimage, register.active];
    return this.database.executeSql('INSERT INTO register (receiver, numero, date, firstname, lastname, cinid, cinimage, customerimage, active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', data).then(data => {
      this.loadRegisters();
    });
  }
}
