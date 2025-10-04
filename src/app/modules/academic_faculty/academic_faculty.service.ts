import Query_Builder from '../../builder/query_bulder';
import TAcademic_faculty from './academic_faculty.interface';
import { Academic_Faculty_Model } from './academic_faculty.model';

const create_academic_faculty_to_db = async (payload: TAcademic_faculty) => {
  const result = await Academic_Faculty_Model.create(payload);
  return result;
};

const get_all_academic_faculties_from_db = async (
  query: Record<string, unknown>,
) => {
  const academic_faculty_query = new Query_Builder(
    Academic_Faculty_Model.find(),
    query,
  )
    .field_limit()
    .filter()
    .sort()
    .pagination();

  const result = await academic_faculty_query.model_query;
  return result;
};
const get_single_academic_faculty_from_db = async (id: string) => {
  const result = await Academic_Faculty_Model.findById(id);
  return result;
};
const update_academic_faculty_from_db = async (id: string, payload: any) => {
  const result = await Academic_Faculty_Model.findByIdAndUpdate(
    id,
    {
      name: payload.name,
    },
    {
      new: true,
    },
  );
  return result;
};

export const academic_faculty_services = {
  create_academic_faculty_to_db,
  get_all_academic_faculties_from_db,
  get_single_academic_faculty_from_db,
  update_academic_faculty_from_db,
};
