import Query_Builder from '../../builder/query_bulder';
import { TAcademic_Semester } from './academic_semester.interface';
import { Academic_Semester_Model } from './academic_semester.model';

const create_academic_semester_to_db = async (payload: TAcademic_Semester) => {
  type TAcademic_semester_name_code_mapping = {
    [key: string]: string;
  };
  const academic_semester_name_code_mapping: TAcademic_semester_name_code_mapping =
    {
      Autumn: '01',
      Summer: '02',
      Fall: '03',
    };
  if (academic_semester_name_code_mapping[payload.name] !== payload.code) {
    throw new Error('Invalid semester code');
  }
  const result = await Academic_Semester_Model.create(payload);
  return result;
};

const get_all_academic_semesters_from_db = async (
  query: Record<string, unknown>,
) => {
  const academic_semester_query = new Query_Builder(
    Academic_Semester_Model.find(),
    query,
  )
    .filter()
    .sort()
    .field_limit()
    .pagination();

  const result = await academic_semester_query.model_query;
  return result;
};
const get_single_academic_semester_from_db = async (id: string) => {
  const result = await Academic_Semester_Model.findById(id);
  return result;
};
const update_academic_semester_from_db = async (id: string) => {
  const result = await Academic_Semester_Model.findByIdAndUpdate(id, {
    year: '2030',
  });
  return result;
};

export const academic_semester_service = {
  create_academic_semester_to_db,
  get_all_academic_semesters_from_db,
  get_single_academic_semester_from_db,
  update_academic_semester_from_db,
};
