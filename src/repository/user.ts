import * as _ from 'lodash';
import { Model } from 'mongoose';
import { IUser } from '../interface/user';
import { IUserModel, User } from '../model/user';

export class UserRepository {
  private model: Model<IUserModel>;
  constructor() {
    this.model = User;
  }
  async getAll(): Promise<IUser[]> {
    const users = await this.model.find({}).exec();
    return _.map(users, user => { return user.toObject(); });
  }
  async getUser(username: string): Promise<IUser|undefined> {
    const user = await this.model.findOne({ username }).exec();
    if (!user) return;
    return user.toObject();
  }
  async create(params: IUser):
               Promise<IUser> {
    const user = new User(params);
    console.info(`repo: ${user}`);
    return await user.save();
  }
  async update(params: IUser): Promise<IUser|undefined> {
    const doc = await this.model.findOneAndUpdate({ _id: params.username }, params).exec();
    if (!doc) return;
    return doc.toObject();
  }
}
