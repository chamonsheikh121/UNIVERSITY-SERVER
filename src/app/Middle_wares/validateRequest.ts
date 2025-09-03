// import { NextFunction } from "express";
// import {AnyZodObject} from 'zod'

// export const validate_request = (schema: AnyZodObject) => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       await schema.parseAsync({
//         body: req.body,
//       });

//       next()

//     } catch (error) {
//       next(error);
//     }
//   };
// };
