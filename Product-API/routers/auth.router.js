const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const verifySignUp = require("../middlewares/verifySignUp");
const User = require("../models/user.model"); // นำเข้า User model

router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token,Origin,Content-Type,Accept"
  );
  next();
});

router.post(
  "/signup",
  [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
  authController.signup
);

router.post("/signin", authController.signin);

// เส้นทางเพื่อดึงข้อมูลผู้ใช้ทั้งหมด
router.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();
    res.send(users);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
// เส้นทางเพื่อดึงข้อมูลผู้ใช้ตาม ID
router.get("/users/:id", async (req, res) => {
  const userId = req.params.id;
  
  try {
    const user = await User.findByPk(userId); // ค้นหาผู้ใช้ตาม primary key
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.send(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});


module.exports = router;
