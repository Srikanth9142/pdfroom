import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { filter } from 'rxjs/operators';
import { Book } from '../models/book';
@Component({
  selector: 'app-pdfreader',
  templateUrl: './pdfreader.component.html',
  styleUrls: ['./pdfreader.component.scss']
})
export class PdfreaderComponent implements OnInit {
  book:Book[]=[];
  Bookid:number;
  fileUrl:string; 
  bookobj:any;
  constructor(private route:ActivatedRoute ,private dataservice:DataService) { }

  ngOnInit() {
    this.Bookid = this.route.snapshot.params['id'];
    this.dataservice.get_book().subscribe(d=>{
      this.book = d;
      this.fileUrl=d[this.Bookid-1].fileurl;
    });
    //console.log(this.book[name]);
    //this.getfilename();
    


  //}
    //getfilename(){
    //this.book = this.book.filter(v=>v.bookid===this.Bookid);
    //console.log(this.book.length);
    //console.log(this.book[0].author);
    
  //}
}
}