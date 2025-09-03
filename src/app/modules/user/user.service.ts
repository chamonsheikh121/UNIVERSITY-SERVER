import config from '../../config';
import { Academic_Semester_Model } from '../academic_Semester/academic_semester.model';
import { TStudent } from '../student/student.interface';
import StudentModel from '../student/student.model';
import { genarate_student_id } from './user.genarate_user_id';
import { TNewUser } from './user.interface';
import UserModel from './user.model';

const create_student_to_db = async (password: string, payload: TStudent) => {
  if (await StudentModel.is_user_email_exist(payload.email)) {
    throw new Error('User already exist from statics ! ');
  }

  const userData: Partial<TNewUser> = {};

  const academic_semester = await Academic_Semester_Model.findById(
    payload.academic_semester_id,
  );
  console.log('academic semester is', academic_semester);

  userData.id = await genarate_student_id(academic_semester);

  userData.password = password || (config.default_password as string);
  userData.role = 'student';
  userData.status = 'in-progress';

  const result_user = await UserModel.create(userData);

  if (Object.keys(result_user).length) {
    payload.id = result_user.id;
    payload.userId = result_user._id;

    const result_student = await StudentModel.create(payload);
    return result_student;
  }
};

export const user_services = {
  create_student_to_db,
};
