import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { LikedBooks } from 'src/app/models/likedbooks';
import { Observable }from 'rxjs';
import { DataService }from 'src/app/services/data.service';
import { take } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { ShelfComponent } from '../shelf/shelf.component';

@Component({
  selector: 'app-pdflist',
  templateUrl: './pdflist.component.html',
  styleUrls: ['./pdflist.component.scss']
})
export class PdflistComponent implements OnInit {
  books:Book[];
  //userprofile:any;
  userlikedbooks:LikedBooks[]=[];
  checked:any;
  disabled:any;
  //categorylist:String[]=["Core CS","Machine Learning","Web Development","Programming","General"];
  categorylist:Record<string,string>={"Core CS":"../assets/img/corecs.jpg",
                                      "Machine Learning":"../assets/img/machinelearning.jpeg",
                                    "Web Development":"../assets/img/webdevelopment.jpg",
                                    "Programming":"../assets/img/programming.jpeg",
                                    "General":"../assets/img/general.jpg"};
  clickedToggle:boolean=false; // when user clicked toggle made this to true and show liked books 
  private buttonColor:string="primary";
  showlikes = new FormControl();
  constructor(private dataService:DataService,public dialog:MatDialog) { }
  openDialog() {
    const dialogRef = this.dialog.open(ShelfComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  // getUserDetails(){
  //   this.dataService.get_userDetails().subscribe(userdetails=>{
  //     this.userprofile = userdetails;
  //   });
  // }
  onChange(){
    if(this.showlikes.value){
      this.dataService.viewlikedbooks().subscribe(d=>{
        this.userlikedbooks = d;
        console.log("printing user liked books");
        console.log(this.userlikedbooks);
      });
    }
    this.clickedToggle = this.showlikes.value;
    console.log(this.showlikes.value);
  }
  send_like(event,bid:any){
    this.dataService.store_likes(bid).subscribe(()=>{

    });
    this.buttonColor = "warn";
  }
  
  ngOnInit():void{
    this.dataService.get_books().pipe(take(1)).subscribe(d=>{
      this.books = d;

    });
    // this.getUserDetails();
    this.dataService.viewlikedbooks().subscribe(d=>{
      this.userlikedbooks = d;
      console.log("printing user liked books");
      console.log(this.userlikedbooks);
    });
  }

}
