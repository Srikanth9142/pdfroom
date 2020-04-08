import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Book } from '../models/book';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  category:String="";
  categorySortedBooks:Book[]=[];
  //book:Book[]=[];
  constructor(private route:ActivatedRoute,private dataservice:DataService){ }
  ngOnInit() {
    this.category = this.route.snapshot.params['categoryname'];
    //console.log("category: ",this.category);
    function categoryfilter(e){
      return e.category == this;
    }
    this.dataservice.get_books().subscribe(d=>{
      // this.book = d;
      this.categorySortedBooks = d.filter(categoryfilter,this.category);
      console.log(this.categorySortedBooks);
    });
  }

}
