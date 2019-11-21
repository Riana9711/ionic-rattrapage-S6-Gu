import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {SQLite, SQLiteObject} from '@ionic-native/sqlite/ngx';
import {SQLitePorter} from '@ionic-native/sqlite-porter/ngx';
import {BaseModel} from '../models/basemodel';

@Injectable({
  providedIn: 'root'
})
export class BaseServiceService {

  private apiURL = 'https://ecole-api-nov2019.herokuapp.com/api/';

  private db: SQLiteObject;


  constructor(private http: HttpClient, private sqLite: SQLite, private sqlitePorter: SQLitePorter) {
  }

  public save(bm: BaseModel) {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.post(this.apiURL + 'save/' + bm.class, bm, {headers})
        .pipe(map(res => {
          return res;
        }));
  }

  public saveAll(bms: Array<BaseModel>) {
    const headers = new HttpHeaders({
      'content-type': 'application/json;charset=UTF-8',
    });
    return this.http.post(this.apiURL + 'saveAll', bms, {headers})
        .pipe(map((res) => {
          return res;
        }));
  }

  public update(bm: BaseModel) {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.put(this.apiURL + bm.class + '/' + bm.id, bm, {headers})
        .pipe(map((res: BaseModel) => {
          return res;
        }));
  }

  public delete(bm: BaseModel) {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.delete(this.apiURL + bm.class + '/' + bm.id, {headers})
        .pipe(map((res: Response) => {
          return res;
        }));
  }

  public findByID(bm: BaseModel) {
    const headers = new HttpHeaders({
      'content-type': 'application/json;charset=UTF-8',
    });
    return this.http.get(this.apiURL + bm.class + '/' + bm.id, {headers})
        .pipe(map(res => {
          return res;
        }));
  }

  public findAll(bm: BaseModel, columnOrder: string, order: string) {
    console.log('debut');
    return this.http.get(this.apiURL + 'findAll/' + bm.class + '/' + columnOrder + '/' + order)
        .pipe(map((res: BaseModel[]) => {
          console.log(res);
          return res;
        }));
  }

  // tslint:disable-next-line:ban-types
  public singleFiltre(bm: BaseModel, colonne: string, value: Object) {
    const headers = new HttpHeaders({
      'content-type': 'application/json;charset=UTF-8',
    });
    console.log(this.apiURL + bm.class, {headers});
    return this.http.get(this.apiURL + 'singleFiltre/' + bm.class + '/' + colonne + '/' + value, {headers})
        .pipe(map((res: BaseModel) => {
          return res;
        }));
  }

  // tslint:disable-next-line:ban-types
  public filter(bm: BaseModel, colonne: string, value: Object, columnOrder: string, order: string) {
    const headers = new HttpHeaders({
      'content-type': 'application/json;charset=UTF-8',
    });
    return this.http.get(this.apiURL + 'filter/' + bm.class + '/' + colonne + '/' + value + '/' + columnOrder + '/' + order, {headers})
        .pipe(map((res: BaseModel[]) => {
          return res;
        }));
  }

  // tslint:disable-next-line:ban-types
  public manyFilter(bm: BaseModel, colonneEQ: Array<string>, valeurEQ: Array<Object>,
                    // tslint:disable-next-line:ban-types
                    colonneNE: Array<string>, valeurNE: Array<Object>, columnOrder: string, order: string): Promise<BaseModel[]> {
    const donne: Array<object> = [colonneEQ, valeurEQ, colonneNE, valeurNE];
    const headers = new HttpHeaders({
      'content-type': 'application/json;charset=UTF-8',
    });
    return this.http.post(this.apiURL + 'manyFilter/' + bm.class + '/' + columnOrder + '/' + order, donne, {headers})
        .pipe(map((res: BaseModel[]) => {
          return res;
        })).toPromise();
  }

  // tslint:disable-next-line:ban-types
  public orFilter(bm: BaseModel, colonneEQ: Array<string>, valeurEQ: Array<Object>, colonneNE: Array<string>,
                  // tslint:disable-next-line:ban-types
                  valeurNE: Array<Object>, columnOrder: string, order: string) {
    const donne: Array<object> = [colonneEQ, valeurEQ, colonneNE, valeurNE];
    const headers = new HttpHeaders({
      'content-type': 'application/json;charset=UTF-8',
    });
    return this.http.post(this.apiURL + 'orFilter/' + bm.class + '/' + columnOrder + '/' + order, donne, {headers})
        .pipe(map((res: BaseModel[]) => {
          return res;
        }));
  }

  public count(bm: BaseModel) {
    const headers = new HttpHeaders({
      'content-type': 'application/json;charset=UTF-8',
    });
    return this.http.get(this.apiURL + 'count/' + bm.class, {headers})
        .pipe(map((res: number) => {
          return res;
        }));
  }

  // tslint:disable-next-line:ban-types
  public filterCount(bm: BaseModel, colonne: string, value: Object) {
    const headers = new HttpHeaders({
      'content-type': 'application/json;charset=UTF-8',
    });
    return this.http.get(this.apiURL + 'filterCount/' + bm.class + '/' + colonne + '/' + value, {headers})
        .pipe(map((res: number) => {
          return res;
        }));
  }

  // tslint:disable-next-line:ban-types
  public manyFilterCount(bm: BaseModel, colonneEQ: Array<string>, valeurEQ: Array<Object>,
                         // tslint:disable-next-line:ban-types
                         colonneNE: Array<string>, valeurNE: Array<Object>) {
    const donne: Array<object> = [colonneEQ, valeurEQ, colonneNE, valeurNE];
    const headers = new HttpHeaders({
      'content-type': 'application/json;charset=UTF-8',
    });
    return this.http.post(this.apiURL + 'manyFilterCount/' + bm.class, donne, {headers})
        .pipe(map((res: number) => {
          return res;
        }));
  }

  public createDataBase() {
    this.sqLite.create({
      name: 'simRegister.db',
      location: 'default'
    }).then((data: SQLiteObject) => {
      try {
        this.db = data;
        console.log('definiiiiiiiiiiiiiii');
        this.seedDatabase();
      } catch (e) {
        //this.notificationService.setValuesAndShow('Erreur', 'Chargement de la base local échoué', 'error');
      }
    }).catch(err => {
      //this.notificationService.setValuesAndShow('Erreur', 'Chargement de la base local échoué', 'error');
    })
    ;
  }

  seedDatabase() {
    this.http.get('assets/sqLiteGenerator.sql', {responseType: 'text'})
        .subscribe(sql => {
          this.sqlitePorter.importSqlToDb(this.db, sql)
              .then(_ => {
                //this.notificationService.setValuesAndShow('Base de donnée', 'Chargement réussi', 'succes');
              })
              .catch(e => console.error(e));
        });
  }

  getAll(bm: BaseModel) {
    this.db.executeSql('SELECT * FROM ' + bm.class, [])
        .then((res) => {
          const rowData = [];
          if (res.rows.length > 0) {
            for (let i = 0; i < res.rows.length; i++) {
              rowData.push(res.rows.item(i));
            }
          }
          return rowData;
        })
        .catch(e => {
          alert('error ' + JSON.stringify(e));
        });
  }

}
