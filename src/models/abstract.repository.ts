import {
  Model,
  MongooseUpdateQueryOptions,
  ProjectionType,
  QueryOptions,
  RootFilterQuery,
} from 'mongoose';

export abstract class AbstractRepository<T> {
  constructor(protected readonly model: Model<T>) {}

  async create(item: Partial<T>) {
    const doc = new this.model(item);
    return doc.save();
  }

  async findOne(
    filter: RootFilterQuery<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions,
  ) {
    return this.model.findOne(filter, projection, options);
  }
  async find(
    filter: RootFilterQuery<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions,
  ) {
    return this.model.find(filter, projection, options);
  }
  async update(
    filter: RootFilterQuery<T>,
    updateData: Partial<T>,
    options?: MongooseUpdateQueryOptions,
  ) {
    return this.model.updateOne(filter, updateData, options);
  }

  async delete(filter: RootFilterQuery<T>): Promise<any> {
    return this.model.deleteOne(filter);
  }
}
