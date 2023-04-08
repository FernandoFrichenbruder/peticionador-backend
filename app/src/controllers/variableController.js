const { Variable } = require('../models');

class VariableController {
  async list(req, res) {
    try {
      const variables = await Variable.findAll();
      res.send(variables);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: 'Ocorreu um erro ao recuperar as variáveis',
      });
    }
  }

  async getById(req, res) {
    const { id } = req.params;

    try {
      const variable = await Variable.findByPk(id);

      if (variable) {
        res.send(variable);
      } else {
        res.status(404).send({
          message: 'Não foi possível encontrar a variável com o ID fornecido',
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: 'Ocorreu um erro ao recuperar a variável',
      });
    }
  }

  async create(req, res) {
    const { name, type } = req.body;

    try {
      const variable = await Variable.create({
        name,
        type,
      });

      res.send(variable);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: 'Ocorreu um erro ao criar a variável',
      });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const { name, type } = req.body;

    try {
      const updatedRows = await Variable.update(
        {
          name,
          type,
        },
        {
          where: { id },
        }
      );

      if (updatedRows > 0) {
        res.send({
          message: `Variável com id=${id} atualizada com sucesso`,
        });
      } else {
        res.status(404).send({
          message: 'Não foi possível encontrar a variável com o ID fornecido',
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: 'Ocorreu um erro ao atualizar a variável',
      });
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      const deleted = await Variable.destroy({
        where: {
          id,
        },
      });

      if (deleted) {
        res.sendStatus(204);
      } else {
        res.status(404).send({
          message: 'Não foi possível encontrar a variável com o ID fornecido',
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: 'Ocorreu um erro ao remover a variável',
      });
    }
  }
}

module.exports = new VariableController();