import { pool } from '../database/db.js';

export async function getCols(_req, res) {
    try {
        const [rows] = await pool.query('DESC ChatBot');
        return res.status(200).json(rows);
    } catch (error) {
        return res.json(error);
    }
}

export async function getChatbots(_req, res) {
    try {
        const [rows] = await pool.query('SELECT * FROM ChatBot');
        return res.status(200).json(rows);
    } catch (error) {
        return res.json(error);
    }
}

export async function getChatbot(req, res) {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM ChatBot WHERE codChatBot = ?',
            req.params.id
        );
        return res.status(200).json(rows);
    } catch (error) {
        return res.json(error);
    }
}

export async function createChatbot(req, res) {
    try {
        const values = [req.body.nomechat, req.body.treinamento];
        const [rows] = await pool.query(
            'INSERT INTO ChatBot (NomeChat, Treinamento) VALUES (?, ?)',
            values
        );
        return res.status(200).json({
            success: true,
            message: 'ChatBot criado com sucesso',
            rows,
        });
    } catch (error) {
        return res.json(error);
    }
}

export async function updateChatbot(req, res) {
    try {
        const values = [req.body.nomechat, req.body.treinamento, req.params.id];
        const [rows] = await pool.query(
            'UPDATE ChatBot SET NomeChat = ?, Treinamento = ? WHERE codChatBot = ?',
            values
        );
        return res.status(200).json({
            success: true,
            message: 'ChatBot atualizado com sucesso',
            rows,
        });
    } catch (error) {
        return res.json(error);
    }
}

export async function deleteChatbot(req, res) {
    try {
        const [rows] = await pool.query(
            'DELETE FROM ChatBot WHERE codChatBot = ?',
            req.params.id
        );
        return res.status(200).json({
            success: true,
            message: 'ChatBot excluido com sucesso',
            rows,
        });
    } catch (error) {
        return res.json(error);
    }
}
