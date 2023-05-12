import crypto from 'crypto';
import Product from '../models/Product.model.js';
import Category from '../models/Category.model.js';
import Brand from '../models/Brand.model.js';

const createProduct = async (product) => {
  let newProduct = await Product.findAll({
    where: { name: product.name },
  });
  if (newProduct.length > 0) {
    const error = { message: `The product "${product.name}" already exists` };
    return error;
  }
  const category = await Category.findAll({
    where: { id: product.CategoryId },
  });
  if (category.length === 0) {
    const error = {
      message: `The category "${product.CategoryId}" does not exists`,
    };
    return error;
  }
  const brand = await Brand.findAll({
    where: { id: product.BrandId },
  });
  if (brand.length === 0) {
    const error = { message: `The brand "${product.BrandId}" does not exists` };
    return error;
  }
  const id = crypto.randomBytes(10).toString('hex');
  newProduct = {
    id,
    ...product,
  };
  await Product.create(newProduct);
  return newProduct;
};

const getProducts = async () => {
  const allProducts = await Product.findAll({
    include: [
      { model: Category, as: 'Category' },
      { model: Brand, as: 'Brand' },
    ],
  });
  return allProducts;
};

const getProduct = async (id) => {
  const product = await Product.findByPk(id, {
    include: [
      { model: Category, as: 'Category' },
      { model: Brand, as: 'Brand' },
    ],
  });
  return product;
};

const updateProduct = async (id, body) => {
  let updatedProduct = await getProduct(id);
  if (updatedProduct) {
    if (body.name) {
      const thisProduct = await Product.findAll({
        where: { name: body.name },
      });
      if (thisProduct.length > 0) {
        const error = { message: `The product "${body.name}" already exists` };
        return error;
      }
    }
    updatedProduct = await Product.update({ ...body }, { where: { id } });
    return { message: `Product successfully updated` };
  }
  return updatedProduct;
};

const deleteProduct = async (id) => {
  let product = await getProduct(id);
  if (product) {
    await product.destroy({
      where: { id },
    });
  }
  return product;
};

export default {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
