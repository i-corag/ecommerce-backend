import brandService from '../services/brands.services.js';

//CREATE BRAND
const createBrand = async (req, res) => {
  const brand = req.body;
  try {
    const createdBrand = await brandService.createBrand(brand);
    return res
      .status(201)
      .send({ message: 'Brand Successfuly Created', createdBrand });
  } catch (err) {
    return res.status(500).send({ message: `Server error: ${err.message}` });
  }
};

//READ ALL BRANDS
const getBrands = async (req, res) => {
  try {
    const brands = await brandService.getBrands();
    return res.status(201).send(brands);
  } catch (err) {
    return res.status(500).send({ message: `Server error: ${err.message}` });
  }
};

//READ ONE BRAND
const getBrand = async (req, res) => {
  const { id } = req.params;
  try {
    const brand = await brandService.getBrand(id);
    if (!brand) {
      return res
        .status(409)
        .send({ message: `The brand ID: ${id} does not exist` });
    }
    return res.status(201).send(brand);
  } catch (err) {
    return res.status(500).send({ message: `Server error: ${err.message}` });
  }
};

//UPDATE BRAND
const updateBrand = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const updatedBrand = await brandService.updateBrand(id, body);
    if (!updatedBrand) {
      return res
        .status(409)
        .send({ message: `The brand ID: "${id}" does not exist` });
    }
    return res.status(201).send(updatedBrand);
  } catch (err) {
    return res.status(500).send({ message: `Server error: ${err.message}` });
  }
};

//DELETE BRAND
const deleteBrand = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBrand = await brandService.deleteBrand(id);
    if (!deletedBrand) {
      return res
        .status(409)
        .send({ message: `The brand ID: "${id}" does not exist` });
    }
    return res.status(201).send({
      message: `The brand: "${deletedBrand.name}" was successfully deleted`,
    });
  } catch (err) {
    return res.status(500).send({ message: `Server error: ${err.message}` });
  }
};

export { createBrand, getBrands, getBrand, updateBrand, deleteBrand };
