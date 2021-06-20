import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { UserProfile } from '../models/userprofile';
import { Comment } from '../models/comment';
import { Router } from '@angular/router';
import { Book } from '../models/book';
import { LikedBooks } from '../models/likedbooks';

@Component({
  selector: 'app-searchprofile',
  templateUrl: './searchprofile.component.html',
  styleUrls: ['./searchprofile.component.scss']
})
export class SearchprofileComponent implements OnInit {
  userName: string;
  userProfile: UserProfile;
  commentsMadeByUser: Comment[];
  books:Book[]=[];
  likedbooks:LikedBooks[]=[];
  //loaded:boolean = false;

  constructor(private route:ActivatedRoute, private dataService:DataService, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap=>{
      this.userName = paramMap.get('username');
      console.log("username:"+this.userName);
      this.reload();
    });  
  }

  getBookNameById(bookId: number):string{
    return this.books[bookId-1].name;
  }
  
  viewBookDetails(bookId: number){
    this.router.navigate(['/details',bookId]);
  }

  reload(){
    this.dataService.getProfileByUserName(this.userName).subscribe((data)=>{
      this.userProfile = data[0];
    });

    this.dataService.get_books().subscribe(d=>{
      this.books = d;
    });
    
    
    this.dataService.fetchAllCommentsOfAnotherUser(this.userName).subscribe((data)=>{
      this.commentsMadeByUser = data;
      console.log("Comments made by user");
    });

    this.dataService.viewLikedBooksOfUser(this.userName).subscribe(d=>{
      this.likedbooks = d;
    });
  }

}
