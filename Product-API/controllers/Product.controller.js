const Product = require("../models/product.model");

// Create
exports.create = async (req, res) => {
  const { name, type, brand, specs, price, imageUrl } = req.body;
  
  // ตรวจสอบให้แน่ใจว่าทุกฟิลด์ที่จำเป็นมีค่าทั้งหมด
  if (!name || !type || !brand || !specs || price == null || !imageUrl) {
    return res.status(400).send({ message: "Name, Type, Brand, Specs, Price, or ImageUrl cannot be empty" });
  }

  try {
    const existingProduct = await Product.findOne({ where: { name, type } });

    if (existingProduct) {
      return res.status(400).send({ message: "Product already exists!" });
    }

    // สร้างผลิตภัณฑ์ใหม่โดยรวมค่าทั้งหมด
    const newProduct = await Product.create({ name, type, brand, specs, price, imageUrl });
    res.status(201).send(newProduct);
  } catch (error) {
    res.status(500).send({ message: error.message || "Something error occurred while creating the product." });
  }
};


// Get all
exports.getAll = async (req, res) => {
  try {
    const data = await Product.findAll();
    res.send(data);
  } catch (error) {
    res.status(500).send({ message: error.message || "Something error occurred while retrieving products." });
  }
};

// Get by ID
exports.getById = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Product.findByPk(id);
    if (!data) {
      return res.status(404).send({ message: "No found Product with id " + id });
    }
    res.send(data);
  } catch (error) {
    res.status(500).send({ message: error.message || "Something error occurred while retrieving the product." });
  }
};

// Update
exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    const [num] = await Product.update(req.body, { where: { id } });

    if (num === 1) {
      res.send({ message: "Product was updated successfully" });
    } else {
      res.send({ message: "Cannot update product with id " + id + ". Maybe product was not found or req.body is empty!" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message || "Something error occurred while updating the product." });
  }
};

// Delete
exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const num = await Product.destroy({ where: { id } });

    if (num === 1) {
      res.send({ message: "Product was deleted successfully" });
    } else {
      res.send({ message: "Cannot delete product with id=" + id + "." });
    }
  } catch (error) {
    res.status(500).send({ message: "Error deleting product with id=" + id, error: error.message });
  }
};
