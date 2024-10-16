import express from 'express';
import cors from 'cors';

import profileRoutes from './src/routes/profile.routes.js';
import addressesRoutes from './src/routes/addresses.routes.js';
import chatbotsRoutes from './src/routes/chatbots.routes.js';
import chatsRoutes from './src/routes/chats.routes.js';
import scheduleRoutes from './src/routes/schedule.routes.js';
import daysRoutes from './src/routes/days.routes.js';
import daysSubjectsRoutes from './src/routes/days-subjects.routes.js';
import subjectsRoutes from './src/routes/subjects.routes.js';
import topicsRoutes from './src/routes/topics.routes.js';
import questionsRoutes from './src/routes/questions.routes.js';
import alternativesRoutes from './src/routes/alternatives.routes.js';
import testsRoutes from './src/routes/tests.routes.js';
import countsRoutes from './src/routes/counts.routes.js';

const app = express();
const port = 8000;

// middlewares

app.use(express.json());
app.use(cors());

// routes

app.use('/api/profiles', profileRoutes);
app.use('/api/addresses', addressesRoutes);
app.use('/api/chatbots', chatbotsRoutes);
app.use('/api/chats', chatsRoutes);
app.use('/api/schedule', scheduleRoutes);
app.use('/api/days', daysRoutes);
app.use('/api/dayssubjects', daysSubjectsRoutes);
app.use('/api/subjects', subjectsRoutes);
app.use('/api/topics', topicsRoutes);
app.use('/api/questions', questionsRoutes);
app.use('/api/alternatives', alternativesRoutes);
app.use('/api/tests', testsRoutes);
app.use('/api/counts', countsRoutes);

// default route

app.get('/', (_req, res) => {
    res.status(200).json({
        message: 'Servidor da PauloFreire.ai funcionando',
    });
});

app.listen(port, () => {
    console.log(`O servidor está rodando na porta ${port}`);
});
