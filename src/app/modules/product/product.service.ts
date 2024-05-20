import { ProductModel } from '../product.model';
import { TProduct } from './product.interface';

const createProductInDB = async (product: TProduct) => {
  const result = await ProductModel.create(product);
  return result;
};
const getAllProductsFromDB = async () => {
  const result = await ProductModel.find();
  return result;
};
const getSingleProductFromDB = async (_id: string) => {
  const result = await ProductModel.findOne({ _id });
  return result;
};
const updateProductFromDB = async (_id: string, updateProduct: any) => {
  const result = await ProductModel.updateOne({ _id }, { $set: updateProduct });
  return result;
};
const deletedProductFromDB = async (_id: string) => {
  const result = await ProductModel.deleteOne({ _id });
  return result;
};
export const ProductService = {
  createProductInDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductFromDB,
  deletedProductFromDB,
};
