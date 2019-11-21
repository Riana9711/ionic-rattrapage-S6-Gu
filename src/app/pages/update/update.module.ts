import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UpdatePage } from './update.page';
import {FichePageModule} from '../fiche/fiche.module';

const routes: Routes = [
  {
    path: '',
    component: UpdatePage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        FichePageModule
    ],
  declarations: [UpdatePage]
})
export class UpdatePageModule {}
