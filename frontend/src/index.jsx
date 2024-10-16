import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Error from './components/Error';
import App from './App';
import Home from './components/Home';
import AdminPanel from './components/AdminPanel/AdminPanel';
import ChatBots, {
    loader as chatbotsLoader,
} from './components/AdminPanel/ChatBots';
import Chats, { loader as chatsLoader } from './components/AdminPanel/Chats';
import Dashboard, {
    loader as dashboardLoader,
} from './components/AdminPanel/Dashboard';
import Profiles, {
    loader as profilesLoader,
} from './components/AdminPanel/Profiles';
import Addresses, {
    loader as addressesLoader,
} from './components/AdminPanel/Addresses';
import Schedule, {
    loader as scheduleLoader,
} from './components/AdminPanel/Schedule';
import Days, { loader as daysLoader } from './components/AdminPanel/Days';
import DaysSubjects, {
    loader as daysSubjectsLoader,
} from './components/AdminPanel/DaysSubjects';
import Subjects, {
    loader as subjectsLoader,
} from './components/AdminPanel/Subjects';
import Topics, { loader as topicsLoader } from './components/AdminPanel/Topics';
import Questions, {
    loader as questionsLoader,
} from './components/AdminPanel/Questions';
import Alternatives, {
    loader as alternativesLoader,
} from './components/AdminPanel/Alternatives';
import Tests, { loader as testsLoader } from './components/AdminPanel/Tests';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <Error />,
        children: [
            {
                errorElement: <Error />,
                children: [
                    {
                        index: true,
                        element: <Home />,
                    },
                    {
                        path: 'admin/',
                        element: <AdminPanel />,
                        children: [
                            {
                                errorElement: <Error />,
                                children: [
                                    {
                                        index: true,
                                        element: <Dashboard />,
                                        loader: dashboardLoader,
                                    },
                                    {
                                        path: 'profiles/',
                                        element: <Profiles />,
                                        loader: profilesLoader,
                                    },
                                    {
                                        path: 'profiles/addresses',
                                        element: <Addresses />,
                                        loader: addressesLoader,
                                    },
                                    {
                                        path: 'chatbots/',
                                        element: <ChatBots />,
                                        loader: chatbotsLoader,
                                    },
                                    {
                                        path: 'chatbots/chats',
                                        element: <Chats />,
                                        loader: chatsLoader,
                                    },
                                    {
                                        path: 'schedule/',
                                        element: <Schedule />,
                                        loader: scheduleLoader,
                                    },
                                    {
                                        path: 'schedule/days',
                                        element: <Days />,
                                        loader: daysLoader,
                                    },
                                    {
                                        path: 'schedule/dayssubjects',
                                        element: <DaysSubjects />,
                                        loader: daysSubjectsLoader,
                                    },
                                    {
                                        path: 'subjects/',
                                        element: <Subjects />,
                                        loader: subjectsLoader,
                                    },
                                    {
                                        path: 'subjects/topics',
                                        element: <Topics />,
                                        loader: topicsLoader,
                                    },
                                    {
                                        path: 'subjects/questions',
                                        element: <Questions />,
                                        loader: questionsLoader,
                                    },
                                    {
                                        path: 'subjects/alternatives',
                                        element: <Alternatives />,
                                        loader: alternativesLoader,
                                    },
                                    {
                                        path: 'tests/',
                                        element: <Tests />,
                                        loader: testsLoader,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
]);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
