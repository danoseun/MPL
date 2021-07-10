import { Document }  from "mongoose";

export interface CreateUserDto extends Document {
    fullname: string;
    email: string;
    password: string;
    role: string
}