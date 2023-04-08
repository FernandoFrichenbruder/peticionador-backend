const { Category, CategoryHierarchy } = require('../models');

class CategoryController {
  async list(req, res) {
    try {
      const categories = await Category.findAll({
        include: [
          { model: Category, as: 'ParentCategories' },
          { model: Category, as: 'ChildCategories' },
          { model: CategoryHierarchy },
        ],
      });
      res.status(200).json(categories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  }

  async getById(req, res) {
    const categoryId = req.params.id;
    try {
      const category = await Category.findByPk(categoryId, {
        include: [
          { model: Category, as: 'ParentCategories' },
          { model: Category, as: 'ChildCategories' },
          { model: CategoryHierarchy },
        ],
      });
      if (!category) {
        res.status(404).json({ message: 'Category not found' });
      } else {
        res.status(200).json(category);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  }

  async create(req, res) {
    const { name, parentId } = req.body;
    try {
      let newCategory = await Category.create({ name });
      if (parentId) {
        const parentCategory = await Category.findByPk(parentId);
        if (!parentCategory) {
          res.status(404).json({ message: 'Parent category not found' });
          return;
        }
        const categoryHierarchy = await CategoryHierarchy.create({
          parent_category_id: parentCategory.id,
          child_category_id: newCategory.id,
        });
        newCategory = await Category.findByPk(categoryHierarchy.child_category_id, {
          include: [
            { model: Category, as: 'ParentCategories' },
            { model: Category, as: 'ChildCategories' },
            { model: CategoryHierarchy },
          ],
        });
      }
      res.status(201).json(newCategory);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  }
  


  async update(req, res) {
    const categoryId = req.params.id;
    const { name, parentId } = req.body;
    try {
      const category = await Category.findByPk(categoryId);
      if (!category) {
        res.status(404).json({ message: 'Category not found' });
        return;
      }
      await category.update({ name });
      if (parentId) {
        const parentCategory = await Category.findByPk(parentId);
        if (!parentCategory) {
          res.status(404).json({ message: 'Parent category not found' });
          return;
        }
        const categoryHierarchy = await CategoryHierarchy.findOne({
          where: {
            child_category_id: categoryId,
          },
        });
        if (categoryHierarchy) {
          await categoryHierarchy.update({ parent_category_id: parentCategory.id });
        } else {
          await CategoryHierarchy.create({
            parent_category_id: parentCategory.id,
            child_category_id: categoryId,
          });
        }
      }
      const updatedCategory = await Category.findByPk(categoryId, {
        include: [
          { model: Category, as: 'ParentCategories' },
          { model: Category, as: 'ChildCategories' },
          { model: CategoryHierarchy },
        ],
      });
      res.status(200).json(updatedCategory);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  }
  

  async delete(req, res) {
    const categoryId = req.params.id;

    try {
      const category = await Category.findByPk(categoryId);
      if (!category) {
        res.status(404).json({ message: 'Category not found' });
        return;
      }

      await sequelize.transaction(async (t) => {
        // Delete the category hierarchy
        await CategoryHierarchy.destroy({
          where: { categoryId },
          transaction: t,
        });

        // Delete the category
        await category.destroy({ transaction: t });
      });

      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  }
}

module.exports = new CategoryController();