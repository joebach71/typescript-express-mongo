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
  async get(username: string): Promise<IUser|undefined> {
    const user = await this.model.findOne({ username }).exec();
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
    const { username } = params;
    if (!username) {
      console.error(`Missing required field::username:${username}`);
      return;
    }
    const doc = await this.model.findOneAndUpdate({ username }, params, { new: true }).exec();
    if (!doc) return;
    return doc.toObject();
  }
  async delete(username: string): Promise<IUser|undefined> {
    const user = await this.model.findOneAndRemove({ username }).exec();
    if (!user) return;
    return user.toObject();
  }
}
