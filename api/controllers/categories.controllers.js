import categoryService from '../services/categories.services.js';

//CREATE CATEGORY
const createCategory = async (req, res) => {
  const category = req.body;
  try {
    const createdCategory = await categoryService.createCategory(category);
    return res
      .status(201)
      .send({ message: 'Category Successfuly Created', createdCategory });
  } catch (err) {
    return res.status(500).send({ message: `Server error: ${err.message}` });
  }
};

//READ ALL CATEGORIES
const getCategories = async (req, res) => {
  try {
    const categories = await categoryService.getCategories();
    return res.status(201).json(categories);
  } catch (err) {
    return res.status(500).send({ message: `Server error: ${err.message}` });
  }
};

//READ ONE CATEGORY
const getCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await categoryService.getCategory(id);
    if (!category) {
      return res
        .status(409)
        .send({ message: `The category ID: "${id}" does not exist` });
    }
    return res.status(201).send(category);
  } catch (err) {
    return res.status(500).send({ message: `Server error: ${err.message}` });
  }
};

//UPDATE CATEGORY
const updateCategory = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const updatedCategory = await categoryService.updateCategory(id, body);
    if (!updatedCategory) {
      return res
        .status(409)
        .send({ message: `The category ID: "${id}" does not exist` });
    }
    return res.status(201).send(updatedCategory);
  } catch (err) {
    return res.status(500).send({ message: `Server error: ${err.message}` });
  }
};

//DELETE CATEGORY
const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCategory = await categoryService.deleteCategory(id);
    if (!deletedCategory) {
      return res
        .status(409)
        .send({ message: `The category ID: "${id}" does not exist` });
    }
    return res.status(201).send({
      message: `The category: "${deletedCategory.name}" was successfully deleted`,
    });
  } catch (err) {
    return res.status(500).send({ message: `Server error: ${err.message}` });
  }
};

export {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
