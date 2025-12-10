import pool from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
    try {
        const { email, password, pais } = req.body;

        if (!email || !password || !pais) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        const [rows] = await pool.query(
            'SELECT * FROM users WHERE email = ? AND estatus = 1',
            [email]
        );

        if (rows.length === 0) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const user = rows[0];

        if (user.pais !== pais) {
            return res.status(403).json({
                message: `Acceso denegado: Este usuario no pertenece a la región ${pais}.`
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const token = jwt.sign(
            { id: user.id, rol: user.rol, pais: user.pais },
            process.env.JWT_SECRET,
            { expiresIn: '8h' }
        );

        res.json({
            message: 'Login exitoso',
            token,
            user: {
                id: user.id,
                nombre: user.nombre,
                rol: user.rol,
                pais: user.pais
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};