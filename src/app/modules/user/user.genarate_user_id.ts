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

  return last_student?.id ? last_student.id.substring(6) : undefined;
};

export const genarate_student_id = async (payload: TAcademic_Semester) => {
  const current_id = (await last_student_id()) || (0).toString();
  let incremented_id = (Number(current_id) + 1).toString().padStart(4, '0');
  incremented_id = `${payload.year}${payload.code}${incremented_id}`;
  return incremented_id;
};
