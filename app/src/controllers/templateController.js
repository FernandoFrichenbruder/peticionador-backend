const db = require('../models');

// Retorna todos os templates
const getAll = async (req, res) => {
    try {
        const templates = await db.Template.findAll({
            include: ['categories', 'variables'],
        });
        res.json(templates);
    } catch (error) {
        res.status(500).send({
            message: 'Ocorreu um erro ao buscar os templates',
        });
    }
};

// Retorna um template por ID
const getById = async (req, res) => {
    const { id } = req.params;

    try {
        const template = await db.Template.findByPk(id, {
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
        res.status(500).send({
            message: 'Ocorreu um erro ao buscar o template',
        });
    }
};

// Cria um novo template
const create = async (req, res) => {
    const { title, text, categories, variables } = req.body;

    try {
        const template = await db.Template.create({
            title,
            text,
        });

        if (categories && categories.length > 0) {
            const cats = await db.Category.findAll({
                where: {
                    id: categories,
                },
            });
            await template.addCategories(cats);
        }

        if (variables && variables.length > 0) {
            const vars = await db.Variable.findAll({
                where: {
                    id: variables,
                },
            });
            await template.addVariables(vars);
        }

        res.status(201).json(template);
    } catch (error) {
        res.status(500).send({
            message: 'Ocorreu um erro ao criar o template',
        });
    }
};

// Atualiza um template existente
const update = async (req, res) => {
    const { id } = req.params;
    const { title, text, categories, variables } = req.body;

    try {
        const template = await db.Template.findByPk(id);

        if (template) {
            await template.update({
                title,
                text,
            });

            if (categories) {
                const cats = await db.Category.findAll({
                    where: {
                        id: categories,
                    },
                });
                await template.setCategories(cats);
            }

            if (variables) {
                const vars = await db.Variable.findAll({
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
        res.status(500).send({
            message: 'Ocorreu um erro ao atualizar o template',
        });
    }
};

// Remove um template existente
const remove = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await db.Template.destroy({
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
        res.status(500).send({
            message: 'Ocorreu um erro ao remover o template',
        });
    }
};



