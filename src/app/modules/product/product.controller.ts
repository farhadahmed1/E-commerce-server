import { Request, Response } from 'express';
import { ProductService } from './product.service';
import productValidationSchema from './product.validation';

// 1-Create a new product using "post" method
const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
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
      success: false,
      message: 'Product Not created ',
      err: err.message,
    });
  }
};
// get all products and search for products
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const searchQuery = (req.query.searchTerm as string) || '';
    let result;

    if (searchQuery) {
      result = await ProductService.getAllProductsFromDB(searchQuery);
    } else {
      result = await ProductService.getAllProductsFromDB();
    }

    if (!result || result.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product Not Found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product Fetched Successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error Occurred While Getting All Products',
      error: error,
    });
  }
};

// get selected products by ID
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
      success: false,
      message: 'Product not found',
      err: err.message,
    });
  }
};
// update product any field
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
      success: false,
      message: err.message || 'Product not updated',
      data: err,
    });
  }
};
// delete product from database
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
      success: false,
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
