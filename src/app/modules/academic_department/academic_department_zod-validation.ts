import z from 'zod'




const create_academic_department_zod_validation_schema = z.object({
  body: z.object({
    name: z.string("Not a string!"),
    academic_faculty_id: z.string("Academic faculty ID is required"),
  }),
});

const update_academic_department_zod_validation_schema =z.object({
    body:z.object({
        name: z.string().optional(),
        academic_faculty_id: z.string().optional()
    })
})



 const academic_department_zod_validation={
    create_academic_department_zod_validation_schema,
    update_academic_department_zod_validation_schema
}


export default academic_department_zod_validation;