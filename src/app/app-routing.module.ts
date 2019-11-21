import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {
  AuthGuardService as AuthGuard
} from './auth/auth-guard-service.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./pages/list/list.module').then(m => m.ListPageModule)
  },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule'},
  { path: 'user', loadChildren: './pages/user/user.module#UserPageModule', canActivate : [AuthGuard]},
  { path: 'fiche/:id', loadChildren: './pages/fiche/fiche.module#FichePageModule', canActivate : [AuthGuard]},
  { path: 'modif/:id', loadChildren: './pages/modif/modif.module#ModifPageModule', canActivate : [AuthGuard]},
  { path: 'search', loadChildren: './pages/search/search.module#SearchPageModule'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
