const express = require("express");
const router = express.Router();
const productController = require("../controllers/Product.controller");
const { authJwt } = require("../middlewares");

// สร้างผลิตภัณฑ์ (เฉพาะ Moderator หรือ Admin เท่านั้น)
router.post(
  "/",
  // [authJwt.verifyToken, authJwt.isModOrAdmin], 
  productController.create
);

// ดึงข้อมูลผลิตภัณฑ์ทั้งหมด
router.get("/", productController.getAll);

// ดึงข้อมูลผลิตภัณฑ์ตาม ID
router.get("/:id", [authJwt.verifyToken], productController.getById);

// อัปเดตข้อมูลผลิตภัณฑ์ (เฉพาะ Moderator หรือ Admin เท่านั้น)
router.put(
  "/:id",
  [authJwt.verifyToken, authJwt.isModOrAdmin], 
  productController.update
);

// ลบผลิตภัณฑ์ (เฉพาะ Admin เท่านั้น)
router.delete(
  "/:id",
  [authJwt.verifyToken, authJwt.isAdmin], 
  productController.delete
);

module.exports = router;
