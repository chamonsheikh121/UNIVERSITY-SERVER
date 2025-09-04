import { TAcademic_Semester } from '../academic_Semester/academic_semester.interface';
import UserModel from './user.model';

const last_student_id = async () => {
  const last_student = await UserModel.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .lean()
    .sort({ createdAt: -1 });

  return last_student?.id ? last_student.id : undefined;
};

export const genarate_student_id = async (payload: TAcademic_Semester) => {
  let current_id = (0).toString();

  const last_id = await last_student_id();
  const last_student_semester = last_id?.substring(4, 6);
  const last_student_year = last_id?.substring(0, 4);
  const is_year_match = last_student_year && payload.year === last_student_year;
  const is_semester_match = last_student_semester && payload.code === last_student_semester;

  if (last_id && is_year_match && is_semester_match) {
    current_id = last_id.substring(6);
  }

  let incremented_id = (Number(current_id) + 1).toString().padStart(4, '0');
  incremented_id = `${payload.year}${payload.code}${incremented_id}`;
  return incremented_id;
};








