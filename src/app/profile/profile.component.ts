import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginComponent } from 'src/app/login/login.component';
import { DataService }from 'src/app/services/data.service';
import { UserProfile } from '../models/userprofile';
import { take } from 'rxjs/operators';
import { LikedBooks } from '../models/likedbooks';
import { Book } from '../models/book';
import { ShelfBooks } from '../models/shelfbooks';
import { Comment } from '../models/comment';
import { NotificationService } from '../services/notification.service';
import { Router } from '@angular/router';
import { FollowingPerson } from '../models/followingPerson';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
 
  //userprofile:any;
  profileuser:UserProfile[]=[];
  books:Book[]=[];
  likedbooks:LikedBooks[]=[];
  shelfbooks:ShelfBooks[]=[];
  commentsMadeByUser: Comment[];
  followingList: FollowingPerson[]=[];
  bookslen:number=0;
  likedbookslen:number=0;
  shelfbookslen:number=0;
  displayedColumns: string[] = ['BookId', 'Name', 'Author'];
  dataSource = LikedBooks;
  constructor(private dataService:DataService, private router: Router, private notificationService: NotificationService) { 
    
  }
  ngOnInit() {
   
    this.dataService.getUserProfile().pipe(take(1)).subscribe(d=>{
      this.profileuser=d;
      //console.log(this.profileuser[0].photoid);
    },errMes=>{
      this.notificationService.notifyErrorMessageToUser(errMes);
    });
    this.dataService.get_books().pipe(take(1)).subscribe(d=>{
      this.books = d;
      this.bookslen = this.books.length;
      console.log("In profile:"+this.bookslen);
    }, errMess=>{
      this.notificationService.notifyErrorMessageToUser(errMess);
    });

    this.dataService.viewlikedbooks().pipe(take(1)).subscribe(d=>{
      this.likedbooks = d;
      console.log("In userliked books:"+d.length);
      this.likedbookslen = this.likedbooks.length;
      
    }, errMess=>{
      this.notificationService.notifyErrorMessageToUser(errMess);
    });

    this.dataService.viewShelfBooks().pipe(take(1)).subscribe(d=>{
      this.shelfbooks=d;
      this.shelfbookslen  = this.shelfbooks.length;
      console.log("In shelf books:"+this.shelfbookslen);
    }, errMess=>{
      this.notificationService.notifyErrorMessageToUser(errMess);
    });
    
    this.dataService.fetchAllCommentsOfUser().pipe(take(1)).subscribe((data)=>{
      this.commentsMadeByUser = data;
      console.log("Comments made by user");
    }, errMess=>{
      this.notificationService.notifyErrorMessageToUser(errMess);
    });
    
    this.dataService.viewFollowersList().subscribe((data)=>{
      console.log(data);
      this.followingList = data;
    },(errMes)=>{
      this.notificationService.notifyErrorMessageToUser(errMes);
    });
 
    
}

getBookNameById(bookId: number):string{
  return this.books[bookId-1].name;
}

viewBookDetails(bookId: number){
  this.router.navigate(['/details',bookId]);
}

}
