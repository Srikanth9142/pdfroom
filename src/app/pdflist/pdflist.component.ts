import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { Observable }from 'rxjs';
import { DataService }from 'src/app/services/data.service';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-pdflist',
  templateUrl: './pdflist.component.html',
  styleUrls: ['./pdflist.component.scss']
})
export class PdflistComponent implements OnInit {
  books:Book[];
  userprofile:any;

  constructor(private dataService:DataService) { }
  getUserDetails(){
    this.dataService.get_userDetails().subscribe(userdetails=>{
      this.userprofile = userdetails;
    });
  }

  ngOnInit():void{
    this.dataService.get_books().pipe(take(1)).subscribe(d=>{
      this.books = d;

    });
    this.getUserDetails();
  }

}
