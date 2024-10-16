import { pool } from '../database/db.js';

export async function getCols(_req, res) {
    try {
        const [rows] = await pool.query('DESC Disciplinas');
        return res.status(200).json(rows);
    } catch (error) {
        return res.json(error);
    }
}

export async function getSubjects(_req, res) {
    try {
        const [rows] = await pool.query('SELECT * FROM Disciplinas');
        return res.status(200).json(rows);
    } catch (error) {
        return res.json(error);
    }
}

export async function getSubject(req, res) {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM Disciplinas WHERE codDisciplina = ?',
            req.params.id
        );
        return res.status(200).json(rows);
    } catch (error) {
        return res.json(error);
    }
}

export async function createSubject(req, res) {
    try {
        const values = [req.body.nome];
        const [rows] = await pool.query(
            'INSERT INTO Disciplinas (Nome) VALUES (?)',
            values
        );
        return res.status(200).json({
            success: true,
            message: 'Disciplina criada com sucesso',
            rows,
        });
    } catch (error) {
        return res.json(error);
    }
}

export async function updateSubject(req, res) {
    try {
        const values = [req.body.nome, req.params.id];
        const [rows] = await pool.query(
            'UPDATE Disciplinas SET Nome = ? WHERE codDisciplina = ?',
            values
        );
        return res.status(200).json({
            success: true,
            message: 'Disciplina atualizada com sucesso',
            rows,
        });
    } catch (error) {
        return res.json(error);
    }
}

export async function deleteSubject(req, res) {
    try {
        const [rows] = await pool.query(
            'DELETE FROM Disciplinas WHERE codDisciplina = ?',
            req.params.id
        );
        return res.status(200).json({
            success: true,
            message: 'Disciplina excluida com sucesso',
            rows,
        });
    } catch (error) {
        return res.json(error);
    }
}
