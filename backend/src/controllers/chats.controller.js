import { pool } from '../database/db.js';

export async function getCols(_req, res) {
    try {
        const [rows] = await pool.query('DESC Chats');
        return res.status(200).json(rows);
    } catch (error) {
        return res.json(error);
    }
}

export async function getChats(_req, res) {
    try {
        const [rows] = await pool.query('SELECT * FROM Chats');
        return res.status(200).json(rows);
    } catch (error) {
        return res.json(error);
    }
}

export async function getChat(req, res) {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM Chats WHERE codChat = ?',
            req.params.id
        );
        return res.status(200).json(rows);
    } catch (error) {
        return res.json(error);
    }
}

export async function createChat(req, res) {
    try {
        const values = [
            req.body.mensagem,
            req.body.input,
            req.body.codChatBot,
            req.body.idPerfil,
        ];
        const [rows] = await pool.query(
            'INSERT INTO Chats (Mensagem, Input, codChatBot, idPerfil) VALUES (?, ?, ?, ?)',
            values
        );
        return res.status(200).json({
            success: true,
            message: 'Chat criado com sucesso',
            rows,
        });
    } catch (error) {
        return res.json(error);
    }
}

export async function updateChat(req, res) {
    try {
        const values = [
            req.body.mensagem,
            req.body.input,
            req.body.codChatBot,
            req.body.idPerfil,
            req.params.id,
        ];
        const [rows] = await pool.query(
            'UPDATE Chats SET Mensagem = ?, Input = ?, codChatBot = ?, idPerfil = ? WHERE codChat = ?',
            values
        );
        return res.status(200).json({
            success: true,
            message: 'Chat atualizado com sucesso',
            rows,
        });
    } catch (error) {
        return res.json(error);
    }
}

export async function deleteChat(req, res) {
    try {
        const [rows] = await pool.query(
            'DELETE FROM Chats WHERE codChat = ?',
            req.params.id
        );
        return res.status(200).json({
            success: true,
            message: 'Chat excluido com sucesso',
            rows,
        });
    } catch (error) {
        return res.json(error);
    }
}
