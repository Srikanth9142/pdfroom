export class Book{
    bookid: number;
    name: string;
    fileurl: string;
    coverurl: string;
    author: string;
    category: string;

    constructor(bookid:number,name:string,fileurl:string,coverurl:string,author:string,category:string){
        this.bookid = bookid;
        this.name = name;
        this.fileurl = fileurl;
        this.coverurl = coverurl;
        this.author = author;
        this.category = category;
    }
    getfilename(){
        return this.fileurl;
    }


}