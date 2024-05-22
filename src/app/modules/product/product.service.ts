import { ProductModel } from '../product.model';
import { TProduct } from './product.interface';
// create a new product
const createProductInDB = async (product: TProduct) => {
  const result = await ProductModel.create(product);
  return result;
};
// get all products
// const getAllProductsFromDB = async () => {
//   const result = await ProductModel.find();
//   return result;
// };
// get single product using  by Id
const getSingleProductFromDB = async (_id: string) => {
  const result = await ProductModel.findOne({ _id });
  return result;
};
// update product
const updateProductFromDB = async (_id: string, updateProduct: TProduct) => {
  const result = await ProductModel.updateOne({ _id }, { $set: updateProduct });
  return result;
};
// delete product
const deletedProductFromDB = async (_id: string) => {
  const result = await ProductModel.deleteOne({ _id });
  return result;
};
const getAllProductsFromDB = async (query?: string) => {
  let searchText = {};

  if (query) {
    const regex = new RegExp(query, 'i');
    searchText = {
      $or: [
        { name: { $regex: regex } },
        { description: { $regex: regex } },
        { category: { $regex: regex } },
      ],
    };

    const result = await ProductModel.find(searchText);
    return result;
  } else {
    const result = await ProductModel.find();
    return result;
  }
};
export const ProductService = {
  createProductInDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductFromDB,
  deletedProductFromDB,
};
