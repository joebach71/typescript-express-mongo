import { Document, Schema, Model, model } from "mongoose";
import { IUser } from "../interface/collector";

export interface IUserDocument extends IUser, Document {
  fullName(): string;
}

export const UserSchema: Schema = new Schema({
  email: { type: String, unique: true },
  password: { type: String },
  createdAt: { type: Date, default: Date.now },
  firstName: { type: String },
  lastName: { type: String }
}, { shardKey: { email: 'hashed'}} as any);
UserSchema.methods.fullName = function(): string {
  return `${this.firstName.trim()} ${this.lastName.trim()}`;
};
UserSchema.set('toObject', { transform: (doc: IUserDocument, ret: IUserDocument) => {
  delete ret._id;
  delete ret.__v;
}});
export const UserModel: Model<IUserDocument> = model<IUserDocument>("User", UserSchema);
