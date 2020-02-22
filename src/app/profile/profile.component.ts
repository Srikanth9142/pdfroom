import { Component, OnInit } from '@angular/core';
import { LoginComponent } from 'src/app/login/login.component';
import { DataService }from 'src/app/services/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  //userprofile:any;
  userprofile={
    name: "srikanth tumpudi",
    email: "srikanthtumpudi1999@gmail.com",
    image: "https://lh3.googleusercontent.com/a-/AAuE7mAgfandfhcSWfuyvmSruBaKwERtnZIdiZTLUxuSPi0=s96-c"
  }
  constructor(private dataService:DataService) { }
  // getUserDetails(){
  //   this.dataService.get_userDetails().subscribe(userdetails=>{
  //     this.userprofile = userdetails;
  //   });
  // }
  ngOnInit() {
      //this.getUserDetails();
  }

}
