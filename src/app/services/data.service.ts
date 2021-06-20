import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import {ShelfBooks } from '../models/shelfbooks';
import { UserProfile } from '../models/userprofile';
import { LikedBooks } from '../models/likedbooks';
import { Comment } from '../models/comment';
import { BookDetails } from '../models/BookDetails';
import { ReadListBook } from '../models/ReadListBook';
import { Notes } from '../models/Notes';
import { ProcessHttpmsgService } from '../services/process-httpmsg.service';
import { HttpClient, HttpHeaders,HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { v4 as uuid4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  book:Observable<Book[]>;
  userprofile:UserProfile[];
  //corsfreeheaders=new Headers();
  //corsfreeheaders.append('Access-Control-Allow-Origin', '*');
  //private userdetails:any;
  constructor(private http:HttpClient, private processHTTPMsgService: ProcessHttpmsgService) { }

  get_books():Observable<Book[]>{
    //working fine

    return this.http.get<Book[]>(`${environment.serverurl}/shelf/list`).pipe(
     map(a=> a.map(t=>{return new Book(t.bookid,t.name,t['fileUrl'],t['coverphoto'],t.author,t.category)})
     )
   );
  }

  // get_userDetails():Observable<any[]>{
  //   return of(this.userdetails);
  // }


  // store_user(user):void{
  //   this.userdetails = user; 
  //   console.log("in data service storing");
  //   console.log(this.userdetails);
  // }


  store_likes(bid:any):any{
    //working fine
    console.log("bid like saved: "+bid);
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
    }).pipe(catchError(this.processHTTPMsgService.handleError));
    //console.log("like saved");
    //console.log(bid);
  }
  
  addToShelf(bid:any){
    var token = localStorage.getItem('id_token');
    token = token.substring(1,token.length-1);
    var data={
      id_token:token,
      bookid:bid,
    }
    return this.http.post(`${environment.serverurl}/shelf/savetoshelf`,data,
    {
      headers: new HttpHeaders({
        "Content-Type": 'application/JSON'
     })
    }).pipe(catchError(this.processHTTPMsgService.handleError));
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
  viewShelfBooks():Observable<ShelfBooks[]>{
    var token = localStorage.getItem('id_token');
    token = token.substring(1,token.length-1);
    return this.http.get<ShelfBooks[]>(
      `${environment.serverurl}/shelf/getshelf/`+token).pipe(
        map(a=>a.map(t=>{return new ShelfBooks(t.bookid)}))
      );
  }

  deleteBookFromShelf(bookid: number){
    var token = localStorage.getItem('id_token');
    token = token.substring(1,token.length-1);
    var data={
      id_token:token,
      book_id:bookid,
    }
    return this.http.post(`${environment.serverurl}/shelf/deleteBookFromShelf`,data,
    {
      headers: new HttpHeaders({
        "Content-Type": 'application/JSON'
     })
    }).pipe(catchError(this.processHTTPMsgService.handleError));
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

  //active session or session epxire checking from the server
  // checksession(token){
  //   return this.http.get(`${environment.serverurl}/shelf/checksession/`+token,{responseType:'json'});
  // }
  
  //return type must be boolean 
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
      map(a=>a.map(t=>{return new UserProfile(t.name,t.email,t.photoid,t.points)})) 
    )
  }

  // get_liked_to_components():Observable<LikedBooks[]>{
  //   return this.likedbookarr;
  // }

  get_book():Observable<Book[]>{ //doubt not using

    return this.book;
  }

  view_comments(bookId:number):Observable<Comment[]>{
    return this.http.get<Comment[]>(
      `${environment.serverurl}/shelf/viewcomments/`+bookId).pipe(
        map(a=>a.map(t=>{return new Comment(t['comment_id'],t['email'],t['user_name'],t['message'],t['upvotes'],t['bookid'])}))
      );
  }

  viewBookDetails(bookId:number):Observable<BookDetails[]>{
    return this.http.get<BookDetails[]>(
      `${environment.serverurl}/shelf/viewbook/`+bookId).pipe(
        map(a=>a.map(t=>{return new BookDetails(t['bookid'],t['name'],t['coverphoto'],t['author'],t['category'],t['likes_per_book'])}))
      );
  }

  reviewUpvote(commentId:string):any{
    console.log("upvaote called");
    var token = localStorage.getItem('id_token');
    token = token.substring(1,token.length-1);
    var data={
      comment_id:commentId,
      id_token: token
    }
    //shelf/saveuser
    return this.http.post(`${environment.serverurl}/shelf/addupvote`,data,{
      headers: new HttpHeaders({
        "Content-Type": 'application/JSON'
     })
    }).pipe(catchError(this.processHTTPMsgService.handleError));
  }

  addComment(bookId:number,message:string):any{
    const commentId:string = uuid4();
    var token = localStorage.getItem('id_token')
    token = token.substring(1,token.length-1);
    var data= {
      comment_id: commentId,
      bookid: bookId,
      message: message,
      id_token: token
    }
    return this.http.post(`${environment.serverurl}/shelf/addcomment`,data,{
      headers: new HttpHeaders({
        "Content-Type": 'application/JSON'
     })
    }).pipe(catchError(this.processHTTPMsgService.handleError));
  }

  /**
   * @description Method to add Book into ReadList. Sends POST request
   * 
   * @param bookId: Id of the book need to add into ReadList
   */
  addToReadList(bookId: number){
    console.log("addToReadList called");
    var token = localStorage.getItem('id_token');
    token = token.substring(1,token.length-1);
    var data={
      id_token:token,
      book_id:bookId,
    }
    return this.http.post(`${environment.serverurl}/shelf/saveToReadList`,data,
    {
      headers: new HttpHeaders({
        "Content-Type": 'application/JSON'
     })
    }).pipe(catchError(this.processHTTPMsgService.handleError));

  }

  /**
   * @description Method to view the books in ReadList. Sends GET request
   * 
   */
  viewReadList():Observable<ReadListBook[]>{
    var token = localStorage.getItem('id_token');
    token = token.substring(1,token.length-1);
    return this.http.get<ReadListBook[]>(
      `${environment.serverurl}/shelf/getReadList/`+token).pipe(
        map(a=>a.map(t=>{return new ReadListBook(t['bookid'], t['readlist_name'], t['book_coverphoto'])})), catchError(this.processHTTPMsgService.handleError)
      );
  }

  /**
   * @description Method to delete Book from ReadList. Sends POST request
   * 
   * @param bookId: Id of the book need to delete from Readlist
   */
  deleteBookFromReadList(bookId: number){
    console.log("deleteBookFromReadList called");
    var token = localStorage.getItem('id_token');
    token = token.substring(1,token.length-1);
    var data={
      id_token:token,
      book_id:bookId,
    }
    return this.http.post(`${environment.serverurl}/shelf/readListBookDelete`,data,
    {
      headers: new HttpHeaders({
        "Content-Type": 'application/JSON'
     })
    }).pipe(catchError(this.processHTTPMsgService.handleError));

  }

  /**
   * @description Method to fetch all comments made by the user from backend
   */
  fetchAllCommentsOfUser():Observable<Comment[]>{
    var token = localStorage.getItem('id_token');
    token = token.substring(1,token.length-1);
    return this.http.get<Comment[]>(
      `${environment.serverurl}/shelf/viewCommentsByUser/`+token).pipe(
        map(a=>a.map(t=>{return new Comment(t['comment_id'],t['email'],t['user_name'],t['message'],t['upvotes'],t['bookid'])})
        ), catchError(this.processHTTPMsgService.handleError)
      );
    }

    /**
     * @description Method to save User Notes for a Book
     * 
     * @param bookId: Id of the book for which notes need to save
     * @param body: Text which is in form of HTML which need to save as notes body
     */
    saveNotes(bookId:number, body:string){
      console.log("deleteBookFromReadList called");
      var token = localStorage.getItem('id_token');
      token = token.substring(1,token.length-1);
      var data={
        id_token:token,
        book_id:bookId,
        body:body
      }
      return this.http.post(`${environment.serverurl}/shelf/saveNotes`,data,
      {
        headers: new HttpHeaders({
          "Content-Type": 'application/JSON'
       })
      }).pipe(catchError(this.processHTTPMsgService.handleError));
    }

    /**
     * @description Method which fetches Notes for a Book from Backend
     * @param bookId Id of the book for which notes need to display
     */
    viewNotes(bookId:number):Observable<Notes[]>{
      console.log("viewNotes called");
      var token = localStorage.getItem('id_token');
      token = token.substring(1,token.length-1);
      return this.http.get<Notes[]>(
        `${environment.serverurl}/shelf/viewNotes/`+token+"/"+bookId).pipe(
          map(a=>a.map(t=>{return new Notes(t['bookid'], t['email'], t['body'])})
          ), catchError(this.processHTTPMsgService.handleError)
        );

    }

    /**
     * @description Method which deletes the user created Notes for a Book
     * @param bookId Id of the book for which notes need to delete.
     */
    deleteNotes(bookId:number){
      console.log("deleteNotes called");
      var token = localStorage.getItem('id_token');
      token = token.substring(1,token.length-1);
      var data={
        id_token:token,
        book_id:bookId
      }
      return this.http.post(`${environment.serverurl}/shelf/deleteNotes`,data,
      {
        headers: new HttpHeaders({
          "Content-Type": 'application/JSON'
       })
      }).pipe(catchError(this.processHTTPMsgService.handleError));
    }

    /**
     * @description Method which filters the readers based on the user name
     * @param userName - Search key entered by the user
     */
    searchUserProfile(userName: string){
      console.log("service username: "+userName);
      return this.http.get<UserProfile[]>(`${environment.serverurl}/shelf/filterprofiles/`+userName).pipe(
        map(a=>a.map(t=>{return new UserProfile(t['name'],t['email'],t['photoid'],t['points'])})) 
      )
    }

    /**
     * @description Method which get UserProfile based on userName
     * @param userName - user name of the user for which user to be fetched
     */
    getProfileByUserName(userName: string){
      return this.http.get<UserProfile[]>(`${environment.serverurl}/shelf/getprofile/`+userName).pipe(
        map(a=>a.map(t=>{return new UserProfile(t['name'],t['email'],t['photoid'],t['points'])})) 
      )
    }

    /**
   * @description Method to fetch all comments made by another user from backend
   * @param userName - user name of user
   */
  fetchAllCommentsOfAnotherUser(userName:string):Observable<Comment[]>{
    return this.http.get<Comment[]>(
      `${environment.serverurl}/shelf/getcomments/`+userName).pipe(
        map(a=>a.map(t=>{return new Comment(t['comment_id'],t['email'],t['user_name'],t['message'],t['upvotes'],t['bookid'])})
        ), catchError(this.processHTTPMsgService.handleError)
      );
    }

    /**
     * @description Method to fetch liked books of user
     * @param userName - username of user
     */
    viewLikedBooksOfUser(userName: string):Observable<LikedBooks[]>{
      return this.http.get<LikedBooks[]>(
        `${environment.serverurl}/shelf/userlikedbooks/`+userName).pipe(
          map(a=>a.map(t=>{return new LikedBooks(t.bookid)}))
        );
        
    }

}

