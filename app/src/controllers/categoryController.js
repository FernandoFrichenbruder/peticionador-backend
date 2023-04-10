const Category  = require('../models/Category');
const Template = require('../models/Template');

class CategoryController {
  async list(req, res) {
    try {
      const categories = await Category.findAll({
        include: [
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
    const { name, parentId } = req.body;
  
    try {
      let category = await Category.findByPk(id);
  
      if (!category) {
        res.status(404).json({ message: 'Category not found' });
        return;
      }
  
      category.name = name;
      await category.save();
  
      if (parentId) {
        const parentCategory = await Category.findByPk(parentId);
  
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
  
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  }
  
}

module.exports = new CategoryController();