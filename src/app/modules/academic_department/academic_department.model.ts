import { model, Schema } from 'mongoose';
import TAcademic_department from './academic_department.interface';
import AppError from '../../errors/AppError';
import HttpStatus from 'http-status';

const academic_department_schema = new Schema<TAcademic_department>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academic_faculty_id: {
      type: Schema.Types.ObjectId,
      ref: 'Academic_Faculties',
    },
  },
  {
    timestamps: true,
  },
);

academic_department_schema.pre('save', async function (next) {
  const is_department_exist = await Academic_Department_Model.findOne({
    name: this.name,
  });

  if (is_department_exist) {
    throw new AppError(HttpStatus.BAD_REQUEST, 'Department already exist');
  }
});

academic_department_schema.pre('findOneAndUpdate', async function () {
  const query = this.getQuery();
  const is_department_exist = await Academic_Department_Model.findById(
    query._id,
  );
  if (!is_department_exist) {
    throw new AppError(HttpStatus.BAD_REQUEST, 'Department dosent exist');
  }
});

const Academic_Department_Model = model<TAcademic_department>(
  'Academic_departments',
  academic_department_schema,
);

export default Academic_Department_Model;
