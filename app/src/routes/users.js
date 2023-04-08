const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", userController.create);
router.get("/", userController.list);
router.get("/:id", authMiddleware, userController.getById);
router.put("/:id", authMiddleware, userController.update);
router.delete("/:id", authMiddleware, userController.delete);
router.post("/login", userController.login);
router.post("/logout", authMiddleware, userController.logout);

module.exports = router;