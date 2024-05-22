import { Request, Response } from 'express';
//import orderValidationSchema from './order.validation';
import { OrderServices } from './order.service';

// 1-Create a new order using "post" method
const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    // validation Zed using
    //const zodParsedData = orderValidationSchema.parse(orderData);
    const result = await OrderServices.createOrder(orderData);
    // send response
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'Order Not created ',
      err: err.message,
    });
  }
};

// 2,3-Get all or search orders using "get" method
const getAllOrSearchOrders = async (req: Request, res: Response) => {
  try {
    const searchEmail = req.query.email as string | null;
    let result;
    if (searchEmail) {
      result = await OrderServices.searchOrders(searchEmail);
      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully for user email!',
        data: result,
      });
    } else {
      result = await OrderServices.getAllOrders();
      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully!',
        data: result,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'Could not fetch orders!',
      error: err.message,
    });
  }
};

export const OrderControllers = {
  createOrder,
  getAllOrSearchOrders,
};
