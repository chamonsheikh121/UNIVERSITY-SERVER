import { FilterQuery, Query } from 'mongoose';

class Query_Builder<T> {
  public model_query: Query<T[], T>;
  public query: Record<string, unknown>;
  public filter_condition: FilterQuery<T> = {}; // <-- new property
  constructor(modelquery: Query<T[], T>, query: Record<string, unknown>) {
    this.model_query = modelquery;
    this.query = query;
  }

  search(search_able_fields: string[]) {
    const searchTerm = this?.query?.searchTerm;
    if (searchTerm) {
      this.model_query = this.model_query.find({
        $or: search_able_fields?.map((field) => {
          //as FilterQuery<T>
          return { [field]: { $regex: searchTerm, $options: 'i' } };
        }),
      });
    }
    return this;
  }

  filter() {
    const queryObj = { ...this.query };
    const exclude_field = ['searchTerm', 'sort', 'page', 'limit', 'fields'];
    exclude_field.forEach((element) => delete queryObj[element]);

    this.model_query = this.model_query.find(queryObj as FilterQuery<T>);
     this.filter_condition = { ...this.filter_condition, ...queryObj } as FilterQuery<T>;
    return this;
  }

  sort() {
    const sort =
      (this?.query?.sort as string)?.split(',')?.join(' ') || '-createdAt';
    this.model_query = this.model_query.sort(sort);
    return this;
  }
  pagination() {
    const page: number = Number(this?.query?.page) || 1;
    const limit: number = Number(this?.query?.limit) || 10;
    const skip: number = (page - 1) * limit;
    this.model_query = this.model_query.skip(skip).limit(limit);
    return this;
  }
  field_limit() {
    const fields =
      (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v';
    this.model_query = this.model_query.select(fields);
    return this;
  }
}

export default Query_Builder;
