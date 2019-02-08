import * as _ from 'lodash';
import { Model, model } from 'mongoose';
import { IUser } from '../interface/collector';
import { IUserDocument, UserModel } from '../model/user';

export class UserRepository {
  private model: Model<IUserDocument>;
  constructor() {
    this.model = UserModel;
  }
  async getAll(): Promise<IUser[]> {
    const users = await this.model.find({}).exec();
    return _.map(users, user => { return user.toObject(); });
  }
  async get(email: string): Promise<IUser|undefined> {
    const user = await this.model.findOne({ email }).exec();
    if (!user) return;
    return user.toObject();
  }
  async create(params: IUser):
               Promise<IUser> {
    const user = new this.model(params);
    await user.save();
    return user.toObject();
  }
  async update(params: IUser): Promise<IUser|undefined> {
    const { email } = params;
    if (!email) {
      console.error(`Missing required field::email:${email}`);
      return;
    }
    const doc = await this.model.findOneAndUpdate({ email }, params, { new: true }).exec();
    if (!doc) return;
    return doc.toObject();
  }
  async delete(email: string): Promise<IUser|undefined> {
    const user = await this.model.findOneAndRemove({ email }).exec();
    if (!user) return;
    return user.toObject();
  }
}
