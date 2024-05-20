import { Request, Response } from 'express';
import { ProductService } from './product.service';

import productValidationSchema from './product.validation';

const createProduct = async (req: Request, res: Response) => {
  try {
    const { product: productData } = req.body;
    // validation Zed using
    const zodParsedData = productValidationSchema.parse(productData);
    // will call service function  to send this data business logic all append services file
    const result = await ProductService.createProductInDB(zodParsedData);

    // send response

    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: true,
      message: 'Product Not created ',
      err: err.message,
    });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await ProductService.getAllProductsFromDB();
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: true,
      message: 'Movie Not fetched  ',
      err: err.message,
    });
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductService.getSingleProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: 'Product fetched successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: true,
      message: 'Product not found',
      err: err.message,
    });
  }
};
const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updateProduct = req.body;
    const result = await ProductService.updateProductFromDB(
      productId,
      updateProduct,
    );
    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: true,
      message: err.message || 'Product not updated',
      data: err,
    });
  }
};
const deletedProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductService.deletedProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: true,
      message: err.message || 'Product not deleted found',
      data: err,
    });
  }
};
export const ProductController = {
  createProduct,
  updateProduct,
  getAllProducts,
  getSingleProduct,
  deletedProduct,
};
