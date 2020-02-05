import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  book:Observable<Book[]>;
  private userdetails:any;
  constructor(private http:HttpClient) { }

  get_books():Observable<Book[]>{
    //console.log("In data service");
    this.book = this.http.get<Book[]>(
   'http://127.0.0.1:8000/shelf/list').pipe(
     map(a=> a.map(t=>{return new Book(t.bookid,t.name,t['file'],t['coverphoto'],t.author,t.category)})
     )
   );
   //console.log(this.book); 
   return this.book;
  }

  get_book():Observable<Book[]>{

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

}
