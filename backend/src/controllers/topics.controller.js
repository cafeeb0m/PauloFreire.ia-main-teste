import { pool } from '../database/db.js';

export async function getCols(_req, res) {
    try {
        const [rows] = await pool.query('DESC Assuntos');
        return res.status(200).json(rows);
    } catch (error) {
        return res.json(error);
    }
}

export async function getTopics(_req, res) {
    try {
        const [rows] = await pool.query('SELECT * FROM Assuntos');
        return res.status(200).json(rows);
    } catch (error) {
        return res.json(error);
    }
}

export async function getTopic(req, res) {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM Assuntos WHERE codAssunto = ?',
            req.params.id
        );
        return res.status(200).json(rows);
    } catch (error) {
        return res.json(error);
    }
}

export async function createTopic(req, res) {
    try {
        const values = [
            req.body.titulo,
            req.body.conteudoTreino,
            req.body.codDisciplina,
            req.body.codChatBot,
        ];
        const [rows] = await pool.query(
            'INSERT INTO Assuntos (Titulo, ConteudoTreino, codDisciplina, codChatBot) VALUES (?, ?, ?, ?)',
            values
        );
        return res.status(200).json({
            success: true,
            message: 'Assunto criado com sucesso',
            rows,
        });
    } catch (error) {
        return res.json(error);
    }
}

export async function updateTopic(req, res) {
    try {
        const values = [
            req.body.titulo,
            req.body.conteudoTreino,
            req.body.codDisciplina,
            req.body.codChatBot,
            req.params.id,
        ];
        const [rows] = await pool.query(
            'UPDATE Assuntos SET Titulo = ?, ConteudoTreino = ?, codDisciplina = ?, codChatBot = ? WHERE codAssunto = ?',
            values
        );
        return res.status(200).json({
            success: true,
            message: 'Assunto atualizado com sucesso',
            rows,
        });
    } catch (error) {
        return res.json(error);
    }
}

export async function deleteTopic(req, res) {
    try {
        const [rows] = await pool.query(
            'DELETE FROM Assuntos WHERE codAssunto = ?',
            req.params.id
        );
        return res.status(200).json({
            success: true,
            message: 'Assunto excluido com sucesso',
            rows,
        });
    } catch (error) {
        return res.json(error);
    }
}
