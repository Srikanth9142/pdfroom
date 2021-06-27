 import { Component,OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService,GoogleLoginProvider } from 'angular-6-social-login';
import { DataService } from './services/data.service';
import { UserProfile } from './models/userprofile';
import { Book } from './models/book';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Virtaul Book-Shelf';
  searchKey:string = "";
  profileList: UserProfile[]=[];
  bookList: Book[] = [];
  openBookResults:boolean = false;
  openProfileResults:boolean = false;
  constructor(private socialAuthService: AuthService, private route:Router, private dataService: DataService){}

  public socialSignIn(platform:string):void{
  	platform = GoogleLoginProvider.PROVIDER_ID;

  	this.socialAuthService.signIn(platform).then((response)=>{
  		//console.log(platform+ "logged in user data=",response);

      //this.user = response;
      //this.exist=true;
      localStorage.setItem('id_token', JSON.stringify(response.idToken));
      this.dataService.sendUser(response.idToken).subscribe(()=>{

      });
    });
  }

  ngOninit(){
  }

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


  /**
   * @description Method that takes keyboard event and send username to backend on submit
   * @param event Keyboard event
   */
  searchUsers(event){
    //console.log(this.searchKey+" "+event.);
    this.openProfileResults = false;
      if(event.keyCode == 13){
        console.log("click submit: "+this.searchKey);
        this.dataService.searchUserProfile(this.searchKey).subscribe((data)=>{
          console.log("response=")
          this.profileList = data;
          console.log(this.profileList);
          this.openProfileResults = true;
        });
      }
  }

  /**
  * @description Method that keyboard event and send book name to backend on submit
  * @param event Keyboard event
  */
  searchBooks(event){
    this.openBookResults = false;
    if(event.keyCode == 13){
       console.log("click submit: "+this.searchKey);
       this.dataService.searchBooks(this.searchKey).subscribe((data)=>{
         console.log("response==");
         this.bookList = data;
         console.log(this.bookList);
         this.openBookResults = true;
       });
    }
  }

  /**
   * @description Method that redirects user to a particular user profile
   * @param userName Name of the user to whom user want to visit profile
   * 
   */
  goToProfile(userName: string){
    this.route.navigate(['/profile', userName]);
  }

 /**
 * @description Method that redirects user to selected book from results
 * @param bookId Id of the book user selected 
 */
  goToBook(bookId: number){
    this.route.navigate(['/details',bookId]);
  }

  /**
   * @description Method that removes Id token from localstorage and sign out
   */
  public signOut():void{
  	this.socialAuthService.signOut();
    console.log("user log out");
    //this.user = 0;
    localStorage.removeItem('id_token');
    localStorage.clear();
    this.route.navigate(['/login']);
    //this.dataService.store_user(null);
  }
    /**
     * @description Method that checks whether user login or not
     * 
     * @return boolean
     */
  IsUserloggedIn(){
    
    return this.dataService.isLoggedIn();
  }
}
