import { Component, OnInit,Input } from '@angular/core';
import { Book } from 'src/app/models/book';
import { DataService }from 'src/app/services/data.service';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  @Input() book:Book;
  userprofile:any;
  constructor(private dataService:DataService,private snackbar:MatSnackBar) { }
  getUserDetails(){
    this.dataService.get_userDetails().subscribe(userdetails=>{
      this.userprofile = userdetails;
    });
  }

  send_like(event,bid:any){
    this.dataService.store_likes(this.userprofile.email,bid).subscribe(()=>{

    });
    this.snackbar.open('Added to liked books','Okay!!',{
      duration: 2000,
    });
    
  }

  ngOnInit() {
    this.getUserDetails();
  }

}
