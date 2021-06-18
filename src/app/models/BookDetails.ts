export class BookDetails{
    bookId:string;
    name:string;
    coverphoto:string;
    author:string;
    category:string;
    likesCount:number;

    constructor(bookId:string,name:string,coverphoto:string,author:string,category:string,likesCount:number){
        this.bookId = bookId;
        this.name = name;
        this.coverphoto = coverphoto;
        this.author = author;
        this.category = category;
        this.likesCount = likesCount;
    }

}