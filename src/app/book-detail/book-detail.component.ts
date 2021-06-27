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
  bookId:number;
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

    this.route.paramMap.subscribe(paramMap=>{
      this.bookId = parseInt(paramMap.get('bookId'));
      console.log("username:"+this.bookId);
      this.reload();
    });
  }

  saveNotes(){
    console.log(this.htmlContent);
    this.dataService.saveNotes(this.bookId, this.htmlContent).subscribe(()=>{
      this.notificationService.notifySuccessMessageToUser("Notes saved");
    }, errMes=>{
      this.notificationService.notifyErrorMessageToUser(errMes);
    })
  }

  reload(){
    this.dataService.viewBookDetails(this.bookId).subscribe(d=>{
      console.log(d);
      this.bookDetail = d[0];
    });
    this.dataService.viewNotes(this.bookId).subscribe(data=>{
      this.htmlContent = data[0].body;
    });
  }

}
