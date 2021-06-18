import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { NotificationService } from '../services/notification.service';
import { ReadListBook } from '../models/ReadListBook';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-readlist',
  templateUrl: './readlist.component.html',
  styleUrls: ['./readlist.component.scss']
})
export class ReadlistComponent implements OnInit {

  readList: ReadListBook[];
  baseUrlforReadListCoverphoto = environment.serverurl+"/media/";

  constructor(private dataService: DataService, private notificationService: NotificationService) { }

  deleteBookFromReadList(bookId:number){
    this.dataService.deleteBookFromReadList(bookId).subscribe(()=>{
      this.notificationService.notifyInfoMessageToUser("Deleted from ReadList");
      this.ngOnInit();
    }, errMess=>{
      this.notificationService.notifyErrorMessageToUser(errMess);
    })
  }

  ngOnInit() {
    this.dataService.viewReadList().subscribe((data)=>{
      console.log("Received results");
      this.readList = data;
      console.log(this.readList);
    }, errMess=>{
      this.notificationService.notifyErrorMessageToUser(errMess);
    });
  }

}
