import { pool } from '../database/db.js';

export async function getCols(_req, res) {
    try {
        const [rows] = await pool.query('DESC DiaDisciplinas');
        return res.status(200).json(rows);
    } catch (error) {
        return res.json(error);
    }
}

export async function getDaysSubjects(_req, res) {
    try {
        const [rows] = await pool.query('SELECT * FROM DiaDisciplinas');
        return res.status(200).json(rows);
    } catch (error) {
        return res.json(error);
    }
}

export async function getDaySubject(req, res) {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM DiaDisciplinas WHERE codDiaDisciplina = ?',
            req.params.id
        );
        return res.status(200).json(rows);
    } catch (error) {
        return res.json(error);
    }
}

export async function createDaySubject(req, res) {
    try {
        const values = [req.body.codDiaUtil, req.body.codDisciplina];
        const [rows] = await pool.query(
            'INSERT INTO DiaDisciplinas (codDiaUtil, codDisciplina) VALUES (?, ?)',
            values
        );
        return res.status(200).json({
            success: true,
            message: 'Dia/disciplina criado com sucesso',
            rows,
        });
    } catch (error) {
        return res.json(error);
    }
}

export async function updateDaySubject(req, res) {
    try {
        const values = [
            req.body.codDiaUtil,
            req.body.codDisciplina,
            req.params.id,
        ];
        const [rows] = await pool.query(
            'UPDATE DiaDisciplinas SET codDiaUtil = ?, codDisciplina = ? WHERE codDiaDisciplina = ?',
            values
        );
        return res.status(200).json({
            success: true,
            message: 'Dia/disciplina atualizado com sucesso',
            rows,
        });
    } catch (error) {
        return res.json(error);
    }
}

export async function deleteDaySubject(req, res) {
    try {
        const [rows] = await pool.query(
            'DELETE FROM DiaDisciplinas WHERE codDiaDisciplina = ?',
            req.params.id
        );
        return res.status(200).json({
            success: true,
            message: 'Dia/disciplina excluido com sucesso',
            rows,
        });
    } catch (error) {
        return res.json(error);
    }
}
