import { Component, OnInit,ViewChild,Input } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { Book } from '../models/book';
import { DataService }from 'src/app/services/data.service';
import { take } from 'rxjs/operators';
import { LikedBooks } from '../models/likedbooks';

export interface BookData {
  bookid: string;
  name: string;
  author: string;
  category: string;
}

/** Constants used to fill up our data base. */
const COLORS: string[] = [
  'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
  'aqua', 'blue', 'navy', 'black', 'gray'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

@Component({
  selector: 'app-likedbookstable',
  templateUrl: './likedbookstable.component.html',
  styleUrls: ['./likedbookstable.component.scss']
})
export class LikedbookstableComponent implements OnInit {
  displayedColumns: string[] = ['bookid', 'name', 'author', 'category'];
  dataSource: MatTableDataSource<BookData>;
  books:Book[]=[];
  li:BookData[]=[];
  likedbooks:LikedBooks[]=[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private dataService:DataService) {
    
    

    // Assign the data to the data source for the table to render
    
   }

  ngOnInit() {
    
    this.dataService.get_books().pipe(take(1)).subscribe(d=>{
      this.books = d;
      // this.books.forEach((id)=>{
      //   console.log(id.name);
      // });
      console.log("in table:"+this.books.length);
    });

    this.dataService.viewlikedbooks().pipe(take(1)).subscribe(d=>{
      this.likedbooks = d;
      this.likedbooks.forEach((id)=>{
        this.li.push(createNewUser(id.bookid,this.books));
      });
      //console.log(this.li);
      
    });
    console.log(this.li);
    this.dataSource = new MatTableDataSource(this.li);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
    
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

/** Builds and returns a new User. */
function createNewUser(bookid:number,books:Book[]): BookData {
  var id = bookid
  //console.log(this.books)
  return {
    bookid: id.toString(),
    name: books[bookid-1].name,
    author: books[bookid-1].author,
    category: books[bookid-1].category
    
  };
}

