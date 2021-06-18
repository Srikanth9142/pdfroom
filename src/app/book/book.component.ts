import { Component, OnInit,Input } from '@angular/core';
import { Book } from 'src/app/models/book';
import { DataService }from 'src/app/services/data.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { NotificationService } from '../services/notification.service';
import { SESSION_EXPIRED_USER_MSG, ADD_TO_SHELF_SUCCESS_MSG,
   LIKE_BOOK_SUCCESS_MSG, ADD_TO_READLIST_SUCCESS_MSG, EXISTING_BOOK_READLIST_ERROR } from '../constants';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  @Input() book:Book;
  messageFromServer:string;

  constructor(private dataService:DataService,private snackbar:MatSnackBar,
    private notificationService: NotificationService) { }
  
    /**
     * @description Method that process the User Book like Event and notify user about
     *              Success and Failure Messages
     * 
     * @param event: Button click event
     * @param bid: BookId of the book that user click the like button
     */
  sendLike(event, bid: any){
    this.dataService.store_likes(bid).subscribe(() => {
      console.log("Inside like method");
      this.notificationService.notifySuccessMessageToUser(LIKE_BOOK_SUCCESS_MSG);
    }, (errmess) => {
      this.messageFromServer = errmess;
      if(this.messageFromServer == SESSION_EXPIRED_USER_MSG){
        // session expired should be error message
        this.notificationService.notifyErrorMessageToUser(this.messageFromServer);
      }
      else{
        // Other Errors are Warnings to user
        this.notificationService.notifyWarningMessageToUser(this.messageFromServer);
      }

    });
    
  }

  /**
   * @description Method that process Add to shelf event and display user success and failure Messages
   * 
   * @param event Button click event
   * @param bid BookId of the book that user click the Add to shelf button
   */
  saveToShelf(event,bid:any){
    this.dataService.addToShelf(bid).subscribe(()=>{
      this.notificationService.notifySuccessMessageToUser(ADD_TO_SHELF_SUCCESS_MSG);
      }, (errmes)=>{
        console.log(errmes);
        this.messageFromServer = errmes;
        this.notificationService.notifyWarningMessageToUser(this.messageFromServer);
      });
  }
  
  /**
   * @description Methid that process Add to ReadList event and displays
   *              failure and success messages to users
   * 
   * @param event: Button click event
   * @param bid: BookId of the book that user want to add into ReadList
   */
  saveToReadList(event, bid:any){
    this.dataService.addToReadList(bid).subscribe(()=>{
      this.notificationService.notifySuccessMessageToUser(ADD_TO_READLIST_SUCCESS_MSG);
    }, errMess=>{
      if(errMess == EXISTING_BOOK_READLIST_ERROR){
        this.notificationService.notifyWarningMessageToUser(errMess);
      }else{
        this.notificationService.notifyErrorMessageToUser(errMess);
      }
    });
  }

  ngOnInit() {
    //this.getUserDetails();
  }

}
