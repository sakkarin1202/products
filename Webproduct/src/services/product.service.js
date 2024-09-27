import api from "./api"; 

const BASE_URL = import.meta.env.VITE_BASE_URL; // ใช้ตัวแปรพื้นฐาน
const PRODUCT_API = `${BASE_URL}${import.meta.env.VITE_PRODUCT_API}`; // สร้าง URL สำหรับสินค้า

console.log(PRODUCT_API);

// ดึงสินค้าทั้งหมด
const getAllProducts = async () => {
  return await api.get(PRODUCT_API); 
};

// ดึงสินค้าตาม ID
const getProductById = async (id) => {
  return await api.get(`${PRODUCT_API}/${id}`); 
};

// เพิ่มสินค้าใหม่
const insertProduct = async (product) => {
  return await api.post(PRODUCT_API, product); 
};

// แก้ไขข้อมูลสินค้า
const editProduct = async (id, product) => {
  return await api.put(`${PRODUCT_API}/${id}`, product); 
};

// ลบสินค้า
const deleteProduct = async (id) => {
  return await api.delete(`${PRODUCT_API}/${id}`); 
};

// Export the service 
const ProductService = {
  getAllProducts,
  getProductById,
  insertProduct,
  editProduct,
  deleteProduct,
};

export default ProductService;
