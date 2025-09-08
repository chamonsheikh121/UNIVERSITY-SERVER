import UserModel from './user.model';

const last_admin_id = async () => {
  const last_admin = await UserModel.findOne(
    {
      role: 'admin',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return last_admin?.id ? last_admin?.id : undefined;
};

export const genarate_admin_id = async () => {
  const last_id = await last_admin_id();
  const current_id = last_id?.split('-')[1] || (0).toString();
  let incremented_id = (Number(current_id) + 1).toString().padStart(4, '0');
  incremented_id = `A-${incremented_id}`;
  return incremented_id;
};
