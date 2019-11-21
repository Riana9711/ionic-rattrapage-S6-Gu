import {Component, OnInit} from '@angular/core';
import {AuthentificationService} from '../../services/authentification.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    constructor(private authService: AuthentificationService, private router: Router) {
    }

    ngOnInit() {
    }

    seConnecter(user) {
        this.authService.login(user.username, user.password);
        console.log('authentificated3 =' + this.authService.authentificated );
        console.log('=>'+this.authService.isAuthenticated());

    }

}
