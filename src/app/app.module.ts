import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PdflistComponent } from './pdflist/pdflist.component';
import { PdfreaderComponent } from './pdfreader/pdfreader.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule,MatIconModule } from '@angular/material';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { ProfileComponent } from './profile/profile.component';
import { SocialLoginModule,AuthServiceConfig,GoogleLoginProvider } from "angular-6-social-login";
import { ShelfComponent } from './shelf/shelf.component';
import { BookComponent } from './book/book.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs';
import { LikedbookstableComponent } from './likedbookstable/likedbookstable.component';
import {MatInputModule} from '@angular/material/input';
import { ChartsModule } from 'ng2-charts';
import { PiechartComponent } from './piechart/piechart.component';
  const client_id:string = '413051260737-ln0fa4c6v2g9t2fs0g7vcj1055550lfe.apps.googleusercontent.com';
    
  export function getAuthServiceConfigs() {
    let config = new AuthServiceConfig([
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider(client_id)
    }
  ]);

  return config;
  }


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PdflistComponent,
    PdfreaderComponent,
    ProfileComponent,
    ShelfComponent,
    BookComponent,
    LikedbookstableComponent,
    PiechartComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    SocialLoginModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSidenavModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
    NgxExtendedPdfViewerModule,
    FlexLayoutModule,
    MatListModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    ChartsModule



  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
