export class Book{
    bookid: number;
    name: string;
    fileurl: string;
    coverurl: string;
    author: string;
    category: string;
    likes: number;

    constructor(bookid:number,name:string,fileurl:string,coverurl:string,author:string,category:string,likes:number){
        this.bookid = bookid;
        this.name = name;
        this.fileurl = fileurl;
        this.coverurl = coverurl;
        this.author = author;
        this.category = category;
        this.likes = likes;
    }
    getfilename(){
        return this.fileurl;
    }


}