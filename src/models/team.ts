import mongoose from 'mongoose';
import { CreateTeamDto } from '../dto/team';

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
})

export const Team = mongoose.model<CreateTeamDto>('Team', teamSchema)


