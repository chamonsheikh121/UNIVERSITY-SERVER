import { model, Schema } from "mongoose";
import  TAcademic_department  from "./academic_department.interface";



const academic_department_schema = new Schema<TAcademic_department>({
    name:{
        type: String,
        required: true,
        unique: true
    },
    academic_faculty_id: {
        type: Schema.Types.ObjectId,
        ref: 'Academic_Faculties'
    } 
},
{
    timestamps: true
})


const Academic_Department_Model = model<TAcademic_department>('Academic_departments', academic_department_schema);

export default Academic_Department_Model