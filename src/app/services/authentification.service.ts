import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {BaseServiceService} from './base-service.service';
import {Etudiant} from '../models/entites/Etudiant';
import {Admin} from '../models/entites/Admin';
import {BaseModel} from '../models/basemodel';
import {Observable} from 'rxjs';
import {DatabaseService} from './database.service';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthentificationService {
    public authentificated: boolean;
    public token: string;


    constructor(public jwtHelper: JwtHelperService, private router: Router, private db: DatabaseService, private apiService: BaseServiceService) {
    }


    public isAuthenticated(): boolean {
        const token = localStorage.getItem('myToken');
        // Check whether the token is expired and return
        // true or false
        //return !this.jwtHelper.isTokenExpired(token);
        return this.authentificated;
    }

    login(username: string, password: string) {
        let admin: Admin = null;


        this.apiService.manyFilter(new Admin(), ['name', 'password'], [username, password], null, null, 'aucun', 'aucun').then( res => {
            console.log(res);
            let admins: Admin[] = res as Admin[];
            if (admins.length > 0) {
                admin = admins[0];
                console.log('admin = ' + admin.name);
                this.saveToken();
                this.authentificated = true;
                console.log('authentificated1 =' + this.authentificated );
            }
            else
                 this.authentificated = false;

            if (this.authentificated) {
                this.router.navigateByUrl('/home');
            } else {
                this.router.navigateByUrl('/login');
            }
           });
    }

    saveToken() {
        this.token = 'texteHaché';
        console.log(this.token);
        localStorage.setItem('myToken', this.token);
    }

    loadToken() {
        this.token = localStorage.getItem('myToken');
        this.authentificated = (this.token != null) ? true : false;
        return this.authentificated;
    }

    logout() {
        localStorage.removeItem('myToken');
        this.authentificated = false;
    }
}
