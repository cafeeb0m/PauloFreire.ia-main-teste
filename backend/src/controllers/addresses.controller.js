import { pool } from '../database/db.js';

export async function getCols(_req, res) {
    try {
        const [rows] = await pool.query('DESC Enderecos');
        return res.status(200).json(rows);
    } catch (error) {
        return res.json(error);
    }
}

export async function getAddresses(_req, res) {
    try {
        const [rows] = await pool.query('SELECT * FROM Enderecos');
        return res.status(200).json(rows);
    } catch (error) {
        return res.json(error);
    }
}

export async function getAddress(req, res) {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM Enderecos WHERE codEndereco = ?',
            req.params.id
        );
        return res.status(200).json(rows);
    } catch (error) {
        return res.json(error);
    }
}

export async function createAddress(req, res) {
    try {
        const values = [
            req.body.logradouro,
            req.body.numero,
            req.body.complemento,
            req.body.cep,
            req.body.bairro,
            req.body.cidade,
            req.body.idPerfil,
        ];
        const [rows] = await pool.query(
            'INSERT INTO Enderecos (Logradouro, Numero, Complemento, CEP, Bairro, Cidade, idPerfil) VALUES (?, ?, ?, ?, ?, ?, ?)',
            values
        );
        return res.status(200).json({
            success: true,
            message: 'Endereço criado com sucesso',
            rows,
        });
    } catch (error) {
        return res.json(error);
    }
}

export async function updateAddress(req, res) {
    try {
        const values = [
            req.body.logradouro,
            req.body.numero,
            req.body.complemento,
            req.body.cep,
            req.body.bairro,
            req.body.cidade,
            req.body.idPerfil,
            req.params.id,
        ];
        const [rows] = await pool.query(
            'UPDATE Enderecos SET Logradouro = ?, Numero = ?, Complemento = ?, CEP = ?, Bairro = ?, Cidade = ?, idPerfil = ? WHERE codEndereco = ?',
            values
        );
        return res.status(200).json({
            success: true,
            message: 'Endereço atualizado com sucesso',
            rows,
        });
    } catch (error) {
        return res.json(error);
    }
}

export async function deleteAddress(req, res) {
    try {
        const [rows] = await pool.query(
            'DELETE FROM Enderecos WHERE codEndereco = ?',
            req.params.id
        );
        return res.status(200).json({
            success: true,
            message: 'Endereço excluido com sucesso',
            rows,
        });
    } catch (error) {
        return res.json(error);
    }
}
