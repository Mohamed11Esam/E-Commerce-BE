import { Model, ProjectionType, QueryOptions, RootFilterQuery } from 'mongoose';

export abstract class AbstractRepository<T> {
  constructor(protected readonly model: Model<T>) {}

  async create(item: Partial<T>) {
    const doc = new this.model(item);
    return doc.save();
  }

  async getOne( filter: RootFilterQuery<T>, projection: ProjectionType<T>, options : QueryOptions ) {
    return this.model.findOne(filter, projection, options);
  }

}