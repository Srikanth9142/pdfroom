import { Component, OnInit } from '@angular/core';
import { AuthService,GoogleLoginProvider } from 'angular-6-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  title="Sign in with Google";
	user:any;
  constructor(private socialAuthService: AuthService) { }
  public socialSignIn(platform:string):void{
  	platform = GoogleLoginProvider.PROVIDER_ID;

  	this.socialAuthService.signIn(platform).then((response)=>{
  		console.log(platform+ "logged in user data=",response);

  		this.user = response;
  	}
  	);
  }

  public signOut():void{
  	this.socialAuthService.signOut();
    console.log("user log out");
    this.user = 0;
  }

  public userDetails(){
    return this.user;
  }
  ngOnInit() {
  }

}
