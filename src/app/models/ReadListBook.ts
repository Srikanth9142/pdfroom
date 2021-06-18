export class ReadListBook{
    bookId: number;
    readListName: string;
    coverPhoto: string;

    constructor(bookId:number, readListname: string, coverPhoto:string){
        this.bookId = bookId;
        this.readListName = readListname;
        this.coverPhoto = coverPhoto;
    }
}