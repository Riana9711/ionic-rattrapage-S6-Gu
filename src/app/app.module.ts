import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from "@angular/common/http";
import {SQLitePorter} from "@ionic-native/sqlite-porter/ngx";
import {SQLite} from "@ionic-native/sqlite/ngx";
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import {JwtModuleOptions} from '@auth0/angular-jwt';
import {BaseServiceService} from './services/base-service.service';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
      SQLite,
      SQLitePorter,
      Camera,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    BaseServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
