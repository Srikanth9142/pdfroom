 import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { DataService } from './services/data.service';
import { UserProfile } from './models/userprofile';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Virtaul Book-Shelf';
  searchKey:string = "";
  profileList: UserProfile[];
  openResults:boolean = false;
  constructor(private route:Router, private dataService: DataService){}

  home(){
    this.route.navigate(['/login']);
  }
  viewlist(){
    this.route.navigate(['/list']);
  }
  viewProfile(){
    this.route.navigate(['/profile']);
  }
  loginRedirect(){
    this.route.navigate(['/login']);
  }
  goToReadList(){
    this.route.navigate(['/readlist']);
  }
  searchUsers(event: Event){
    //console.log(this.searchKey+" "+event.);
      console.log("click submit: "+this.searchKey);
      this.dataService.searchUserProfile(this.searchKey).subscribe((data)=>{
        console.log("response=")
        this.profileList = data;
        console.log(this.profileList);
        this.openResults = true;
      })
  }

  goToProfile(userName: string){
    this.route.navigate(['/profile', userName]);
  }
}
