import { pool } from '../database/db.js';

export async function getCols(_req, res) {
    try {
        const [rows] = await pool.query('DESC Agendas');
        return res.status(200).json(rows);
    } catch (error) {
        return res.json(error);
    }
}

export async function getSchedules(_req, res) {
    try {
        const [rows] = await pool.query('SELECT * FROM Agendas');
        return res.status(200).json(rows);
    } catch (error) {
        return res.json(error);
    }
}

export async function getSchedule(req, res) {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM Agendas WHERE codAgenda = ?',
            req.params.id
        );
        return res.status(200).json(rows);
    } catch (error) {
        return res.json(error);
    }
}

export async function createSchedule(req, res) {
    try {
        const values = [req.body.tempo];
        const [rows] = await pool.query(
            'INSERT INTO Agendas (Tempo) VALUES (?)',
            values
        );
        return res.status(200).json({
            success: true,
            message: 'Agenda criada com sucesso',
            rows,
        });
    } catch (error) {
        return res.json(error);
    }
}

export async function updateSchedule(req, res) {
    try {
        const values = [req.body.tempo, req.params.id];
        const [rows] = await pool.query(
            'UPDATE Agendas SET Tempo = ? WHERE codAgenda = ?',
            values
        );
        return res.status(200).json({
            success: true,
            message: 'Agenda atualizada com sucesso',
            rows,
        });
    } catch (error) {
        return res.json(error);
    }
}

export async function deleteSchedule(req, res) {
    try {
        const [rows] = await pool.query(
            'DELETE FROM Agendas WHERE codAgenda = ?',
            req.params.id
        );
        return res.status(200).json({
            success: true,
            message: 'Agenda excluida com sucesso',
            rows,
        });
    } catch (error) {
        return res.json(error);
    }
}
