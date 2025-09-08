import { TAcademic_Semester } from '../academic_Semester/academic_semester.interface';
import UserModel from './user.model';

const last_faculty_id = async () => {
  const last_faculty = await UserModel.findOne(
    {
      role: 'faculty',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .lean()
    .sort({ createdAt: -1 });

  return last_faculty?.id ? last_faculty.id : undefined;
};

export const genarate_faculty_id = async () => {
  // F-0001

  const last_id = await last_faculty_id();
  const current_id = last_id?.split('-')[1] || (0).toString();
  let incremented_id = (Number(current_id) + 1).toString().padStart(4, '0');
  incremented_id = `F-${incremented_id}`;
  console.log('faculty genarated id is : ', incremented_id);
  return incremented_id;
};
