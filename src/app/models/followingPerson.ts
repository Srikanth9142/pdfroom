export class FollowingPerson{
    name: string;
    profilePicture: string;
    points: number;
    time: string;

    constructor(name:string, profilePicture:string, points:number, time:string){
        this.name = name;
        this.profilePicture = profilePicture;
        this.points = points;
        this.time = time;
    }
}