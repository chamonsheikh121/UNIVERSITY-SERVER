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

    if(academic_semester_name_code_mapping[payload.name]!== payload.code ){
        throw new Error('Invalid semester code')
    }


  const result = await Academic_Semester_Model.create(payload);
  return result;
};

export const academic_semester_service = {
  create_academic_semester_to_db,
};
