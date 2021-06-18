import { Component, OnInit } from '@angular/core';
import { DataService }from 'src/app/services/data.service';
import { Book } from 'src/app/models/book';
import { take } from 'rxjs/operators';
import { ShelfBooks } from 'src/app/models/shelfbooks';

@Component({
  selector: 'app-shelf',
  templateUrl: './shelf.component.html',
  styleUrls: ['./shelf.component.scss']
})
export class ShelfComponent implements OnInit {
  usershelfbooks:ShelfBooks[]=[];
  books:Book[]=[];
  constructor(private dataservice:DataService) { }

  ngOnInit() {
    this.dataservice.get_books().pipe(take(1)).subscribe(d=>{
      //console.log(d);
      this.books = d;

    });
    this.dataservice.viewShelfBooks().subscribe(d=>{
      this.usershelfbooks = d;
      console.log("in shelf");
    });
  }

}
