import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { BookDetails } from '../models/BookDetails';
import { editorConfig } from '../constants';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  Bookid:number;
  bookDetail:BookDetails;
  editorrConfig:AngularEditorConfig;
  notesEditor: AngularEditorConfig = {
    editable: true,
    translate: 'no',
    spellcheck: true,
    placeholder: "Enter your text here...",
    toolbarHiddenButtons: [['insertImage', 'insertVideo']]
  }
  htmlContent = "";
  

  constructor(private route:ActivatedRoute, private dataService:DataService, private notificationService: NotificationService) { }

  ngOnInit() {
    this.Bookid = this.route.snapshot.params['bookId'];
    this.dataService.viewBookDetails(this.Bookid).subscribe(d=>{
      console.log(d);
      this.bookDetail = d[0];
    });
    this.dataService.viewNotes(this.Bookid).subscribe(data=>{
      this.htmlContent = data[0].body;
    })

  }
  saveNotes(){
    console.log(this.htmlContent);
    this.dataService.saveNotes(this.Bookid, this.htmlContent).subscribe(()=>{
      this.notificationService.notifySuccessMessageToUser("Notes saved");
    }, errMes=>{
      this.notificationService.notifyErrorMessageToUser(errMes);
    })
  }

}
