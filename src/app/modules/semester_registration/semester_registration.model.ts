import { Schema, model } from 'mongoose';
import {
  ISemester_Registration,
  TSemesterRegistration,
} from './semester_registration.interface';
import { semester_registration_status } from './semester_registration.constance';

const semester_registration_schema = new Schema<TSemesterRegistration>(
  {
    academic_semester_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Academic_Semesters',
      unique: true,
    },
    status: {
      type: String,
      enum: semester_registration_status,
      required: true,
      default: 'UPCOMING',
    },
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
    min_credit: {
      type: Number,
      required: true,
      default: 3,
    },
    max_credit: {
      type: Number,
      required: true,
      default: 15,
    },
  },
  {
    timestamps: true,
  },
);

semester_registration_schema.statics.is_semester_registration_exist =
  async function (academic_semester_id: string) {
    const is_exist = await this.findOne({
      academic_semester_id,
    });
    return is_exist;
  };

semester_registration_schema.statics.is_semester_registration_id_exist =
  async function (id: string) {
    const is_exist = await this.findById(id);
    return is_exist;
  };

export const SemesterRegistrationModel = model<
  TSemesterRegistration,
  ISemester_Registration
>('Semester_registrations', semester_registration_schema);
