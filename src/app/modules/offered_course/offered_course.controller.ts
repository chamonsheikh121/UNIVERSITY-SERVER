import { send_response } from '../../Middle_wares/send_response';
import { catchAsync } from '../../utils/catch_async';
import { offered_course_services } from './offered_course.service';

const create_offered_course = catchAsync(async (req, res, next) => {
  const { offered_course_data } = req.body;

  const result =
    await offered_course_services.create_offered_course_to_db(
      offered_course_data,
    );

  send_response(res, {
    message: 'offered course created successfully',
    data: result,
  });
});

// const get_all_offered_courses = async (req: Request, res: Response) => {
//   try {
//     const result = await OfferedCourseService.getAllOfferedCourses();
//     res.status(200).json({ success: true, data: result });
//   } catch (error) {
//     res.status(500).json({ success: false, message: (error as Error).message });
//   }
// };

// const get_single_offered_course = async (req: Request, res: Response) => {
//   try {
//     const result = await OfferedCourseService.getSingleOfferedCourse(
//       req.params.id,
//     );
//     res.status(200).json({ success: true, data: result });
//   } catch (error) {
//     res.status(500).json({ success: false, message: (error as Error).message });
//   }
// };

// const update_offered_course = async (req: Request, res: Response) => {
//   try {
//     const result = await OfferedCourseService.deleteOfferedCourse(
//       req.params.id,
//     );
//     res.status(200).json({ success: true, data: result });
//   } catch (error) {
//     res.status(500).json({ success: false, message: (error as Error).message });
//   }
// };

export const offered_course_controller = {
  create_offered_course,
  // get_all_offered_courses,
  // get_single_offered_course,
  // update_offered_course,
};
