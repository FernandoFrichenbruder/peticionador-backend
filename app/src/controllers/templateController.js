const { Template, Variable, Category } = require('../models');

class TemplateController {
  async list(req, res, next) {
    try {
      const templates = await Template.findAll({
        include: ['categories', 'variables'],
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
        include: ['categories', 'variables'],
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
    const { title, text, categories, variables } = req.body;

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
        await template.addCategories(cats);
      }

      if (variables && variables.length > 0) {
        const vars = await Variable.findAll({
          where: {
            id: variables,
          },
        });
        await template.addVariables(vars);
      }

      res.status(201).json(template);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    const { id } = req.params;
    const { title, text, categories, variables } = req.body;

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
          await template.setCategories(cats);
        }

        if (variables) {
          const vars = await Variable.findAll({
            where: {
              id: variables,
            },
          });
          await template.setVariables(vars);
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
