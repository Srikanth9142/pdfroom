import { Component, OnInit,Input, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Comment } from '../models/comment';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() bookId:number;
  comments:Comment[]=[];
  errorMessage:string;
  commentForm:FormGroup;
  serverErrors:string = "";

  @ViewChild('fform',{static:true}) commentFormDirective;

  validationMessages = {
    'comment':{
      'required': 'Comment is Required',
      'minLength': 'Comment should be 6 characters long',
      'maxLength': 'Comment should not exceed 250 characters long'
    }
  };

  constructor(private dataService:DataService, private fb:FormBuilder, private snackbar:MatSnackBar,
    private toastService:ToastrService) { }

  ngOnInit() {
    this.fetchComments();
    this.createCommentForm();
  }

  fetchComments(){
    this.dataService.view_comments(this.bookId).subscribe(d=>{
      this.comments = d;
      console.log(this.comments);
    });
  }
  createCommentForm(){
    this.commentForm = this.fb.group({
      comment:['',[Validators.required,Validators.minLength(6),Validators.maxLength(250)]]
    });
    this.commentForm.valueChanges.subscribe(data=>this.onValueChanged(data));
    this.onValueChanged();
  }
  
  onValueChanged(data?:any){
    if(!this.commentForm){
      return;
    }
    const control = this.commentForm.get('comment');
    if(control && control.dirty && !control.valid){
      const message = this.validationMessages['comment'];
      for(const key in control.errors){
        this.errorMessage = message[key];
      }
    }
    //console.log(this.errorMessage);
    

  }

  onSubmit(){
    const message = this.commentForm.get('comment').value;
    this.dataService.addComment(this.bookId,message).subscribe(()=>{
      this.snackbar.open("Comment added", 'X',{
        duration:2000,
        panelClass: ['success-snackbar']
      });
    }, errMes=>{
      console.log(errMes);
      this.toastService.error(errMes, "Error", {
        timeOut: 4000,
        progressBar: true,
        progressAnimation: "decreasing",
        positionClass: "toast-top-right",
        closeButton: true
      });
    });
    this.commentForm.reset({
      comment:''
    });
    this.errorMessage = "";
    this.commentFormDirective.resetForm({'comment':''});
    this.fetchComments();

  }
  upvote(commentId:string){
    this.dataService.reviewUpvote(commentId).subscribe(()=>{
      this.comments.find(item=>item.commentId == commentId).upvotes+=1;
      this.snackbar.open("Upvote added", 'X',{
        duration:2000,
        panelClass: ['success-snackbar']
      });
    }, (errmes)=>{
      this.serverErrors=errmes;
      console.log(this.serverErrors);
      this.snackbar.open(this.serverErrors,'X',{
        duration:2000,
        panelClass: ['error-snackbar']
      });
    });
  }

}
