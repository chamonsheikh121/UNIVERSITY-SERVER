import { Types } from 'mongoose';

type TAcademic_department = {
  name: string;
  academic_faculty_id: Types.ObjectId;
};

export default TAcademic_department;
