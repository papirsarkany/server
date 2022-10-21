import { NextFunction, Request, Response, Router } from 'express';
import { validateRequest } from '../middlewares/validateRequest';
import { Order } from './order.model';
import * as orderService from './order.service';
const router = Router();

// Create order
router.post(
  '/',
  validateRequest({ body: Order }),
  async (req: Request<{}, Order, Omit<Order, 'id'>>, res: Response<Order>, next: NextFunction) => {
    try {
      const order = await orderService.createOrder(req.body);
      res.status(201);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);

// Get all orders
router.get('/', async (req: Request, res: Response<Order[]>, next: NextFunction) => {
  try {
    const orders = await orderService.getAllOrders();
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

// Delete order
router.delete(
  '/:id',
  validateRequest({}),
  async (req: Request<{ id: string }>, res: Response<Order>, next: NextFunction) => {
    try {
      const order = await orderService.deleteOrder(req.params.id);
      if (!order) {
        res.status(404);
        throw new Error(`Order with id ${req.params.id} not found!`);
      }
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
