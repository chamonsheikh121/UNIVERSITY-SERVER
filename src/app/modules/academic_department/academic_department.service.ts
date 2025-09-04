import TAcademic_department from "./academic_department.interface";
import Academic_Department_Model from "./academic_department.model";


const create_academic_department_to_db = async (payload: TAcademic_department) => {
  const result = await Academic_Department_Model.create(payload);
  return result;
};

const get_all_academic_departments_from_db = async () => {
  const result = await Academic_Department_Model.find();
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
    new: true
   }
  );
  return result;
};

export const academic_department_services = {
  create_academic_department_to_db,
  get_all_academic_departments_from_db,
  get_single_academic_department_from_db,
  update_academic_department_from_db,
};
