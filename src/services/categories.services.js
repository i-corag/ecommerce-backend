import crypto from 'crypto';
import Category from '../models/Category.model.js';

const createCategory = async (category) => {
  let newCategory = await Category.findAll({
    where: { name: category.name },
  });
  if (newCategory.length > 0) {
    const error = { message: `The category "${category.name}" already exists` };
    return error;
  } else {
    const id = crypto.randomBytes(10).toString('hex');
    newCategory = {
      id,
      ...category,
    };
    await Category.create(newCategory);
    return newCategory;
  }
};

const getCategories = async () => {
  const allCategories = await Category.findAll();
  return allCategories;
};

const getCategory = async (id) => {
  const category = await Category.findByPk(id);
  return category;
};

const updateCategory = async (id, body) => {
  let updatedCategory = await getCategory(id);
  if (updatedCategory) {
    const categoryName = await Category.findAll({
      where: { name: body.name },
    });
    if (categoryName.length > 0) {
      const error = { message: `The category "${body.name}" already exists` };
      return error;
    }
    updatedCategory = await Category.update(
      { name: body.name },
      { where: { id } }
    );
    return { message: `Categoty successfully updated` };
  }
  return updatedCategory;
};

const deleteCategory = async (id) => {
  let category = await getCategory(id);
  if (category) {
    await category.destroy({ where: { id } });
  }
  return category;
};

export default {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
