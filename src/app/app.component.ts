import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pdfroom';
  constructor(private route:Router){}

  home(){
    this.route.navigate(['/login']);
  }
  viewlist(){
    this.route.navigate(['/list']);
  }
  viewProfile(){
    this.route.navigate(['/profile']);
  }
}
