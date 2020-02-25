import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { UserProfile } from '../models/userprofile';
import { LikedBooks } from '../models/likedbooks';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  book:Observable<Book[]>;
  likedbookarr:Observable<LikedBooks[]>;
  userprofile:UserProfile[];
  private userdetails:any;
  constructor(private http:HttpClient) { }

  get_books():Observable<Book[]>{
    //console.log("In data service");
    this.book = this.http.get<Book[]>(
   'http://127.0.0.1:8000/shelf/list').pipe(
     map(a=> a.map(t=>{return new Book(t.bookid,t.name,t['file'],t['coverphoto'],t.author,t.category,t.likes)})
     )
   );
   //console.log(this.book); 
   return this.book;
  }

 

  store_user(user):void{
    this.userdetails = user; 
    console.log("in data service storing");
    console.log(this.userdetails);
  }

  get_userDetails():Observable<any[]>{
    return of(this.userdetails);
  }

  store_likes(email:string,bid:any):any{
    var data={
      email:email,
      bookid:bid,
    }
    return this.http.post('http://127.0.0.1:8000/shelf/like',data,
    {
      headers: new HttpHeaders({
        "Content-Type": 'application/JSON'
     })
    });
    //console.log("like saved");
    //console.log(bid);
  }

  viewlikedbooks():Observable<LikedBooks[]>{
    var token = localStorage.getItem('id_token');
    token = token.substring(1,token.length-1);
    this.likedbookarr = this.http.get<LikedBooks[]>(
      'http://127.0.0.1:8000/shelf/getlike/'+token).pipe(
        map(a=>a.map(t=>{return new LikedBooks(t.bookid)}))
      );
      return this.likedbookarr;

  }

  sendUser(token:string):any{
    var data={
      id_token:token,
    }
    return this.http.post('http://127.0.0.1:8000/shelf/saveuser',data,{
      headers: new HttpHeaders({
        "Content-Type": 'application/JSON'
     })
    });
  }
  isLoggedIn(){
    return !!localStorage.getItem('id_token');
  }
  getUserProfile():Observable<UserProfile[]>{
    var token = localStorage.getItem('id_token');
    token = token.substring(1,token.length-1);
    console.log(token);
    return this.http.get<UserProfile[]>('http://127.0.0.1:8000/shelf/getuser/'+token).pipe(
      map(a=>a.map(t=>{return new UserProfile(t.name,t.email,t.photoid)}))
    );

  }

  get_liked_to_components():Observable<LikedBooks[]>{
    return this.likedbookarr;
  }

  get_book():Observable<Book[]>{

    return this.book;
  }
  
}

