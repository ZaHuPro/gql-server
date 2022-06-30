import mongoose from '../providers/Database';

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// Define the Person Schema
export const userSchema = new mongoose.Schema<IUser>({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
},
{ timestamps: true });

export default mongoose.model<IUser>('User', userSchema);
