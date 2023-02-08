import { Request, Response } from 'express';

import CreateCourseService from './CreateCourSeService';

export function createCourse(req: Request, res: Response) {
  
  CreateCourseService.execute({
    name: 'NodeJS',
    educator: 'Jorge',
  });
}