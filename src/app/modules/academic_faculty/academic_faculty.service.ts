import TAcademic_faculty from './academic_faculty.interface';
import { Academic_Faculty_Model } from './academic_faculty.model';

const create_academic_faculty_to_db = async (payload: TAcademic_faculty) => {
  const result = await Academic_Faculty_Model.create(payload);
  return result;
};

const get_all_academic_faculties_from_db = async () => {
  const result = await Academic_Faculty_Model.find();
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
