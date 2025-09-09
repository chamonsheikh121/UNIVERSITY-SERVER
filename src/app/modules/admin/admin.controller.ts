import { send_response } from '../../Middle_wares/send_response';
import { catchAsync } from '../../utils/catch_async';
import admin_services from './admin.service';

const get_admins = catchAsync(async (req, res, next) => {
  const result = await admin_services.get_admins_from_db();
  send_response(res, {
    message: 'admins retrived successfully',
    data: result,
  });
});
const get_single_admin = catchAsync(async (req, res, next) => {
  const { _id } = req.params;
  const result = await admin_services.get_single_admin_from_db(_id);
  send_response(res, {
    message: 'admin single data found successfully',
    data: result,
  });
});
const delete_admin = catchAsync(async (req, res, next) => {
  const { _id } = req.params;
  const result = await admin_services.delete_admin_from_db(_id);
  send_response(res, {
    message: 'admin has been deleted successfully',
    data: result,
  });
});

const update_admin = catchAsync(async (req, res, next) => {
  const { _id } = req.params;
  const { admin_data } = req.body;

  const result = await admin_services.update_admin_from_db(_id, admin_data);

  send_response(res, {
    message: 'admin updated successfully',
    data: result,
  });
});

export const admin_controller = {
  get_admins,
  get_single_admin,
  delete_admin,
  update_admin,
};
