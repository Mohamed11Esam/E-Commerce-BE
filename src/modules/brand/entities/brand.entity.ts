import { Types } from 'mongoose';

export class Brand {
  readonly _id: Types.ObjectId;
  name: string;
  slug: string;
  logo: any;
  createdBy: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
