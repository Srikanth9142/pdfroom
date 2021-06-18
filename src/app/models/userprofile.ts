export class UserProfile{
    name:string;
    email:string;
    photoid:string;
    points: number;

    constructor(name:string,email:string,photoid:string, points: number){
        this.name = name;
        this.email = email;
        this.photoid = photoid;
        this.points = points;
    }
}