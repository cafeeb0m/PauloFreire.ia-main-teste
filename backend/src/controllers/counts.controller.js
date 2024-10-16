import { pool } from '../database/db.js';

export async function getCounts(_req, res) {
    try {
        const [Perfis] = await pool.query('SELECT COUNT(*) FROM Perfil');
        const [Chatbots] = await pool.query('SELECT COUNT(*) FROM ChatBot');
        const [Agendas] = await pool.query('SELECT COUNT(*) FROM Agendas');
        const [Disciplinas] = await pool.query(
            'SELECT COUNT(*) FROM Disciplinas'
        );
        const [Assuntos] = await pool.query('SELECT COUNT(*) FROM Assuntos');
        const [Questões] = await pool.query('SELECT COUNT(*) FROM Questoes');
        const [Simulados] = await pool.query('SELECT COUNT(*) FROM Simulados');

        return res.status(200).json({
            Perfis,
            Chatbots,
            Agendas,
            Disciplinas,
            Assuntos,
            Questões,
            Simulados,
        });
    } catch (error) {
        return res.json(error);
    }
}
