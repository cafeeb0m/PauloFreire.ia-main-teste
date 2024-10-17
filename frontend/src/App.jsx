import React from 'react';
import { Outlet } from 'react-router-dom';
import './css/style.css';
import Header from './components/Header/Header';
import Main from './components/Main-Specific-Disciplines/Main-Specific-Disciplines';
import Template from './components/Template/Template';
import DisciplineCard from './components/Agenda/DisciplineCard';
import Agenda from './components/Agenda/Agenda';

export default function App() {
    return (
        <div className="container">
            <Template />
            <Agenda />
        </div>
    );
}

