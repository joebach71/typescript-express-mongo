import { Document, Schema, Model, model} from "mongoose";
import { IUser } from "../interface/collector";

export interface IUserModel extends IUser, Document {
  fullName(): string;
  toObject(): IUser;
}

export const UserSchema: Schema = new Schema({
  username: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
  email: { type: String },
  firstName: { type: String },
  lastName: { type: String }
}, { shardKey: { username: 'hashed'}} as any);
UserSchema.pre("save", function(next) {
  next();
});
UserSchema.methods.fullName = function(): string {
  return (this.firstName.trim() + " " + this.lastName.trim());
};
UserSchema.set('toObject', { transform: (doc: IUserModel, ret: IUserModel) => {
  ret.username = ret._id;
  delete ret._id;
  return ret;
}});
export const User = model<IUserModel>("User", UserSchema);
