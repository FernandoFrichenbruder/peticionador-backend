const { Template, Variable, Category } = require('../models');

class TemplateController {
  async list(req, res, next) {
    try {
      const templates = await Template.findAll({
        include: [
          { model: Category,
            as: 'CategoryTemplate',
            attributes: ["id", "name"],
            through: {
              attributes: [],
            }
          },
        ],
      });
      res.json(templates);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    const { id } = req.params;

    try {
      const template = await Template.findByPk(id, {
        include: [
          { model: Category,
            as: 'CategoryTemplate',
            attributes: ["id", "name"],
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
    const { title, text, categories } = req.body;

    try {
      const template = await Template.create({
        title,
        text,
      });

      if (categories && categories.length > 0) {
        const cats = await Category.findAll({
          where: {
            id: categories,
          },
        });
        await template.addCategoryTemplate(cats);
      }

      res.status(201).json(template);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    const { id } = req.params;
    const { title, text, categories } = req.body;

    try {
      const template = await Template.findByPk(id);

      if (template) {
        await template.update({
          title,
          text,
        });

        if (categories) {
          const cats = await Category.findAll({
            where: {
              id: categories,
            },
          });
          await template.setCategoryTemplate(cats);
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
