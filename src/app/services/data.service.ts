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
  userprofile:UserProfile[];
  private userdetails:any;
  constructor(private http:HttpClient) { }

  get_books():Observable<Book[]>{
    //working fine
    return this.http.get<Book[]>(`${environment.serverurl}/shelf/list`
   ).pipe(
     map(a=> a.map(t=>{return new Book(t.bookid,t.name,t['fileUrl'],t['coverphoto'],t.author,t.category)})
     )
   );
  }

  get_userDetails():Observable<any[]>{
    return of(this.userdetails);
  }


  store_user(user):void{
    this.userdetails = user; 
    console.log("in data service storing");
    console.log(this.userdetails);
  }


  store_likes(bid:any):any{
    //working fine
    var token = localStorage.getItem('id_token');
    token = token.substring(1,token.length-1);
    var data={
      id_token:token,
      bookid:bid,
    }
    return this.http.post(`${environment.serverurl}/shelf/like`,data,
    {
      headers: new HttpHeaders({
        "Content-Type": 'application/JSON'
     })
    });
    //console.log("like saved");
    //console.log(bid);
  }

  viewlikedbooks():Observable<LikedBooks[]>{
    //working fine
    var token = localStorage.getItem('id_token');
    token = token.substring(1,token.length-1);
    return this.http.get<LikedBooks[]>(
      `${environment.serverurl}/shelf/getlike/`+token).pipe(
        map(a=>a.map(t=>{return new LikedBooks(t.bookid)}))
      );
      
  }

  sendUser(token:string):any{
    //working fine
    var data={
      id_token:token,
    }
    //shelf/saveuser
    return this.http.post(`${environment.serverurl}/shelf/saveuser`,data,{
      headers: new HttpHeaders({
        "Content-Type": 'application/JSON'
     })
    });
  }
  isLoggedIn(){
    return !!localStorage.getItem('id_token');
  }
  getUserProfile():Observable<UserProfile[]>{
    //working fine
    var token = localStorage.getItem('id_token');
    token = token.substring(1,token.length-1);
    //console.log(token);
    //shelf/getuser
    return this.http.get<UserProfile[]>(`${environment.serverurl}/shelf/getuser/`+token).pipe(
      map(a=>a.map(t=>{return new UserProfile(t.name,t.email,t.photoid)}))
    );

  }

  // get_liked_to_components():Observable<LikedBooks[]>{
  //   return this.likedbookarr;
  // }

  get_book():Observable<Book[]>{ //doubt not using

    return this.book;
  }

}

