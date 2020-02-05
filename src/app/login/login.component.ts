import { Component, OnInit } from '@angular/core';
import { AuthService,GoogleLoginProvider } from 'angular-6-social-login';
import { DataService }from 'src/app/services/data.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  title="Sign in with Google";
  user:any;
  exist:boolean = false;
  constructor(private socialAuthService: AuthService, private dataService:DataService) { }
  public socialSignIn(platform:string):void{
  	platform = GoogleLoginProvider.PROVIDER_ID;

  	this.socialAuthService.signIn(platform).then((response)=>{
  		//console.log(platform+ "logged in user data=",response);

      this.user = response;
      this.exist=true;
      if(this.exist){
        this.saveUser();
      }
    });
    
  }
  
 saveUser(){
 if(this.exist){
  this.dataService.store_user(this.user);

 }
}

  public signOut():void{
  	this.socialAuthService.signOut();
    console.log("user log out");
    this.user = 0;
    this.dataService.store_user(null);
  }



  public userDetails(){
    return this.user;
  }

  ngOnInit() {
  }

}
