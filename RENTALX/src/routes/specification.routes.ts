import { Router } from 'express';
import { SpecificationsRepository } from '../modules/cars/repositories/implementations/SpecificationsRepository';
import { createSpecificationController } from '../modules/cars/useCases/createSpecification';
import { CreateSpecificationUseCase } from '../modules/cars/useCases/createSpecification/CreateSpecificationUseCase';

const specificationRoutes = Router();

const specificationRepository = new SpecificationsRepository();

specificationRoutes.post('/', (req, res) => {
  return createSpecificationController.handle(req, res);
})

export { specificationRoutes };

