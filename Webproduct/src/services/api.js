import axios from "axios";
import tokenservice from "./token.service";

// กำหนด base URL จากตัวแปรสภาพแวดล้อม
const baseURL = import.meta.env.VITE_BASE_URL;
console.log(baseURL);

// สร้าง Axios instance
const instance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// เพิ่ม interceptor สำหรับการจัดการ request
instance.interceptors.request.use(
  (config) => {
    const token = tokenservice.getLocalAccessToken(); // ดึง token จาก token service
    if (token) {
      config.headers['x-access-token'] = token; // เพิ่ม token ลงใน headers
    }
    return config; // คืนค่า config ที่ปรับปรุงแล้ว
  },
  (error) => {
    return Promise.reject(error); // จัดการข้อผิดพลาดใน request
  }
);

export default instance;
