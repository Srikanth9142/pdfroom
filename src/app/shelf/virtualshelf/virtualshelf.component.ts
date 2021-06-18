import { Component, OnInit,Input } from '@angular/core';
import { Book } from 'src/app/models/book';
import { DataService }from 'src/app/services/data.service';
import { MatDialogRef, MatDialog } from '@angular/material';
import {Router} from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { ADD_TO_READLIST_SUCCESS_MSG, SESSION_EXPIRED_USER_MSG } from 'src/app/constants';

@Component({
  selector: 'app-virtualshelf',
  templateUrl: './virtualshelf.component.html',
  styleUrls: ['./virtualshelf.component.scss']
})
export class VirtualshelfComponent implements OnInit {
  @Input() book:Book;

  constructor(private route:Router, private dataService:DataService,
    private notificationService: NotificationService, public dialogRef: MatDialogRef<MatDialog>) { }

  openBookDetails(bookID:string){
    console.log("closeDialog method called");
    this.route.navigate(['/details',bookID]);
    this.dialogRef.close("closed");
  }

  openBookToRead(bookId:string){
    console.log("closeDialog method called");
    this.route.navigate(['/view',bookId]);
    this.dialogRef.close("closed");
  }

  addBookToReadList(bookid: number){
    this.dataService.addToReadList(bookid).subscribe(()=>{
      this.notificationService.notifySuccessMessageToUser(ADD_TO_READLIST_SUCCESS_MSG);
    }, errMes=>{
      if(errMes == SESSION_EXPIRED_USER_MSG){
        this.notificationService.notifyErrorMessageToUser(errMes);
      }else{
        this.notificationService.notifyWarningMessageToUser(errMes);
      }
    });

    
  }

  ngOnInit() {
  }

  deleteBookFromShelf(bookid: number){
      this.dataService.deleteBookFromShelf(bookid).subscribe(()=>{

      }, errMes=>{
        if(errMes == SESSION_EXPIRED_USER_MSG){
          this.notificationService.notifyErrorMessageToUser(errMes);
        }else{
          this.notificationService.notifyWarningMessageToUser(errMes);
        }
      });
  }
}
