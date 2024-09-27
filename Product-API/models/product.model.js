const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: { // ประเภทสินค้า เช่น PC, Laptop, Mobile, Tablet
    type: DataTypes.ENUM("PC", "Laptop", "Mobile", "Tablet"),
    allowNull: false,
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  specs: {
    type: DataTypes.TEXT, // สเปคที่ละเอียด
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Product.sync({ force: false })
  .then(() => {
    console.log("Product table created or already exists");
  })
  .catch((error) => {
    console.error("Unable to create table:", error);
  });

module.exports = Product;
