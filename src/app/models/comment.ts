export class Comment{
    commentId: string;
    email: string;
    userName: string;
    message: string;
    upvotes: number;
    bookId: number;

    constructor(commentId:string,email:string,userName:string,message:string,
        upvotes:number,bookId:number){
            this.commentId = commentId;
            this.email = email;
            this.userName = userName;
            this.message = message;
            this.upvotes = upvotes;
            this.bookId = bookId;
    }


}