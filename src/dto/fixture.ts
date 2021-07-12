import { Document, ObjectId }  from "mongoose";


export interface CreateFixtureDto extends Document {
    //private _doc: { [x: string]: any; slug: any; };
    matchDate: Date;
    slug: String;
    homeTeam: ObjectId;
    awayTeam: any;
    homeTeamScore: Number;
    awayTeamScore: Number;
    pendingMatch: Boolean;
}