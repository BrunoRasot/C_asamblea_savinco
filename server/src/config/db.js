import { createPool } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export const connectDB = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Base de datos SAVINCO conectada');
        connection.release();
    } catch (error) {
        console.error('Error conectando a BD:', error.message);
    }
};

export default pool;