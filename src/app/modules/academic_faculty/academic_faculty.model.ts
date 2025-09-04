import { model, Schema } from 'mongoose';
import TAcademic_faculty from './academic_faculty.interface';

const academic_faculty_schema = new Schema<TAcademic_faculty>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Academic_Faculty_Model = model<TAcademic_faculty>(
  'Academic_Faculties',
  academic_faculty_schema,
);
