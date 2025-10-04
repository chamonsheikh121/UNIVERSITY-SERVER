import Query_Builder from '../../builder/query_bulder';
import TAcademic_department from './academic_department.interface';
import Academic_Department_Model from './academic_department.model';

const create_academic_department_to_db = async (
  payload: TAcademic_department,
) => {
  const result = await Academic_Department_Model.create(payload);
  return result;
};

const get_all_academic_departments_from_db = async (
  query: Record<string, unknown>,
) => {
  const academic_department_query = new Query_Builder(
    Academic_Department_Model.find().populate('academic_faculty_id'),
    query,
  )
    .field_limit()
    .filter()
    .pagination()
    .sort();

  const result = await academic_department_query.model_query;
  return result;
};
const get_single_academic_department_from_db = async (id: string) => {
  const result = await Academic_Department_Model.findById(id);
  return result;
};
const update_academic_department_from_db = async (id: string, payload: any) => {
  const result = await Academic_Department_Model.findByIdAndUpdate(
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

export const academic_department_services = {
  create_academic_department_to_db,
  get_all_academic_departments_from_db,
  get_single_academic_department_from_db,
  update_academic_department_from_db,
};
