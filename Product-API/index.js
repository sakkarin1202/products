const express = require("express");
const app = express();
require("dotenv").config();
const ProductRouter = require("./routers/product.router");
const PORT = process.env.PORT || 5000;
const authController = require("./routers/auth.router");
const db = require("./models/");
const role = db.Role;
const cors = require("cors");

const corsOption = {
  origin: "http://localhost:3000",
};

// Development mode: ถ้าต้องการล้างฐานข้อมูลแล้วสร้างใหม่
//  db.sequelize.sync({ force: true }).then(() => {
//    initRole();
//    console.log("Drop and sync DB");
//  });

// ฟังก์ชันสำหรับตั้งค่า role ในฐานข้อมูล
const initRole = () => {
  role.create({ id: 1, name: "user" });
  role.create({ id: 2, name: "moderator" });
  role.create({ id: 3, name: "admin" });
};

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOption));

// ตั้งค่าเส้นทางสำหรับ Product และ Auth
app.use("/api/v1/products", ProductRouter);
app.use("/api/v1/auth", authController);

// เส้นทางหลัก
app.get("/", (req, res) => {
  res.send("<h1>Hello Product API</h1>");
});

// เริ่มเซิร์ฟเวอร์
app.listen(PORT, () => {
  console.log("Listening to http://localhost:" + PORT);
});
