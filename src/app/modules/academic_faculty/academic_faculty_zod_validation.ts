import z from 'zod'

const academic_faculty_zod_validation_schema = z.object({
    body:z.object({
        name: z.string()
    })
})

export default academic_faculty_zod_validation_schema;


