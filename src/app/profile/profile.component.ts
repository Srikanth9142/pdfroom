import { Component, OnInit } from '@angular/core';
import { LoginComponent } from 'src/app/login/login.component';
import { DataService }from 'src/app/services/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userprofile:any;
  constructor(private dataService:DataService) { }
  getUserDetails(){
    this.dataService.get_userDetails().subscribe(userdetails=>{
      this.userprofile = userdetails;
    });
  }
  ngOnInit() {
      this.getUserDetails();
  }

}
