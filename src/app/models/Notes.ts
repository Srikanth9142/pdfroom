export class Notes{
    bookid:number;
    email:string;
    body:string;

    constructor(bookid:number, email:string, body:string){
        this.bookid = bookid;
        this.email = email;
        this.body = body;
    }
}