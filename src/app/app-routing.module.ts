import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PdflistComponent } from './pdflist/pdflist.component';
import { PdfreaderComponent }from './pdfreader/pdfreader.component';
import { ProfileComponent }from './profile/profile.component';
import { ShelfComponent } from './shelf/shelf.component';
import {AuthGuardGuard} from './guards/auth-guard.guard';
const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'list',component:PdflistComponent,canActivate:[AuthGuardGuard]},
  {path:'view/:id',component:PdfreaderComponent,canActivate:[AuthGuardGuard]},
  {path:'profile',component:ProfileComponent,canActivate:[AuthGuardGuard]},
  {path:'shelf',component:ShelfComponent,canActivate:[AuthGuardGuard]},
  {path:'**',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
