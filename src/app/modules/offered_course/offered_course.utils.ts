import { Tschedule } from './offered_course.interface';

export const has_time_conflict = (
  assigned_schedules: Tschedule[],
  new_schedule: Tschedule,
) => {
  for (const schedule of assigned_schedules) {
    const existing_start_time = new Date(`1970-01-01T${schedule.start_time}`);
    const existing_end_time = new Date(`1970-01-01T${schedule.end_time}`);
    const new_start_time = new Date(`1970-01-01T${new_schedule.start_time}`);
    const new_end_time = new Date(`1970-01-01T${new_schedule.end_time}`);

    if (
      new_start_time < existing_end_time &&
      new_end_time > existing_start_time
    ) {
      return true;
    }
  }

  return false;
};

