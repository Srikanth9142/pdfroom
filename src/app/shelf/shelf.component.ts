import { Component, OnInit } from '@angular/core';
import { DataService }from 'src/app/services/data.service';
import { Book } from 'src/app/models/book';
import { take } from 'rxjs/operators';
import { LikedBooks } from 'src/app/models/likedbooks';

@Component({
  selector: 'app-shelf',
  templateUrl: './shelf.component.html',
  styleUrls: ['./shelf.component.scss']
})
export class ShelfComponent implements OnInit {
  userlikedbooks:LikedBooks[]=[];
  books:Book[]=[];
  constructor(private dataservice:DataService) { }

  ngOnInit() {
    this.dataservice.get_books().pipe(take(1)).subscribe(d=>{
      this.books = d;

    });
    this.dataservice.viewlikedbooks().subscribe(d=>{
      this.userlikedbooks = d;
    });
  }

}
