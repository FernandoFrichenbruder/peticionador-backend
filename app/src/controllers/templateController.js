const { Template, Category } = require('../models');
const { Op } = require("sequelize");

class TemplateController {
  async list(req, res, next) {
    try {
      const templates = await Template.findAll({
        include: [
          {
            model: Category,
            as: 'CategoryTemplate',
            attributes: ["id", "name"],
            through: {
              attributes: [],
            }
          },
          {
            model: Template,
            as: 'ParentTemplate',
            attributes: ["id", "title"],
            through: {
              attributes: [],
            }
          },
        ],
      });
      res.json(templates);
    } catch (error) {
      console.error("Error: ", error);
      next(error);
    }
  }

  async filterTemplatesByCategory(req, res) {
    console.log("O CÓDIFO CHEGOU AQUI");
    console.log("req.body", req.body)
    const { type, categories } = req.body;
    const where = type === 'all' ? {} : { type };
    const whereCategories = categories && categories.length > 0 ? { id: categories.id } : {};

    try {
      const templates = await Template.findAll({
        include: [
          {
            model: Category,
            as: 'CategoryTemplate',
            attributes: [],
            through: {
              attributes: [],
            },
            whereCategories,
          },
          {
            model: Template,
            as: 'ParentTemplate',
            attributes: ["id", "title"],
            through: {
              attributes: [],
            },
          },
        ],
        where,
        attributes: ["id", "title", "type"],
      });

      res.status(200).json(templates);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  }

  async getTemplatesByCategories(req, res) {
    try {
      const categories = req.body.categories;
      if (!categories || categories.length === 0) {
        const templates = await Template.findAll({
          attributes: ["id", "title", "type"],
        });

        res.status(200).send(templates);
      } else {
        const templates = await Template.findAll({
          include: [
            {
              model: Category,
              as: 'CategoryTemplate',
            },
          ],
          attributes: ["id", "title", "type"],
          where: {
            '$CategoryTemplate.id$': { [Op.in]: categories }
          }
        });
        console.log("O CÓDIFO CHEGOU AQUI");
        res.status(200).send(templates);
      }

    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Erro ao buscar templates por categorias" });
    }
  };


  async getById(req, res, next) {
    const { id } = req.params;

    try {
      const template = await Template.findByPk(id, {
        include: [
          {
            model: Category,
            as: 'CategoryTemplate',
            attributes: ["id", "name"],
            through: {
              attributes: [],
            }
          },
          {
            model: Template,
            as: 'ParentTemplate',
            attributes: ["id", "title"],
            through: {
              attributes: [],
            }
          },
        ],
      });

      if (template) {
        res.json(template);
      } else {
        res.status(404).send({
          message: 'Não foi possível encontrar o template com o ID fornecido',
        });
      }
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    const { title, text, type, categories, templates } = req.body;
    console.log("Categories: ");
    console.log(categories);
    console.log("Templates: ");
    console.log(templates);
    try {
      const template = await Template.create({
        title,
        text,
        type,
      });

      if (categories && categories.length > 0) {
        const cats = await Category.findAll({
          where: {
            id: categories,
          },
        });
        await template.addCategoryTemplate(cats);
      }

      if (templates && templates.length > 0) {
        const temp = await Template.findAll({
          where: {
            id: templates,
          },
        })
        await template.addParentTemplate(temp);
      }


      res.status(201).json(template);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    const { id } = req.params;
    const { title, text, type, categories, templates } = req.body;

    try {
      const template = await Template.findByPk(id);

      if (template) {
        await template.update({
          title,
          text,
          type,
        });

        if (categories) {
          const cats = await Category.findAll({
            where: {
              id: categories,
            },
          });
          await template.setCategoryTemplate(cats);
        }

        if (templates) {
          const temp = await Template.findAll({
            where: {
              id: templates,
            },
          })
          if (!temp) {
            res.status(404).json({ message: 'Parent Template not found.' });
            return;
          }
          await template.setParentTemplate(temp);
        }

        res.json(template);
      } else {
        res.status(404).send({
          message: 'Não foi possível encontrar o template com o ID fornecido',
        });
      }
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    const { id } = req.params;

    try {
      const deleted = await Template.destroy({
        where: {
          id,
        },
      });

      if (deleted) {
        res.sendStatus(204);
      } else {
        res.status(404).send({
          message: 'Não foi possível encontrar o template com o ID fornecido',
        });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TemplateController();
