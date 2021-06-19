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
import { MatFormFieldModule } from '@angular/material/form-field';
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
import {MatSelectModule} from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ChartsModule } from 'ng2-charts';
import { PiechartComponent } from './piechart/piechart.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatBadgeModule} from '@angular/material/badge';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { CategoryComponent } from './category/category.component';
import { environment } from 'src/environments/environment';
import {AngularFireModule} from '@angular/fire';
import { CommentComponent } from './comment/comment.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { ToastrModule } from 'ngx-toastr';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { VirtualshelfComponent } from './shelf/virtualshelf/virtualshelf.component';
import { ReadlistComponent } from './readlist/readlist.component';
import { SearchprofileComponent } from './searchprofile/searchprofile.component';

  const client_id:string = '343804261630-fs9851ibnqmp3js4hp90v4vis8khjkt3.apps.googleusercontent.com';
    
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
    CategoryComponent,
    CommentComponent,
    BookDetailComponent,
    VirtualshelfComponent,
    ReadlistComponent,
    SearchprofileComponent,
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
    MatSelectModule,
    ChartsModule,
    MatDialogModule,
    MatBadgeModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatMenuModule,
    MatExpansionModule,
    MatDividerModule,
    MatAutocompleteModule,
    MatGridListModule,
    AngularEditorModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    ToastrModule.forRoot()
  ],
  entryComponents: [ShelfComponent,],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
