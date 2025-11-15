import { AbstractRepository } from "@models/abstract.repository";
import { User } from "./user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

export class UserRepository extends AbstractRepository<User> {
    constructor(@InjectModel(User.name) userModel: Model<User>) {
        super(userModel);
    }
}