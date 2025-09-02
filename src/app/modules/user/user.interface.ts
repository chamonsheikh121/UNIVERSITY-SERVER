
export type TUser = {
  id?: string;
  password: string;
  need_password_change?: boolean; // default true
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted?: boolean; 
};


export type TNewUser ={
  password: string;
  id: string;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
}
