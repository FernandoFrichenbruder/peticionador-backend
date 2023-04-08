const { Document } = require('../models');

class DocumentController {
  async create(req, res, next) {
    try {
      const { title, text, type } = req.body;
      const document = await Document.create({ title, text, type });
      return res.status(201).json(document);
    } catch (error) {
      next(error);
    }
  }

  async list(req, res, next) {
    try {
      const { type } = req.query;
      const documents = type ? await Document.findAll({ where: { type } }) : await Document.findAll();
      return res.json(documents);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const document = await Document.findByPk(id);
      if (!document) {
        return res.status(404).json({ message: 'Documento não encontrado.' });
      }
      return res.json(document);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { title, text, type } = req.body;
      const document = await Document.findByPk(id);
      if (!document) {
        return res.status(404).json({ message: 'Documento não encontrado.' });
      }
      await document.update({ title, text, type });
      return res.json(document);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const document = await Document.findByPk(id);
      if (!document) {
        return res.status(404).json({ message: 'Documento não encontrado.' });
      }
      await document.destroy();
      return res.json({ message: 'Documento removido com sucesso.' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new DocumentController();
