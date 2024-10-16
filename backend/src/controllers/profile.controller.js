import { pool } from '../database/db.js';

export async function getCols(_req, res) {
    try {
        const [rows] = await pool.query('DESC Perfil');
        return res.status(200).json(rows);
    } catch (error) {
        return res.json(error);
    }
}

export async function getProfiles(_req, res) {
    try {
        const [rows] = await pool.query('SELECT * FROM Perfil');
        return res.status(200).json(rows);
    } catch (error) {
        return res.json(error);
    }
}

export async function getProfile(req, res) {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM Perfil WHERE idPerfil = ?',
            req.params.id
        );
        return res.status(200).json(rows);
    } catch (error) {
        return res.json(error);
    }
}

export async function createProfile(req, res) {
    try {
        const values = [
            req.body.nome,
            req.body.email,
            req.body.senha,
            req.body.adm,
            req.body.foto,
            req.body.organizacao,
            req.body.codAgenda,
        ];
        const [rows] = await pool.query(
            'INSERT INTO Perfil (Nome, Email, Senha, Adm, Foto, Organizacao, codAgenda) VALUES (?, ?, ?, ?, ?, ?, ?)',
            values
        );
        return res.status(200).json({
            success: true,
            message: 'Perfil criado com sucesso',
            rows,
        });
    } catch (error) {
        return res.json(error);
    }
}

export async function updateProfile(req, res) {
    try {
        const values = [
            req.body.nome,
            req.body.email,
            req.body.senha,
            req.body.adm,
            req.body.foto,
            req.body.organizacao,
            req.body.codAgenda,
            req.params.id,
        ];
        const [rows] = await pool.query(
            'UPDATE Perfil SET Nome = ?, Email = ?, Senha = ?, Adm = ?, Foto = ?, Organizacao = ?, codAgenda = ? WHERE idPerfil = ?',
            values
        );
        return res.status(200).json({
            success: true,
            message: 'Perfil atualizado com sucesso',
            rows,
        });
    } catch (error) {
        return res.json(error);
    }
}

export async function deleteProfile(req, res) {
    try {
        const [rows] = await pool.query(
            'DELETE FROM Perfil WHERE idPerfil = ?',
            req.params.id
        );
        return res.status(200).json({
            success: true,
            message: 'Perfil excluido com sucesso',
            rows,
        });
    } catch (error) {
        return res.json(error);
    }
}
