import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginComponent } from 'src/app/login/login.component';
import { DataService }from 'src/app/services/data.service';
import { UserProfile } from '../models/userprofile';
import { take } from 'rxjs/operators';
import { LikedBooks } from '../models/likedbooks';
import { Book } from '../models/book';

//

//
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
 
  //userprofile:any;
  profileuser:UserProfile[];
  books:Book[];
  likedbooks:LikedBooks[];
  constructor(private dataService:DataService) { }

  ngOnInit() {
   
    this.dataService.getUserProfile().pipe(take(1)).subscribe(d=>{
      this.profileuser=d;
      //console.log(this.profileuser[0].photoid);
    });

    
}
}
