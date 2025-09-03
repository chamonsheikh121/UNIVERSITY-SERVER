// Months
export type TMonth =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

// Semester names
export type TSemester_Name = 'Autumn' | 'Summer' | 'Fall';

// Semester codes
export type TSemester_Code = '01' | '02' | '03';

// Academic Semester type
export type TAcademic_Semester = {
  name: TSemester_Name;
  code: TSemester_Code;
  year: Date;
  start_month: TMonth;
  end_month: TMonth;
};
