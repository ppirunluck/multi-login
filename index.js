import express from 'express';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
dotenv.config();
// import db from './config/Database.js';
import UserRoute from './routes/UserRoute.js';
import ProductRoute from './routes/ProductRoute.js';

const app = express();

// (async () => {
//     try {
//         await db.sync();  // รอให้ฐานข้อมูลทำการ sync ก่อนการรันเซิร์ฟเวอร์
//         console.log('Database synced successfully.');
//     } catch (error) {
//         console.error('Failed to sync database:', error);
//     }
// })();  // ต้องเพิ่ม () เพื่อให้ฟังก์ชัน async ถูกเรียกใช้งาน

app.use(session({
    secret: process.env.SESS_SECRET,  // ใช้ secret จากไฟล์ .env
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: 'auto'  // ใช้ secure cookie เมื่อใช้ https
    }
}));

app.use(cors({
    credentials: true,  // อนุญาตการส่ง cookie
    origin: 'http://localhost:3000/'  // อนุญาตการเข้าถึงจาก client ที่รันบน localhost:3000
}));

app.use(express.json());
app.use(UserRoute);  // เส้นทางสำหรับผู้ใช้
app.use(ProductRoute);  // เส้นทางสำหรับผลิตภัณฑ์

app.listen(process.env.APP_PORT, () => {
    console.log(`Server is running on port ${process.env.APP_PORT}`);
});
