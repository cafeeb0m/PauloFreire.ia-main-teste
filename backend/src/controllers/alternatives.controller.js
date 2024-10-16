import { pool } from '../database/db.js';

export async function getCols(_req, res) {
    try {
        const [rows] = await pool.query('DESC Alternativas');
        return res.status(200).json(rows);
    } catch (error) {
        return res.json(error);
    }
}

export async function getAlternatives(_req, res) {
    try {
        const [rows] = await pool.query('SELECT * FROM Alternativas');
        return res.status(200).json(rows);
    } catch (error) {
        return res.json(error);
    }
}

export async function getAlternative(req, res) {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM Alternativas WHERE codAlternativa = ?',
            req.params.id
        );
        return res.status(200).json(rows);
    } catch (error) {
        return res.json(error);
    }
}

export async function createAlternative(req, res) {
    try {
        const values = [
            req.body.alternativa,
            req.body.correta,
            req.body.codQuestao,
        ];
        const [rows] = await pool.query(
            'INSERT INTO Alternativas (Alternativa, Correta, codQuestao) VALUES (?, ?, ?)',
            values
        );
        return res.status(200).json({
            success: true,
            message: 'Alternativa criada com sucesso',
            rows,
        });
    } catch (error) {
        return res.json(error);
    }
}

export async function updateAlternative(req, res) {
    try {
        const values = [
            req.body.alternativa,
            req.body.correta,
            req.body.codQuestao,
            req.params.id,
        ];
        const [rows] = await pool.query(
            'UPDATE Alternativas SET Alternativa = ?, Correta = ?, codQuestao = ? WHERE codAlternativa = ?',
            values
        );
        return res.status(200).json({
            success: true,
            message: 'Alternativa atualizada com sucesso',
            rows,
        });
    } catch (error) {
        return res.json(error);
    }
}

export async function deleteAlternative(req, res) {
    try {
        const [rows] = await pool.query(
            'DELETE FROM Alternativas WHERE codAlternativa = ?',
            req.params.id
        );
        return res.status(200).json({
            success: true,
            message: 'Alternativa excluida com sucesso',
            rows,
        });
    } catch (error) {
        return res.json(error);
    }
}
