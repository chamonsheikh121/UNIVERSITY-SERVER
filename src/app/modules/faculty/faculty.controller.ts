import { send_response } from '../../Middle_wares/send_response';
import { catchAsync } from '../../utils/catch_async';
import { faculty_services } from './faculty.service';

const get_faculties = catchAsync(async (req, res, next) => {
  const result = await faculty_services.get_faculties_from_db();

  send_response(res, {
    message: 'faculties retrived successfully',
    data: result,
  });
});
const get_single_faculty = catchAsync(async (req, res, next) => {
  const { facultyId } = req.params;
  console.log(facultyId);

  const result = await faculty_services.get_single_faculty_from_db(facultyId);

  send_response(res, {
    message: 'faculty retrived successfully',
    data: result,
  });
});
const delete_faculty = catchAsync(async (req, res, next) => {
  const { facultyId } = req.params;
  const result = await faculty_services.delete_faculty_from_db(facultyId);
  send_response(res, {
    message: 'faculty deleted successfully',
    data: result,
  });
});

const update_faculty = catchAsync(async (req, res, next) => {
  const { facultyId } = req.params;
  const { faculty_data } = req.body;

  const result = await faculty_services.update_faculty_from_db(
    facultyId,
    faculty_data,
  );

  send_response(res, {
    message: 'faculty updated successfully',
    data: result,
  });
});

export const faculty_contollers = {
  get_faculties,
  get_single_faculty,
  delete_faculty,
  update_faculty,
};
