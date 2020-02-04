import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PdflistComponent } from './pdflist/pdflist.component';
import { PdfreaderComponent }from './pdfreader/pdfreader.component';
import { ProfileComponent }from './profile/profile.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'list',component:PdflistComponent},
  {path:'view/:id',component:PdfreaderComponent},
  {path:'profile',component:ProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
