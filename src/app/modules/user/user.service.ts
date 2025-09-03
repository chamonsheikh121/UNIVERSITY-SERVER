import config from '../../config';
import { TStudent } from '../student/student.interface';
import StudentModel from '../student/student.model';
import { TNewUser } from './user.interface';
import UserModel from './user.model';

const create_student_to_db = async (
  password: string,
  student_data: TStudent,
) => {
  //   if (await StudentModel.is_user_email_exist(student_data.email)) {
  //     throw new Error('User already exist from statics ! ');
  //   }

  //===========================================================================================================================================================================================
  // is user id exist or not and is student email exist or not need to check here.

  const userData: Partial<TNewUser> = {};

  userData.id = '7879783843948';
  userData.password = password || (config.default_password as string);
  userData.role = 'student';
  userData.status = 'in-progress';

  const result_user = await UserModel.create(userData);

  if (Object.keys(result_user).length) {
    student_data.id = result_user.id;
    student_data.userId = result_user._id;

    console.log('user created succesfully', student_data);

    const result_student = await StudentModel.create(student_data);
    return result_student;
  }
};

export const user_services = {
  create_student_to_db,
};
