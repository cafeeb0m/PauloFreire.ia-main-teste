import { pool } from '../database/db.js';

export async function getCols(_req, res) {
    try {
        const [rows] = await pool.query('DESC Questoes');
        return res.status(200).json(rows);
    } catch (error) {
        return res.json(error);
    }
}

export async function getQuestions(_req, res) {
    try {
        const [rows] = await pool.query('SELECT * FROM Questoes');
        return res.status(200).json(rows);
    } catch (error) {
        return res.json(error);
    }
}

export async function getQuestion(req, res) {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM Questoes WHERE codQuestao = ?',
            req.params.id
        );
        return res.status(200).json(rows);
    } catch (error) {
        return res.json(error);
    }
}

export async function createQuestion(req, res) {
    try {
        const values = [
            req.body.questao,
            req.body.ano,
            req.body.numQuestao,
            req.body.codSimulado,
            req.body.codChatBot,
        ];
        const [rows] = await pool.query(
            'INSERT INTO Questoes (Questao, Ano, NumQuestao, codSimulado, codChatBot) VALUES (?, ?, ?, ?, ?)',
            values
        );
        return res.status(200).json({
            success: true,
            message: 'Questão criada com sucesso',
            rows,
        });
    } catch (error) {
        return res.json(error);
    }
}

export async function updateQuestion(req, res) {
    try {
        const values = [
            req.body.questao,
            req.body.ano,
            req.body.numQuestao,
            req.body.codSimulado,
            req.body.codChatBot,
            req.params.id,
        ];
        const [rows] = await pool.query(
            'UPDATE Questoes SET Questao = ?, Ano = ?, NumQuestao = ?, codSimulado = ?, codChatBot = ? WHERE codQuestao = ?',
            values
        );
        return res.status(200).json({
            success: true,
            message: 'Questão atualizada com sucesso',
            rows,
        });
    } catch (error) {
        return res.json(error);
    }
}

export async function deleteQuestion(req, res) {
    try {
        const [rows] = await pool.query(
            'DELETE FROM Questoes WHERE codQuestao = ?',
            req.params.id
        );
        return res.status(200).json({
            success: true,
            message: 'Questão excluida com sucesso',
            rows,
        });
    } catch (error) {
        return res.json(error);
    }
}
