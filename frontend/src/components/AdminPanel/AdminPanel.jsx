import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function AdminPanel() {
    const navigate = useNavigate();

    const handleDropdownClick = (event) => {
        let element = event.target;
        let elementName = element.localName;

        if (elementName === 'svg') {
            element = event.target.parentElement;
        } else if (elementName === 'path') {
            element = event.target.parentElement.parentElement;
        }

        element.classList.toggle('active');
        element.nextSibling.classList.toggle('active');

        if (element.innerText === 'Agenda') {
            element.nextSibling.nextSibling.classList.toggle('active');
        }

        if (element.innerText === 'Disciplinas') {
            element.nextSibling.nextSibling.classList.toggle('active');
            element.nextSibling.nextSibling.nextSibling.classList.toggle('active');
        }
    };

    return (
        <div className="admin">
            <h2>Painel de Administração</h2>

            <div className="container">
                <div className="menu">
                    <p className="link" onClick={() => navigate('')}>
                        Admin
                    </p>
                    <p
                        className="link dropdown"
                        onClick={(event) => {
                            navigate('profiles/');
                            handleDropdownClick(event);
                        }}
                    >
                        Perfis
                        <ExpandMoreIcon />
                    </p>
                    <p
                        className="link dropdown-child"
                        onClick={() => navigate('profiles/addresses/')}
                    >
                        Endereços
                    </p>
                    <p
                        className="link dropdown"
                        onClick={(event) => {
                            navigate('chatbots/');
                            handleDropdownClick(event);
                        }}
                    >
                        ChatBots
                        <ExpandMoreIcon />
                    </p>
                    <p
                        className="link dropdown-child"
                        onClick={() => navigate('chatbots/chats')}
                    >
                        Chats
                    </p>
                    <p
                        className="link dropdown"
                        onClick={(event) => {
                            navigate('schedule/');
                            handleDropdownClick(event);
                        }}
                    >
                        Agenda
                        <ExpandMoreIcon />
                    </p>
                    <p
                        className="link dropdown-child"
                        onClick={() => navigate('schedule/days/')}
                    >
                        Dias
                    </p>
                    <p
                        className="link dropdown-child"
                        onClick={() => navigate('schedule/dayssubjects/')}
                    >
                        Dias/Disciplinas
                    </p>
                    <p
                        className="link dropdown"
                        onClick={(event) => {
                            navigate('subjects/');
                            handleDropdownClick(event);
                        }}
                    >
                        Disciplinas
                        <ExpandMoreIcon />
                    </p>
                    <p
                        className="link dropdown-child"
                        onClick={() => navigate('subjects/topics/')}
                    >
                        Assuntos
                    </p>
                    <p
                        className="link dropdown-child"
                        onClick={() => navigate('subjects/questions/')}
                    >
                        Questões
                    </p>
                    <p
                        className="link dropdown-child"
                        onClick={() => navigate('subjects/alternatives/')}
                    >
                        Alternativas
                    </p>
                    <p className="link" onClick={() => navigate('tests/')}>
                        Simulados
                    </p>
                </div>

                <div className="content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
