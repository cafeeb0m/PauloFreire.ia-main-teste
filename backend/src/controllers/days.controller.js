import { pool } from '../database/db.js';

export async function getCols(_req, res) {
    try {
        const [rows] = await pool.query('DESC DiaUtil');
        return res.status(200).json(rows);
    } catch (error) {
        return res.json(error);
    }
}

export async function getDays(_req, res) {
    try {
        const [rows] = await pool.query('SELECT * FROM DiaUtil');
        return res.status(200).json(rows);
    } catch (error) {
        return res.json(error);
    }
}

export async function getDay(req, res) {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM DiaUtil WHERE codDiaUtil = ?',
            req.params.id
        );
        return res.status(200).json(rows);
    } catch (error) {
        return res.json(error);
    }
}

export async function createDay(req, res) {
    try {
        const values = [req.body.dia, req.body.codAgenda];
        const [rows] = await pool.query(
            'INSERT INTO DiaUtil (Dia, codAgenda) VALUES (?, ?)',
            values
        );
        return res.status(200).json({
            success: true,
            message: 'Dia útil criado com sucesso',
            rows,
        });
    } catch (error) {
        return res.json(error);
    }
}

export async function updateDay(req, res) {
    try {
        const values = [req.body.dia, req.body.codAgenda, req.params.id];
        const [rows] = await pool.query(
            'UPDATE DiaUtil SET Dia = ?, codAgenda = ? WHERE codDiaUtil = ?',
            values
        );
        return res.status(200).json({
            success: true,
            message: 'Dia útil atualizado com sucesso',
            rows,
        });
    } catch (error) {
        return res.json(error);
    }
}

export async function deleteDay(req, res) {
    try {
        const [rows] = await pool.query(
            'DELETE FROM DiaUtil WHERE codDiaUtil = ?',
            req.params.id
        );
        return res.status(200).json({
            success: true,
            message: 'Dia útil excluido com sucesso',
            rows,
        });
    } catch (error) {
        return res.json(error);
    }
}
