const { Peticoes } = require('../models');

const createPeticoes = async (req, res, next) => {
  try {
    const { title, text } = req.body;
    const peticao = await Peticoes.create({ title, text });
    return res.status(201).json(peticao);
  } catch (error) {
    next(error);
  }
};

const listPeticoes = async (req, res, next) => {
  try {
    const peticoes = await Peticoes.findAll();
    return res.json(peticoes);
  } catch (error) {
    next(error);
  }
};

const getPeticoesById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const peticao = await Peticoes.findByPk(id);
    if (!peticao) {
      return res.status(404).json({ message: 'Peticao nao encontrada.' });
    }
    return res.json(peticao);
  } catch (error) {
    next(error);
  }
};

const updatePeticoes = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, text } = req.body;
    const peticao = await Peticoes.findByPk(id);
    if (!peticao) {
      return res.status(404).json({ message: 'Peticao nao encontrada.' });
    }
    await peticao.update({ title, text });
    return res.json(peticao);
  } catch (error) {
    next(error);
  }
};

const removePeticoes = async (req, res, next) => {
  try {
    const { id } = req.params;
    const peticao = await Peticoes.findByPk(id);
    if (!peticao) {
      return res.status(404).json({ message: 'Peticao nao encontrada.' });
    }
    await peticao.destroy();
    return res.json({ message: 'Peticao removida com sucesso.' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPeticoes,
  listPeticoes,
  getPeticoesById,
  updatePeticoes,
  removePeticoes,
};
