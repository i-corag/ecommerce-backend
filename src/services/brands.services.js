import crypto from 'crypto';
import Brand from '../models/Brand.model.js';

const createBrand = async (brand) => {
  let newBrand = await Brand.findAll({
    where: { name: brand.name },
  });
  if (newBrand.length > 0) {
    return {
      success: false,
      message: `The brand "${brand.name}" already exists`,
    };
  } else {
    const id = crypto.randomBytes(10).toString('hex');
    newBrand = {
      id,
      ...brand,
    };
    await Brand.create(newBrand);
    return {
      newBrand,
      success: true,
      message: `The brand "${brand.name}" successfully add`,
    };
  }
};

const getBrands = async () => {
  const allBrands = await Brand.findAll();
  return allBrands;
};

const getBrand = async (id) => {
  const brand = await Brand.findByPk(id);
  return brand;
};

const updateBrand = async (id, body) => {
  let updatedBrand = await getBrand(id);
  if (updatedBrand) {
    const brandName = await Brand.findAll({
      where: { name: body.name },
    });
    if (brandName.length > 0) {
      const error = { message: `The brand "${body.name}" already exists` };
      return error;
    }
    updatedBrand = await Brand.update({ name: body.name }, { where: { id } });
    return { message: `Brand successfully updated` };
  }
  return updatedBrand;
};

const deleteBrand = async (id) => {
  let brand = await getBrand(id);
  if (brand) {
    await Brand.destroy({
      where: { id },
    });
  }
  return brand;
};

export default {
  createBrand,
  getBrands,
  getBrand,
  updateBrand,
  deleteBrand,
};
