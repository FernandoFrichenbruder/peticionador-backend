const User = require('../models/User');
const jwt = require('jsonwebtoken');

class UserController {
  async list(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getById(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async create(req, res) {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
      active: req.body.active,
    });

    try {
      const newUser = await user.save();
      res.status(201).json(newUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async update(req, res) {
    try {
      // Check if user is an administrator
      const currentUser = await User.findById(req.user.id);
      if (currentUser.role !== "administrator") {
        return res.status(401).json({ msg: "Unauthorized" });
      }
  
      // Find the user by id
      let user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
  
      // Update the user
      user = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
  
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }

  async delete(req, res) {
    // verificar se o usuário logado é um administrador
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (user.role !== 'administrator') {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // deletar o usuário
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json(deletedUser);
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: {
          email
        }
      });

      if (!user) {
        return res.status(401).json({ message: "Usuário não encontrado" });
      }

      if (!(await user.comparePassword(password, user.password))) {
        return res.status(401).json({ message: "Senha incorreta" });
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      res.json({
        message: "Login realizado com sucesso",
        token,
      });
    } catch (error) {
      res.status(500).json({ message: "Erro ao realizar login", error });
    }
  }

  async logout(req, res) {
    try {
      const token = req.header("Authorization").replace("Bearer ", "");
      jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
          return res
            .status(401)
            .json({ message: "Token inválido, realizar login novamente" });
        }

        req.user = decoded;
      });

      res.json({
        message: "Logout realizado com sucesso",
      });
    } catch (error) {
      res.status(500).json({ message: "Erro ao realizar logout", error });
    }
  }

}

module.exports = new UserController();