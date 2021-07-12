import { Document }  from "mongoose";

export interface CreateTeamDto extends Document {
    name: string;
}