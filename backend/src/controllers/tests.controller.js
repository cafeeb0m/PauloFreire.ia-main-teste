import { pool } from '../database/db.js';

export async function getCols(_req, res) {
    try {
        const [rows] = await pool.query('DESC Simulados');
        return res.status(200).json(rows);
    } catch (error) {
        return res.json(error);
    }
}

export async function getTests(_req, res) {
    try {
        const [rows] = await pool.query('SELECT * FROM Simulados');
        return res.status(200).json(rows);
    } catch (error) {
        return res.json(error);
    }
}

export async function getTest(req, res) {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM Simulados WHERE codSimulado = ?',
            req.params.id
        );
        return res.status(200).json(rows);
    } catch (error) {
        return res.json(error);
    }
}

export async function createTest(req, res) {
    try {
        const values = [req.body.ano, req.body.idPerfil];
        const [rows] = await pool.query(
            'INSERT INTO Simulados (Ano, idPerfil) VALUES (?, ?)',
            values
        );
        return res.status(200).json({
            success: true,
            message: 'Simulado criado com sucesso',
            rows,
        });
    } catch (error) {
        return res.json(error);
    }
}

export async function updateTest(req, res) {
    try {
        const values = [req.body.ano, req.body.idPerfil, req.params.id];
        const [rows] = await pool.query(
            'UPDATE Simulados SET Ano = ?, idPerfil = ? WHERE codSimulado = ?',
            values
        );
        return res.status(200).json({
            success: true,
            message: 'Simulado atualizado com sucesso',
            rows,
        });
    } catch (error) {
        return res.json(error);
    }
}

export async function deleteTest(req, res) {
    try {
        const [rows] = await pool.query(
            'DELETE FROM Simulados WHERE codSimulado = ?',
            req.params.id
        );
        return res.status(200).json({
            success: true,
            message: 'Simulado excluido com sucesso',
            rows,
        });
    } catch (error) {
        return res.json(error);
    }
}
