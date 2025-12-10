import express from 'express';
import cors from 'cors';
import { connectDB } from './src/config/db.js';
import authRoutes from './src/routes/authRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
connectDB();
app.use('/api/auth', authRoutes);
app.get('/', (req, res) => {
    res.send('API SAVINCO Funcionando correctamente');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});