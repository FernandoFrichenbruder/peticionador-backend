const Category  = require('../models/Category');
const Template = require('../models/Template');

class CategoryController {
  //define variavel de associação com array do include
  static associations = [
    { model: Category,
      as: 'ParentCategory',
      attributes: ["id", "name"],
      through: {
        attributes: [],
      }
    },
    { model: Category,
      as: 'ChildCategory',
      attributes: ["id", "name"],
      through: {
        attributes: [],
      }
    },
    { model: Template,
      as: 'TemplateCategory',
      attributes: ["id", "title"],
      through: {
        attributes: [],
      }
    },
  ];

  async list(req, res) {
    try {
      const categories = await Category.findAll({
        include: CategoryController.associations
      });
      res.status(200).json(categories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  }

  async filterCategoriesByType(req, res) {
    const type = req.params.id;
    const where = type === 'all' ? {} : { type };
    console.log(where);
    try {
      const categories = await Category.findAll({
        where,
        attributes: ["id", "name"],
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
        include: CategoryController.associations
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
    const { name, type, categories } = req.body;
    try {
      let newCategory = await Category.create({ name, type });
      if (categories) {
        const parentCategory = await Category.findAll({
          where: {
            id: categories
          }
        });
        if (!parentCategory) {
          res.status(404).json({ message: 'Parent category not found' });
          return;
        }
        await newCategory.addParentCategory(parentCategory);
      }
      res.status(201).json(newCategory);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  }
  
  


  async update(req, res) {
    const { id } = req.params;
    const { name, type, categories } = req.body;
  
    try {
      let category = await Category.findByPk(id);
  
      if (!category) {
        res.status(404).json({ message: 'Category not found' });
        return;
      }
  
      category.name = name;
      category.type = type;
      await category.save();
  
      if (categories) {
        const parentCategory = await Category.findAll({
          where: {
            id: categories
          }
        });
  
        if (!parentCategory) {
          res.status(404).json({ message: 'Parent category not found' });
          return;
        }
  
        await category.setParentCategory(parentCategory);
      }
  
      res.status(200).json(category);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  }
  
  

  async delete(req, res) {
    const { id } = req.params;
    try {
      const category = await Category.findByPk(id);
      if (!category) {
        res.status(404).json({ message: 'Category not found' });
        return;
      }
  
      // Excluindo as relações da tabela category_hierarchy
      await category.removeChildCategory();
      await category.removeParentCategory();
  
      // Excluindo a categoria
      await category.destroy();

      console.log("DELETOU COM SUCESSO")
  
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  }
  
}

module.exports = new CategoryController();